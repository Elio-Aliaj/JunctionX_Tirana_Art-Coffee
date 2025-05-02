import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Clock, ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface OrderStatusCardProps {
  status: 'preparing' | 'ready' | 'in-progress';
  estimatedTime?: string;
}

export default function OrderStatusCard({ status, estimatedTime }: OrderStatusCardProps) {
  const { theme } = useTheme();
  
  const getStatusText = () => {
    switch (status) {
      case 'preparing':
        return 'Your order is being prepared';
      case 'ready':
        return 'Your order is ready for pickup';
      case 'in-progress':
        return 'Barista is working on your order';
      default:
        return '';
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: '#1E1E1E' }]}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View style={styles.statusInfo}>
          <View style={[styles.statusIndicator, { backgroundColor: theme.colors.primary }]} />
          <Text style={[styles.statusText, { color: theme.colors.textPrimary }]}>
            {getStatusText()}
          </Text>
        </View>
        
        {estimatedTime && (
          <View style={styles.timeInfo}>
            <Clock color={theme.colors.textSecondary} size={14} />
            <Text style={[styles.timeText, { color: theme.colors.textSecondary }]}>
              {estimatedTime}
            </Text>
          </View>
        )}
      </View>
      
      <ChevronRight color={theme.colors.textSecondary} size={20} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
  },
  content: {
    flex: 1,
  },
  statusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginLeft: 4,
  },
});