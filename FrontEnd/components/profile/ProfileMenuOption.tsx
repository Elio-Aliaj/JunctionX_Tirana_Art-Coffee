import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface ProfileMenuOptionProps {
  icon: React.ReactNode;
  title: string;
  value?: boolean;
  chevron?: boolean;
  toggle?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
}

export default function ProfileMenuOption({ 
  icon, 
  title, 
  value = false,
  chevron = false,
  toggle = false,
  onPress,
  onToggle,
}: ProfileMenuOptionProps) {
  const { theme } = useTheme();
  
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
      disabled={toggle}
    >
      <View style={styles.iconContainer}>
        {icon}
      </View>
      
      <Text style={[styles.title, { color: theme.colors.textPrimary }]}>
        {title}
      </Text>
      
      {toggle && (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: '#2A2A2A', true: 'rgba(255, 140, 66, 0.4)' }}
          thumbColor={value ? theme.colors.primary : '#B0B0B0'}
        />
      )}
      
      {chevron && (
        <ChevronRight color={theme.colors.textSecondary} size={20} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  iconContainer: {
    marginRight: 12,
  },
  title: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    flex: 1,
  },
});