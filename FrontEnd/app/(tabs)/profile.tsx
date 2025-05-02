import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import { 
  LogOut, 
  CreditCard,
  Bell,
  MapPin,
  ShoppingBag,
  HelpCircle,
  ChevronRight
} from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import ProfileMenuOption from '@/components/profile/ProfileMenuOption';

export default function ProfileScreen() {
  const { theme } = useTheme();
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' }} 
            style={styles.profileImage}
          />
        </View>
        <Text style={[styles.profileName, { color: theme.colors.textPrimary }]}>Emma Watson</Text>
        <Text style={[styles.profileEmail, { color: theme.colors.textSecondary }]}>emma.watson@example.com</Text>
        
        <TouchableOpacity style={[styles.editButton, { borderColor: theme.colors.textSecondary }]}>
          <Text style={[styles.editButtonText, { color: theme.colors.textPrimary }]}>
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>

      {/* Profile Menu */}
      <View style={styles.menuContainer}>
        {/* Account Section */}
        <View style={styles.menuSection}>
          <Text style={[styles.menuSectionTitle, { color: theme.colors.textSecondary }]}>
            ACCOUNT
          </Text>
          
          <ProfileMenuOption
            icon={<CreditCard color={theme.colors.textPrimary} size={20} />}
            title="Payment Methods"
            chevron={true}
          />
          
          <ProfileMenuOption
            icon={<Bell color={theme.colors.textPrimary} size={20} />}
            title="Notifications"
            toggle={true}
            value={true}
          />
          
          <ProfileMenuOption
            icon={<MapPin color={theme.colors.textPrimary} size={20} />}
            title="Favorite Locations"
            chevron={true}
          />
        </View>

        {/* Orders Section */}
        <View style={styles.menuSection}>
          <Text style={[styles.menuSectionTitle, { color: theme.colors.textSecondary }]}>
            ORDERS
          </Text>
          
          <ProfileMenuOption
            icon={<ShoppingBag color={theme.colors.textPrimary} size={20} />}
            title="Order History"
            chevron={true}
          />
        </View>

        {/* Support Section */}
        <View style={styles.menuSection}>
          <Text style={[styles.menuSectionTitle, { color: theme.colors.textSecondary }]}>
            SUPPORT
          </Text>
          
          <ProfileMenuOption
            icon={<HelpCircle color={theme.colors.textPrimary} size={20} />}
            title="Help Center"
            chevron={true}
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut color={theme.colors.error} size={20} />
          <Text style={[styles.logoutText, { color: theme.colors.error }]}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* App Version */}
      <Text style={[styles.versionText, { color: theme.colors.textSecondary }]}>
        Version 1.0.0
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  profileImageContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    overflow: 'hidden',
    marginBottom: 16,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginBottom: 16,
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  editButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuSection: {
    marginTop: 24,
    marginBottom: 8,
  },
  menuSectionTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 24,
  },
  logoutText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    marginLeft: 12,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 24,
  },
});