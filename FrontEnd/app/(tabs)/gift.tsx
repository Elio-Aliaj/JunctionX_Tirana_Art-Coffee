import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Plus } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';
import GiftCardItem from '@/components/gift/GiftCardItem';
import SendGiftButton from '@/components/gift/SendGiftButton';

export default function GiftScreen() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('my-cards');

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab, 
            activeTab === 'my-cards' && [styles.activeTab, { borderBottomColor: theme.colors.primary }]
          ]}
          onPress={() => setActiveTab('my-cards')}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'my-cards' ? 
                [styles.activeTabText, { color: theme.colors.primary }] : 
                { color: theme.colors.textSecondary }
            ]}
          >
            My Cards
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tab, 
            activeTab === 'sent' && [styles.activeTab, { borderBottomColor: theme.colors.primary }]
          ]}
          onPress={() => setActiveTab('sent')}
        >
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'sent' ? 
                [styles.activeTabText, { color: theme.colors.primary }] : 
                { color: theme.colors.textSecondary }
            ]}
          >
            Sent
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView 
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'my-cards' ? (
          <>
            <View style={styles.balanceCard}>
              <LinearGradient
                colors={['#1E1E1E', '#2A2A2A']}
                style={styles.balanceCardInner}
              >
                <Text style={styles.balanceLabel}>Available Balance</Text>
                <Text style={styles.balanceValue}>$25.50</Text>
                <Text style={styles.balanceHint}>Tap to view details</Text>
              </LinearGradient>
            </View>

            <View style={styles.cardSection}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
                  My Gift Cards
                </Text>
                <TouchableOpacity style={styles.addButton}>
                  <Plus color={theme.colors.textPrimary} size={20} />
                </TouchableOpacity>
              </View>

              <GiftCardItem 
                title="Holiday Gift Card"
                balance={25.50}
                expiresAt="Never Expires"
                imageUrl="https://images.pexels.com/photos/6802983/pexels-photo-6802983.jpeg"
              />
              
              <GiftCardItem 
                title="Birthday Gift"
                balance={0.00}
                expiresAt="Used on Jan 15, 2025"
                imageUrl="https://images.pexels.com/photos/1119697/pexels-photo-1119697.jpeg"
                isUsed={true}
              />
            </View>
          </>
        ) : (
          <View style={styles.sentCardsSection}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
                Sent Gift Cards
              </Text>
            </View>

            <GiftCardItem 
              title="For Sarah's Birthday"
              balance={20.00}
              recipient="Sarah Johnson"
              sentAt="Jan 20, 2025"
              imageUrl="https://images.pexels.com/photos/1266302/pexels-photo-1266302.jpeg"
            />
            
            <GiftCardItem 
              title="Thank You Gift"
              balance={10.00}
              recipient="Mike Smith"
              sentAt="Dec 25, 2024"
              imageUrl="https://images.pexels.com/photos/585750/pexels-photo-585750.jpeg"
            />
          </View>
        )}
      </ScrollView>

      {/* Send Gift Button */}
      <SendGiftButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  tab: {
    paddingVertical: 16,
    marginRight: 24,
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  activeTabText: {
    fontFamily: 'Poppins-SemiBold',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100, // Extra space for the floating button
  },
  balanceCard: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
  },
  balanceCardInner: {
    padding: 24,
    alignItems: 'center',
  },
  balanceLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#B0B0B0',
    marginBottom: 8,
  },
  balanceValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 36,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  balanceHint: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#B0B0B0',
  },
  cardSection: {
    marginBottom: 24,
  },
  sentCardsSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});