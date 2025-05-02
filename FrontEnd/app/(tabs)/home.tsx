import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Link } from 'expo-router';
import { Bell, QrCode, MapPin, Coffee } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';
import OrderStatusCard from '@/components/home/OrderStatusCard';
import RecentOrderItem from '@/components/home/RecentOrderItem';
import QuickActionButton from '@/components/home/QuickActionButton';
import PromotionCard from '@/components/home/PromotionCard';

export default function HomeScreen() {
  const { theme } = useTheme();
  const [greeting, setGreeting] = useState('');
  const [rewardProgress, setRewardProgress] = useState(7);
  const animation = new Animated.Value(0);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');

    Animated.timing(animation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <View style={styles.header}>
        <Animated.View style={[styles.greetingContainer, { opacity, transform: [{ translateY }] }]}>
          <View>
            <Text style={[styles.greeting, { color: theme.colors.textPrimary }]}>{greeting}</Text>
            <Text style={[styles.name, { color: theme.colors.textPrimary }]}>Emma</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell color={theme.colors.textPrimary} size={24} />
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Order Status (if there's an active order) */}
      <OrderStatusCard status="in-progress" estimatedTime="5 min" />

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Quick Actions</Text>
        <View style={styles.quickActionsContainer}>
          <QuickActionButton 
            icon={<QrCode color={theme.colors.primary} size={24} />}
            label="Scan QR"
            href="/scan"
          />
          <QuickActionButton 
            icon={<Coffee color={theme.colors.primary} size={24} />}
            label="Reorder"
            href="/order"
          />
          <QuickActionButton 
            icon={<MapPin color={theme.colors.primary} size={24} />}
            label="Nearby"
            href="/locations"
          />
        </View>
      </View>

      {/* Loyalty Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Loyalty Rewards</Text>
          <Link href="/loyalty" style={styles.viewAllLink}>
            <Text style={{ color: theme.colors.primary, fontFamily: 'Inter-Medium' }}>View</Text>
          </Link>
        </View>
        
        <TouchableOpacity style={styles.loyaltyCard}>
          <LinearGradient
            colors={['#1E1E1E', '#2A2A2A']}
            style={styles.loyaltyCardInner}
          >
            <View style={styles.rewardTracker}>
              <Text style={styles.rewardText}>
                <Text style={styles.rewardCount}>{rewardProgress}</Text>/10 coffees
              </Text>
              <Text style={styles.rewardInfo}>3 more for a free drink!</Text>
            </View>

            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressBar, 
                  { width: `${(rewardProgress / 10) * 100}%` }
                ]} 
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Promotions */}
      <PromotionCard 
        title="Winter Special"
        description="Try our new Cinnamon Spiced Latte with 2x loyalty points"
        imageUrl="https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg"
      />

      {/* Recent Orders */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Recent Orders</Text>
          <Link href="/order-history" style={styles.viewAllLink}>
            <Text style={{ color: theme.colors.primary, fontFamily: 'Inter-Medium' }}>View All</Text>
          </Link>
        </View>
        
        <View style={styles.recentOrdersContainer}>
          <RecentOrderItem 
            title="Caramel Macchiato"
            details="Large, Oat Milk, Extra Shot"
            date="Today, 9:30 AM"
            imageUrl="https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg"
          />
          <RecentOrderItem 
            title="Blueberry Muffin"
            details="Warmed"
            date="Yesterday, 3:14 PM"
            imageUrl="https://images.pexels.com/photos/3732568/pexels-photo-3732568.jpeg"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 32,
  },
  header: {
    paddingTop: 16,
    paddingHorizontal: 20,
  },
  greetingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  name: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    marginTop: 4,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginBottom: 12,
  },
  viewAllLink: {
    fontSize: 14,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loyaltyCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  loyaltyCardInner: {
    padding: 16,
    borderRadius: 16,
  },
  rewardTracker: {
    marginBottom: 12,
  },
  rewardText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  rewardCount: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#FFD580',
  },
  rewardInfo: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#B0B0B0',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FF8C42',
    borderRadius: 4,
  },
  recentOrdersContainer: {
    gap: 12,
  },
});