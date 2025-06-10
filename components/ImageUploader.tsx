import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  Dimensions,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { BASE_URL } from '../config';

const { width: screenWidth } = Dimensions.get('window');
const boxSize = 95;
const numColumns = Math.floor(screenWidth / (boxSize + 16));

interface ImageData {
  uri: string;
  id: string;
  isUploading?: boolean;
  uploadError?: boolean;
}

interface ImageUploaderProps {
  incidentId: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ }) => {

  const [images, setImages] = useState<ImageData[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [showUploadOptions, setShowUploadOptions] = useState(false);

  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
      Alert.alert('Permission Required', 'Camera and media library permissions are required to use this feature.');
      return false;
    }
    return true;
  };

  const imageToBlob = async (uri: string): Promise<Blob> => {
    const response = await fetch(uri);
    return await response.blob();
  };

  const uploadSingleImage = async (imageData: ImageData) => {

    try {

      setImages(prev => 
        prev.map(img => 
          img.id === imageData.id 
            ? { ...img, isUploading: true, uploadError: false }
            : img
        )
      );

      const formData = new FormData();
      formData.append("media[status]", "true");
      
      const blob = await imageToBlob(imageData.uri);
      formData.append('media[images]', blob, imageData.id);

      const response = await axios.put(
        `${BASE_URL}/user/incident-type/683650cccdfa52a1340ff3de`, 
        formData, 
        {
          headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.status == 200) {
        console.log(`Upload successful for image ${imageData.id}:`, response.data);
      }
      
      
      setImages(prev => 
        prev.map(img => 
          img.id === imageData.id 
            ? { ...img, isUploading: false, uploadError: false }
            : img
        )
      );

    } catch (error) {
      console.log(`Upload error for image ${imageData.id}:`, error);
      

      setImages(prev => 
        prev.map(img => 
          img.id === imageData.id 
            ? { ...img, isUploading: false, uploadError: true }
            : img
        )
      );

      Alert.alert('Upload Error', `Failed to upload image ${imageData.id}`);
    }
  };

  const handleImageSelection = async (result: ImagePicker.ImagePickerResult) => {
    if (!result.canceled && result.assets) {
      const newImages = result.assets.map((asset, index) => ({
        uri: asset.uri,
        id: `${Date.now()}_${index}`,
        isUploading: false,
        uploadError: false,
      }));
      
      setImages(prev => [...prev, ...newImages]);
      
      for (const imageData of newImages) {
        uploadSingleImage(imageData);
      }
    }
    setShowUploadOptions(false);
  };

  const handleFileSelection = async (fileResult: DocumentPicker.DocumentPickerResult) => {
    if (!fileResult.canceled && fileResult.assets) {
      const newImages = fileResult.assets.map((asset, index) => ({
        uri: asset.uri,
        id: `${Date.now()}_${index}`,
        isUploading: false,
        uploadError: false,
      }));

      setImages(prev => [...prev, ...newImages]);
      
      for (const imageData of newImages) {
        uploadSingleImage(imageData);
      }
    }
    setShowUploadOptions(false);
  };

  const handleOptionSelect = async (type: 'gallery' | 'camera' | 'file') => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      switch (type) {
        case 'gallery':
          const galleryResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 0.8,
          });
          await handleImageSelection(galleryResult);
          break;

        case 'camera':
          const cameraResult = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
          });
          await handleImageSelection(cameraResult);
          break;

        case 'file':
          const fileResult = await DocumentPicker.getDocumentAsync({
            type: 'image/*',
            multiple: true,
          });
          await handleFileSelection(fileResult);
          break;
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select image');
      setShowUploadOptions(false);
    }
  };

  const retryUpload = (imageData: ImageData) => {
    uploadSingleImage(imageData);
  };

  const deleteImage = (index: number) => {
    Alert.alert(
      'Delete Image',
      'Are you sure you want to delete this image?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setImages(prev => prev.filter((_, i) => i !== index));
          }
        }
      ]
    );
  };

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImageIndex(null);
  };

  const renderImageGrid = () => {
    const rows = [];
    const totalItems = images.length + 1;
    
    for (let i = 0; i < totalItems; i += numColumns) {
      const rowItems = [];
      
      for (let j = 0; j < numColumns && i + j < totalItems; j++) {
        const index = i + j;
        
        if (index === images.length) {
          rowItems.push(
            <TouchableOpacity
              key="upload"
              style={styles.uploadBox}
              onPress={() => setShowUploadOptions(true)}
            >
              <Ionicons name="image-outline" size={36} color="#F9980D" />
            </TouchableOpacity>
          );
        } else {
          const image = images[index];
          rowItems.push(
            <View key={image.id} style={styles.imageContainer}>
              <TouchableOpacity onPress={() => openImageModal(index)}>
                <Image source={{ uri: image.uri }} style={styles.imageBox} />
                
                {/* Upload overlay */}
                {image.isUploading && (
                  <View style={styles.uploadOverlay}>
                    <ActivityIndicator size="small" color="#F9980D" />
                    <Text style={styles.uploadText}>Uploading...</Text>
                  </View>
                )}
                
                {/* Error overlay */}
                {image.uploadError && (
                  <View style={styles.errorOverlay}>
                    <TouchableOpacity 
                      style={styles.retryButton}
                      onPress={() => retryUpload(image)}
                    >
                      <Ionicons name="refresh" size={16} color="white" />
                      <Text style={styles.retryText}>Retry</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteImage(index)}
              >
                <Ionicons name="trash" size={12} color="white" />
              </TouchableOpacity>
            </View>
          );
        }
      }
      
      rows.push(
        <View key={i} style={styles.row}>
          {rowItems}
        </View>
      );
    }
    
    return rows;
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {renderImageGrid()}
      </ScrollView>

      {/* Upload Options Modal */}
      <Modal
        visible={showUploadOptions}
        transparent
        animationType="fade"
        onRequestClose={() => setShowUploadOptions(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Option to Choose From</Text>
              <TouchableOpacity
                onPress={() => setShowUploadOptions(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={20} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleOptionSelect('gallery')}
              >
                <Ionicons name="images" size={20} color="#3B82F6" />
                <Text style={styles.optionText}>Photo Library</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleOptionSelect('camera')}
              >
                <Ionicons name="camera" size={20} color="#10B981" />
                <Text style={styles.optionText}>Take Photo or Video</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => handleOptionSelect('file')}
              >
                <Ionicons name="folder" size={20} color="#8B5CF6" />
                <Text style={styles.optionText}>Choose file</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Image Modal */}
      <Modal
        visible={selectedImageIndex !== null}
        transparent
        animationType="fade"
        onRequestClose={closeImageModal}
      >
        <View style={styles.imageModalOverlay}>
          <TouchableOpacity
            style={styles.imageModalCloseButton}
            onPress={closeImageModal}
          >
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
          
          {selectedImageIndex !== null && (
            <Image
              source={{ uri: images[selectedImageIndex].uri }}
              style={styles.fullSizeImage}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  imageContainer: {
    position: 'relative',
    width: boxSize,
    height: boxSize,
  },
  imageBox: {
    width: boxSize,
    height: boxSize,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginBottom: 8,
  },
  uploadBox: {
    width: boxSize,
    height: boxSize,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#9CA3AF',
    borderStyle: 'dashed',
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  deleteButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#EF4444',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    color: 'white',
    fontSize: 10,
    marginTop: 4,
  },
  errorOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.8)',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  retryText: {
    color: 'white',
    fontSize: 10,
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  closeButton: {
    padding: 4
  },
  optionsContainer: {
    gap: 12
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FAFAFA',
  },
  optionText: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  imageModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageModalCloseButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  fullSizeImage: {
    width: '90%',
    height: '80%',
  },
});

export default ImageUploader;