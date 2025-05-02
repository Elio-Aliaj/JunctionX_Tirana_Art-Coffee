import React, { createContext, useContext, ReactNode } from 'react';

// Theme colors
const theme = {
  colors: {
    background: '#121212',
    primary: '#FF8C42',
    secondary: '#FFD580',
    textPrimary: '#FFFFFF',
    textSecondary: '#B0B0B0',
    success: '#4CAF50',
    error: '#F44336',
  },
};

// Create context
const ThemeContext = createContext({
  theme,
});

// Theme provider component
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook for using the theme context
export function useTheme() {
  return useContext(ThemeContext);
}