import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';
import PointsHistory from '@/components/loyalty/PointsHistory';
import RewardCard from '@/components/loyalty/RewardCard';

export default function LoyaltyScreen() {
  const { theme } = useTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;
  
  // Animation for the points counter
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  }, []);

  const animatedPoints = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 725],
  });

  const pointsProgress = 7; // Current coffees towards next reward
  const pointsNeeded = 10; // Coffees needed for a free reward
  const remainingPoints = pointsNeeded - pointsProgress;

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Points Summary Card */}
      <View style={styles.cardContainer}>
        <LinearGradient
          colors={['#2A2A2A', '#1E1E1E']}
          style={styles.pointsCard}
        >
          <Text style={styles.pointsLabel}>Total Loyalty Points</Text>
          <Animated.Text style={styles.pointsValue}>
            {animatedPoints.interpolate({
              inputRange: [0, 725],
              outputRange: ['0', '725'],
            }).toString()}
          </Animated.Text>
          
          <View style={styles.rewardProgress}>
            <View style={styles.progressTextContainer}>
              <Text style={styles.progressText}>
                {remainingPoints} more {remainingPoints === 1 ? 'coffee' : 'coffees'} for a free reward
              </Text>
            </View>
            
            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressBar, 
                  { width: `${(pointsProgress / pointsNeeded) * 100}%` }
                ]} 
              />
            </View>
            
            <View style={styles.progressLabels}>
              <Text style={styles.progressStart}>{pointsProgress}</Text>
              <Text style={styles.progressEnd}>{pointsNeeded}</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Available Rewards */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
          Available Rewards
        </Text>

        <RewardCard 
          title="Free Drink of Choice"
          description="Any size, any customization"
          pointsRequired={0}
          expiresAt="Never expires"
          isAvailable={true}
        />
      </View>

      {/* Upcoming Rewards */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
          Upcoming Rewards
        </Text>

        <RewardCard 
          title="Free Bakery Item"
          description="Any bakery item of your choice"
          pointsRequired={1000}
          pointsEarned={725}
          isAvailable={false}
        />
        
        <RewardCard 
          title="Free Breakfast Set"
          description="Coffee and sandwich combo"
          pointsRequired={1500}
          pointsEarned={725}
          isAvailable={false}
        />
      </View>

      {/* Points History */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
          Recent Activity
        </Text>
        
        <PointsHistory />
      </View>

      <View style={styles.footer}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  pointsCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  pointsLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#B0B0B0',
    marginBottom: 8,
  },
  pointsValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 48,
    color: '#FFD580',
    marginBottom: 24,
  },
  rewardProgress: {
    width: '100%',
  },
  progressTextContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  progressText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#FFFFFF',
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
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  progressStart: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#FFD580',
  },
  progressEnd: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#FFFFFF',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginBottom: 16,
  },
  footer: {
    height: 24,
  },
});