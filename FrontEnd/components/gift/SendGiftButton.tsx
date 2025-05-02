import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Gift } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function SendGiftButton() {
  const { theme } = useTheme();
  
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: theme.colors.primary }]}
        activeOpacity={0.8}
      >
        <Gift color="#FFFFFF" size={20} />
        <Text style={styles.buttonText}>Send a Gift Card</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});