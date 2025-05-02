import { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Home, Coffee, Gift, Award, User } from 'lucide-react-native';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold
} from '@expo-google-fonts/inter';
import {
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';
import { ThemeProvider } from '@/contexts/ThemeContext';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Poppins-Medium': Poppins_500Medium,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
  });

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Return null to keep splash screen visible while fonts load
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider>
      <StatusBar style="light" />
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#121212',
            borderTopColor: '#2A2A2A',
          },
          tabBarActiveTintColor: '#FF8C42',
          tabBarInactiveTintColor: '#B0B0B0',
          headerStyle: {
            backgroundColor: '#121212',
          },
          headerTitleStyle: {
            fontFamily: 'Poppins-SemiBold',
            color: '#FFFFFF',
          },
          headerShadowVisible: false,
        }}>
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Home color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="order"
          options={{
            title: 'Order',
            tabBarIcon: ({ color, size }) => (
              <Coffee color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="loyalty"
          options={{
            title: 'Loyalty',
            tabBarIcon: ({ color, size }) => (
              <Award color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="gift"
          options={{
            title: 'Gift Cards',
            tabBarIcon: ({ color, size }) => (
              <Gift color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <User color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}