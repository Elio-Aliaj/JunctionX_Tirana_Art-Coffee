import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Gift } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface RewardCardProps {
  title: string;
  description: string;
  pointsRequired?: number;
  pointsEarned?: number;
  expiresAt?: string;
  isAvailable: boolean;
}

export default function RewardCard({ 
  title, 
  description, 
  pointsRequired = 0, 
  pointsEarned = 0,
  expiresAt,
  isAvailable,
}: RewardCardProps) {
  const { theme } = useTheme();
  
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { backgroundColor: isAvailable ? 'rgba(255, 140, 66, 0.1)' : '#1E1E1E' }
      ]}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: isAvailable ? theme.colors.primary : '#2A2A2A' }]}>
          <Gift color="#FFFFFF" size={20} />
        </View>
        
        <View style={styles.details}>
          <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
            {title}
          </Text>
          <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
            {description}
          </Text>
          
          {isAvailable ? (
            <Text style={[styles.expires, { color: theme.colors.textSecondary }]}>
              {expiresAt}
            </Text>
          ) : (
            <View style={styles.progressContainer}>
              <View style={styles.progressTextContainer}>
                <Text style={[styles.progressText, { color: theme.colors.textSecondary }]}>
                  {pointsEarned} / {pointsRequired} points
                </Text>
              </View>
              
              <View style={styles.progressBarContainer}>
                <View 
                  style={[
                    styles.progressBar, 
                    { 
                      width: `${(pointsEarned / pointsRequired) * 100}%`,
                      backgroundColor: theme.colors.primary, 
                    }
                  ]} 
                />
              </View>
            </View>
          )}
        </View>
      </View>
      
      {isAvailable && (
        <TouchableOpacity 
          style={[styles.redeemButton, { backgroundColor: theme.colors.primary }]}
        >
          <Text style={styles.redeemButtonText}>Redeem</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  content: {
    flexDirection: 'row',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 6,
  },
  expires: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  progressContainer: {
    
  },
  progressTextContainer: {
    marginBottom: 4,
  },
  progressText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 2,
  },
  redeemButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  redeemButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
});