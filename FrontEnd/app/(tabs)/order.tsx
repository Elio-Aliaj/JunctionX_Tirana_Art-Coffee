import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import SearchBar from '@/components/order/SearchBar';
import CategorySelector from '@/components/order/CategorySelector';
import MenuItemCard from '@/components/order/MenuItemCard';
import { MENU_ITEMS } from '@/data/menuItems';

const CATEGORIES = [
  { id: 'hot', name: 'Hot Coffee' },
  { id: 'cold', name: 'Cold Coffee' },
  { id: 'tea', name: 'Tea' },
  { id: 'bakery', name: 'Bakery' },
  { id: 'snacks', name: 'Snacks' },
];

export default function OrderScreen() {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('hot');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = MENU_ITEMS.filter(
    item => item.category === selectedCategory &&
    (searchQuery === '' || item.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search drinks and food"
        />
        <TouchableOpacity style={styles.filterButton}>
          <SlidersHorizontal color={theme.colors.textPrimary} size={20} />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <CategorySelector 
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Menu Items */}
      {filteredItems.length > 0 ? (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MenuItemCard
              id={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              imageUrl={item.imageUrl}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.colors.textSecondary }]}>
            No items found. Try another search or category.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  filterButton: {
    marginLeft: 12,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    textAlign: 'center',
  },
});