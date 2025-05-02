import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface QRScannerOverlayProps {
  scanned: boolean;
}

export default function QRScannerOverlay({ scanned }: QRScannerOverlayProps) {
  const scanLineAnimation = new Animated.Value(0);
  
  useEffect(() => {
    if (!scanned) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scanLineAnimation, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      scanLineAnimation.stopAnimation();
    }
    
    return () => {
      scanLineAnimation.stopAnimation();
    };
  }, [scanned]);
  
  const scanLineTranslate = scanLineAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  return (
    <View style={styles.container}>
      <View style={styles.scanArea}>
        {/* Corner Indicators */}
        <View style={[styles.cornerIndicator, styles.topLeft]} />
        <View style={[styles.cornerIndicator, styles.topRight]} />
        <View style={[styles.cornerIndicator, styles.bottomLeft]} />
        <View style={[styles.cornerIndicator, styles.bottomRight]} />
        
        {/* Scan Line */}
        {!scanned && (
          <Animated.View 
            style={[
              styles.scanLine,
              {
                transform: [{ translateY: scanLineTranslate }],
              }
            ]} 
          />
        )}
        
        {/* Success Overlay */}
        {scanned && (
          <View style={styles.successOverlay}>
            <View style={styles.successIndicator} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 250,
    height: 250,
    position: 'relative',
  },
  cornerIndicator: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: '#FFFFFF',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderTopLeftRadius: 10,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderTopRightRadius: 10,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderBottomLeftRadius: 10,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderBottomRightRadius: 10,
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: 2,
    backgroundColor: '#FF8C42',
  },
  successOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIndicator: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(76, 175, 80, 0.6)',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
});