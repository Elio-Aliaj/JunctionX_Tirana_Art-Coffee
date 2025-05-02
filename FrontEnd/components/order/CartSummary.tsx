import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ShoppingBag } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface CartSummaryProps {
  totalItems: number;
  totalCost: number;
  onViewCart: () => void;
}

export default function CartSummary({ 
  totalItems, 
  totalCost, 
  onViewCart 
}: CartSummaryProps) {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <ShoppingBag color="#FFFFFF" size={20} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{totalItems}</Text>
          </View>
        </View>
        
        <View style={styles.details}>
          <Text style={styles.itemCount}>
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </Text>
          <Text style={styles.totalCost}>${totalCost.toFixed(2)}</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.viewCartButton} onPress={onViewCart}>
        <Text style={styles.viewCartText}>View Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'relative',
    marginRight: 12,
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FFFFFF',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    color: '#FF8C42',
  },
  details: {
    
  },
  itemCount: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  totalCost: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  viewCartButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  viewCartText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FF8C42',
  },
});