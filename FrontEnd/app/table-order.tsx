import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router } from 'expo-router';
import { ArrowLeft, User, Clock, ShoppingBag } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import MenuItemCard from '@/components/order/MenuItemCard';
import { MENU_ITEMS } from '@/data/menuItems';
import CartSummary from '@/components/order/CartSummary';

export default function TableOrderScreen() {
  const { theme } = useTheme();
  const [cart, setCart] = useState([]);
  
  // Function to add item to cart
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      // Update quantity if item already in cart
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } 
          : cartItem
      ));
    } else {
      // Add new item to cart
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };
  
  // Calculate total items and cost
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft color={theme.colors.textPrimary} size={24} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.colors.textPrimary }]}>
          Table Order
        </Text>
        <View style={styles.placeholder} />
      </View>
      
      {/* Table Info */}
      <View style={[styles.tableInfoCard, { backgroundColor: '#1E1E1E' }]}>
        <View style={styles.tableInfo}>
          <Text style={[styles.tableTitle, { color: theme.colors.textPrimary }]}>
            Table #14
          </Text>
          <Text style={[styles.cafeLocation, { color: theme.colors.textSecondary }]}>
            Northside Cafe, Downtown
          </Text>
        </View>
        
        <View style={styles.tableDetails}>
          <View style={styles.tableDetailItem}>
            <User color={theme.colors.primary} size={16} />
            <Text style={[styles.tableDetailText, { color: theme.colors.textSecondary }]}>
              2 People
            </Text>
          </View>
          
          <View style={styles.tableDetailItem}>
            <Clock color={theme.colors.primary} size={16} />
            <Text style={[styles.tableDetailText, { color: theme.colors.textSecondary }]}>
              10:30 AM
            </Text>
          </View>
        </View>
      </View>
      
      {/* Menu Items */}
      <ScrollView 
        style={styles.menuContainer}
        contentContainerStyle={styles.menuContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
          Menu
        </Text>
        
        <Text style={[styles.categoryTitle, { color: theme.colors.textSecondary }]}>
          RECOMMENDED
        </Text>
        
        {MENU_ITEMS.slice(0, 4).map(item => (
          <MenuItemCard
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            imageUrl={item.imageUrl}
            onAddToCart={() => addToCart(item)}
            showAddButton
          />
        ))}
        
        <Text style={[styles.categoryTitle, { color: theme.colors.textSecondary }]}>
          DRINKS
        </Text>
        
        {MENU_ITEMS.slice(4, 8).map(item => (
          <MenuItemCard
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            imageUrl={item.imageUrl}
            onAddToCart={() => addToCart(item)}
            showAddButton
          />
        ))}
      </ScrollView>
      
      {/* Cart Summary */}
      {cart.length > 0 && (
        <CartSummary
          totalItems={totalItems}
          totalCost={totalCost}
          onViewCart={() => {/* Navigate to cart */}}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  placeholder: {
    width: 40,
  },
  tableInfoCard: {
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  tableInfo: {
    marginBottom: 12,
  },
  tableTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginBottom: 4,
  },
  cafeLocation: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  tableDetails: {
    flexDirection: 'row',
  },
  tableDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  tableDetailText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginLeft: 6,
  },
  menuContainer: {
    flex: 1,
  },
  menuContent: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Extra space for cart summary
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    marginBottom: 16,
  },
  categoryTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    letterSpacing: 0.5,
    marginTop: 24,
    marginBottom: 8,
  },
});