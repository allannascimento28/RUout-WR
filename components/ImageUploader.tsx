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
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons';
import { scale } from 'react-native-size-matters';

const { width: screenWidth } = Dimensions.get('window');
const boxSize = scale(95); // Reduced from 120 to 80
const numColumns = Math.floor(screenWidth / (boxSize + 16));

interface ImageData {
  uri: string;
  id: string;
}

const ImageUploader: React.FC = () => {
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

  const handleImageSelection = (result: ImagePicker.ImagePickerResult) => {
    if (!result.canceled && result.assets) {
      const newImages = result.assets.map((asset, index) => ({
        uri: asset.uri,
        id: `${Date.now()}_${index}`,
      }));
      setImages(prev => [...prev, ...newImages]);
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
          handleImageSelection(galleryResult);
          break;

        case 'camera':
          const cameraResult = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
          });
          handleImageSelection(cameraResult);
          break;

        case 'file':
          const fileResult = await DocumentPicker.getDocumentAsync({
            type: 'image/*',
            multiple: true,
          });
          if (!fileResult.canceled && fileResult.assets) {
            const newImages = fileResult.assets.map((asset, index) => ({
              uri: asset.uri,
              id: `${Date.now()}_${index}`,
            }));
            setImages(prev => [...prev, ...newImages]);
          }
          setShowUploadOptions(false);
          break;
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select image');
      setShowUploadOptions(false);
    }
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
    const totalItems = images.length + 1; // +1 for upload button
    
    for (let i = 0; i < totalItems; i += numColumns) {
      const rowItems = [];
      
      for (let j = 0; j < numColumns && i + j < totalItems; j++) {
        const index = i + j;
        
        if (index === images.length) {
          // Upload button
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
          // Image item
          const image = images[index];
          rowItems.push(
            <View key={image.id} style={styles.imageContainer}>
              <TouchableOpacity onPress={() => openImageModal(index)}>
                <Image source={{ uri: image.uri }} style={styles.imageBox} />
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
    padding: scale(8),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    gap: scale(8),
    marginBottom: scale(8),
  },
  imageContainer: {
    position: 'relative',
    width: boxSize,
    height: boxSize,
  },
  imageBox: {
    width: boxSize,
    height: boxSize,
    borderRadius: scale(6),
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginBottom: scale(8),
  },
  uploadBox: {
    width: boxSize,
    height: boxSize,
    borderRadius: scale(6),
    borderWidth: 2,
    borderColor: '#9CA3AF',
    borderStyle: 'dashed',
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(8),
  },
  deleteButton: {
    position: 'absolute',
    top: scale(4),
    right: scale(4),
    backgroundColor: '#EF4444',
    borderRadius: scale(12),
    width: scale(24),
    height: scale(24),
    alignItems: 'center',
    justifyContent: 'center',
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
    padding: scale(24),
    width: scale(320),
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
    marginBottom: scale(16),
  },
  modalTitle: {
    fontSize: scale(18),
    fontWeight: '600',
    color: '#1F2937',
  },
  closeButton: {
    padding: scale(4),
  },
  optionsContainer: {
    gap: scale(12),
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(12),
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FAFAFA',
  },
  optionText: {
    marginLeft: scale(12),
    fontSize: scale(16),
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
    top: scale(50),
    right: scale(20),
    backgroundColor: 'white',
    borderRadius: scale(20),
    width: scale(40),
    height: scale(40),
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