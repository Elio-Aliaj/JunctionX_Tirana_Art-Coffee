import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { PlusCircle } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { router } from 'expo-router';

interface MenuItemCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  onAddToCart?: () => void;
  showAddButton?: boolean;
}

export default function MenuItemCard({ 
  id, 
  name, 
  description, 
  price, 
  imageUrl,
  onAddToCart,
  showAddButton = false,
}: MenuItemCardProps) {
  const { theme } = useTheme();
  
  const handlePress = () => {
    // Navigate to item details
    // router.push(`/item/${id}`);
  };
  
  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: '#1E1E1E' }]}
      activeOpacity={0.8}
      onPress={handlePress}
    >
      <Image source={{ uri: imageUrl }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={[styles.name, { color: theme.colors.textPrimary }]}>
            {name}
          </Text>
          <Text style={[styles.price, { color: theme.colors.textPrimary }]}>
            ${price.toFixed(2)}
          </Text>
        </View>
        
        <Text 
          style={[styles.description, { color: theme.colors.textSecondary }]}
          numberOfLines={2}
        >
          {description}
        </Text>
        
        {showAddButton && (
          <TouchableOpacity 
            style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
            onPress={onAddToCart}
          >
            <PlusCircle color="#FFFFFF" size={16} />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    padding: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    flex: 1,
  },
  price: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginLeft: 8,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 12,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  addButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 4,
  },
});