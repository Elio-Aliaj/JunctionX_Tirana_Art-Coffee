import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';

interface GiftCardItemProps {
  title: string;
  balance: number;
  expiresAt?: string;
  recipient?: string;
  sentAt?: string;
  imageUrl: string;
  isUsed?: boolean;
}

export default function GiftCardItem({ 
  title, 
  balance, 
  expiresAt,
  recipient,
  sentAt,
  imageUrl,
  isUsed = false,
}: GiftCardItemProps) {
  const { theme } = useTheme();
  
  return (
    <TouchableOpacity 
      style={[styles.container, isUsed && styles.usedCard]}
      activeOpacity={0.9}
      disabled={isUsed}
    >
      <ImageBackground 
        source={{ uri: imageUrl }} 
        style={styles.background}
        imageStyle={{ opacity: isUsed ? 0.5 : 1 }}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        >
          <View style={styles.content}>
            <Text style={[
              styles.title, 
              isUsed && { color: 'rgba(255, 255, 255, 0.7)' }
            ]}>
              {title}
            </Text>
            
            <Text style={[
              styles.balance, 
              isUsed && { color: 'rgba(255, 255, 255, 0.7)' }
            ]}>
              ${balance.toFixed(2)}
            </Text>
            
            {recipient ? (
              <Text style={styles.recipient}>To: {recipient}</Text>
            ) : null}
            
            <Text style={styles.expiration}>
              {recipient && sentAt ? `Sent: ${sentAt}` : expiresAt}
            </Text>
            
            {isUsed && (
              <View style={styles.usedOverlay}>
                <Text style={styles.usedText}>USED</Text>
              </View>
            )}
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  usedCard: {
    opacity: 0.8,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    padding: 16,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  balance: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  recipient: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  expiration: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#FFFFFF',
  },
  usedOverlay: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255, 67, 54, 0.8)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    transform: [{ rotate: '10deg' }],
  },
  usedText: {
    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: '#FFFFFF',
  },
});