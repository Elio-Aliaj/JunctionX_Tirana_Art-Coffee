import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';

interface QuickActionButtonProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

export default function QuickActionButton({ icon, label, href }: QuickActionButtonProps) {
  const { theme } = useTheme();
  
  return (
    <Link href={href} asChild>
      <TouchableOpacity style={styles.container}>
        <View style={[styles.iconContainer, { backgroundColor: 'rgba(255, 140, 66, 0.1)' }]}>
          {icon}
        </View>
        <Text style={[styles.label, { color: theme.colors.textPrimary }]}>{label}</Text>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
});