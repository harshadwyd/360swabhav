import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { CircleHelp as HelpCircle, X } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface InteractiveTooltipProps {
  title: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
}

export default function InteractiveTooltip({ 
  title, 
  content, 
  position = 'top', 
  children 
}: InteractiveTooltipProps) {
  const [visible, setVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const toggleTooltip = () => {
    setVisible(!visible);
  };

  const getTooltipStyle = () => {
    switch (position) {
      case 'bottom':
        return { top: 40, left: -100 };
      case 'left':
        return { top: -20, right: 40 };
      case 'right':
        return { top: -20, left: 40 };
      default: // top
        return { bottom: 40, left: -100 };
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.triggerContainer}>
        {children}
        <TouchableOpacity style={styles.helpButton} onPress={toggleTooltip}>
          <HelpCircle size={16} color="#4ECDC4" />
        </TouchableOpacity>
      </View>

      {visible && (
        <Animated.View
          style={[
            styles.tooltip,
            getTooltipStyle(),
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.tooltipHeader}>
            <Text style={styles.tooltipTitle}>{title}</Text>
            <TouchableOpacity onPress={toggleTooltip} style={styles.closeButton}>
              <X size={16} color="rgba(255, 255, 255, 0.7)" />
            </TouchableOpacity>
          </View>
          <Text style={styles.tooltipContent}>{content}</Text>
          <View style={[styles.tooltipArrow, getArrowStyle(position)]} />
        </Animated.View>
      )}
    </View>
  );
}

const getArrowStyle = (position: string) => {
  switch (position) {
    case 'bottom':
      return { top: -8, left: 100, borderBottomColor: '#2d2d2d' };
    case 'left':
      return { top: 20, right: -8, borderLeftColor: '#2d2d2d' };
    case 'right':
      return { top: 20, left: -8, borderRightColor: '#2d2d2d' };
    default: // top
      return { bottom: -8, left: 100, borderTopColor: '#2d2d2d' };
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  triggerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  helpButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(78, 205, 196, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: '#2d2d2d',
    borderRadius: 12,
    padding: 16,
    maxWidth: 250,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  tooltipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tooltipTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  tooltipContent: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 16,
  },
  tooltipArrow: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
  },
});