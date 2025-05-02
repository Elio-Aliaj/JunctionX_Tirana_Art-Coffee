import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function PointsHistory() {
  const { theme } = useTheme();
  
  const historyItems = [
    { 
      id: '1', 
      description: 'Purchase: Caramel Macchiato', 
      points: 75, 
      date: 'Today, 9:30 AM' 
    },
    { 
      id: '2', 
      description: 'Reward Redemption: Free Drink', 
      points: -500, 
      date: 'Yesterday, 3:14 PM' 
    },
    { 
      id: '3', 
      description: 'Purchase: Blueberry Muffin', 
      points: 50, 
      date: 'Feb 20, 2025' 
    },
    { 
      id: '4', 
      description: 'Purchase: Flat White', 
      points: 75, 
      date: 'Feb 18, 2025' 
    },
  ];

  return (
    <View style={styles.container}>
      {historyItems.map((item) => (
        <View key={item.id} style={styles.historyItem}>
          <View style={styles.descriptionContainer}>
            <Text style={[styles.description, { color: theme.colors.textPrimary }]}>
              {item.description}
            </Text>
            <Text style={[styles.date, { color: theme.colors.textSecondary }]}>
              {item.date}
            </Text>
          </View>
          
          <Text 
            style={[
              styles.points, 
              { 
                color: item.points > 0 ? theme.colors.success : theme.colors.error 
              }
            ]}
          >
            {item.points > 0 ? '+' : ''}{item.points}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    overflow: 'hidden',
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  descriptionContainer: {
    flex: 1,
  },
  description: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginBottom: 4,
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  points: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    marginLeft: 8,
  },
});