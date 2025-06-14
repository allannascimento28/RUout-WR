import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Platform, Pressable } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

type AlertType = 'default' | 'success' | 'error' | 'warning' | 'info';

type ButtonProps = {
  text: string;
  onPress: () => void;
  style?: 'default' | 'cancel' | 'destructive';
};

type AlertModalProps = {
  visible: boolean;
  title: string;
  message: string;
  type?: AlertType;
  buttons?: ButtonProps[];
  onClose?: () => void;
};

const AlertModal = ({
  visible,
  title,
  message,
  type = 'default',
  buttons = [{ text: 'OK', onPress: () => {}, style: 'default' }],
  onClose,
}: AlertModalProps) => {
  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return { icon: 'check-circle', color: '#34C759', backgroundColor: 'rgba(52, 199, 89, 0.1)' };
      case 'error':
        return { icon: 'times-circle', color: '#FF3B30', backgroundColor: 'rgba(255, 59, 48, 0.1)' };
      case 'warning':
        return { icon: 'exclamation-triangle', color: '#FF9500', backgroundColor: 'rgba(255, 149, 0, 0.1)' };
      case 'info':
        return { icon: 'info-circle', color: '#3392CC', backgroundColor: 'rgba(51, 146, 204, 0.1)' };
      default:
        return { icon: 'bell', color: '#3392CC', backgroundColor: 'rgba(51, 146, 204, 0.1)' };
    }
  };
  
  const { icon, color, backgroundColor } = getAlertStyles();
  
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable 
        style={styles.overlay}
        onPress={onClose}
      >
        <View style={[styles.modalContainer, { backgroundColor: Platform.OS === 'web' ? '#FFFFFF' : '#F6FDFF' }]}
          onStartShouldSetResponder={() => true}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          <View style={[styles.iconContainer, { backgroundColor }]}>
            <FontAwesome5 name={icon} size={28} color={color} />
          </View>
          
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          
          <View style={[
            styles.buttonContainer,
            buttons.length > 2 && styles.buttonContainerStacked
          ]}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  button.style === 'cancel' && styles.cancelButton,
                  button.style === 'destructive' && styles.destructiveButton,
                  buttons.length <= 2 && { flex: 1 },
                  buttons.length > 2 && styles.stackedButton,
                  index < buttons.length - 1 && buttons.length <= 2 && styles.buttonMarginRight
                ]}
                onPress={() => {
                  button.onPress();
                  if (onClose) onClose();
                }}
              >
                <Text style={[
                  styles.buttonText,
                  button.style === 'cancel' && styles.cancelButtonText,
                  button.style === 'destructive' && styles.destructiveButtonText,
                ]}>
                  {button.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Manrope-Bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    fontFamily: 'Manrope-Regular',
    textAlign: 'center',
    marginBottom: 24,
    color: '#4A4A4A',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
    width: '100%',
  },
  buttonContainerStacked: {
    flexDirection: 'column',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#3392CC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonMarginRight: {
    marginRight: 8,
  },
  stackedButton: {
    marginBottom: 8,
    width: '100%',
  },
  cancelButton: {
    backgroundColor: '#E9E9EB',
  },
  destructiveButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Manrope-SemiBold',
  },
  cancelButtonText: {
    color: '#000000',
  },
  destructiveButtonText: {
    color: '#FFFFFF',
  },
});

export default AlertModal;