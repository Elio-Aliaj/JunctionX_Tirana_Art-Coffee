import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface RecentOrderItemProps {
  title: string;
  details: string;
  date: string;
  imageUrl: string;
}

export default function RecentOrderItem({ title, details, date, imageUrl }: RecentOrderItemProps) {
  const { theme } = useTheme();
  
  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: '#1E1E1E' }]}
      activeOpacity={0.8}
    >
      <Image source={{ uri: imageUrl }} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
          {title}
        </Text>
        <Text style={[styles.details, { color: theme.colors.textSecondary }]}>
          {details}
        </Text>
        <Text style={[styles.date, { color: theme.colors.textSecondary }]}>
          {date}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: 80,
    height: 80,
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    marginBottom: 4,
  },
  details: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginBottom: 4,
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
});