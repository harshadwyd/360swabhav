import { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import PointsAnimation from './PointsAnimation';

interface AnimationQueueItem {
  id: string;
  points: number;
  type: 'normal' | 'streak' | 'bonus' | 'checklist' | 'voice' | 'character' | 'badge' | 'level';
  source?: string;
  multiplier?: number;
}

interface PointsAnimationManagerProps {
  children: React.ReactNode;
}

// Global animation queue manager
class AnimationQueue {
  private static instance: AnimationQueue;
  private queue: AnimationQueueItem[] = [];
  private isPlaying = false;
  private listeners: ((item: AnimationQueueItem | null) => void)[] = [];

  static getInstance() {
    if (!AnimationQueue.instance) {
      AnimationQueue.instance = new AnimationQueue();
    }
    return AnimationQueue.instance;
  }

  addAnimation(animation: Omit<AnimationQueueItem, 'id'>) {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const queueItem = { ...animation, id };
    
    console.log('Adding animation to queue:', queueItem); // Debug log
    
    this.queue.push(queueItem);
    this.processQueue();
  }

  private processQueue() {
    if (this.isPlaying || this.queue.length === 0) return;

    this.isPlaying = true;
    const nextAnimation = this.queue.shift()!;
    
    console.log('Processing animation:', nextAnimation); // Debug log
    
    // Notify all listeners
    this.listeners.forEach(listener => listener(nextAnimation));
  }

  onAnimationComplete() {
    this.isPlaying = false;
    
    // Notify listeners that animation is complete
    this.listeners.forEach(listener => listener(null));
    
    // Process next animation after a short delay
    setTimeout(() => {
      this.processQueue();
    }, 300);
  }

  subscribe(listener: (item: AnimationQueueItem | null) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Method to clear queue if needed
  clearQueue() {
    this.queue = [];
    this.isPlaying = false;
  }
}

export const animationQueue = AnimationQueue.getInstance();

export default function PointsAnimationManager({ children }: PointsAnimationManagerProps) {
  const [currentAnimation, setCurrentAnimation] = useState<AnimationQueueItem | null>(null);

  useEffect(() => {
    const unsubscribe = animationQueue.subscribe((animation) => {
      console.log('Animation manager received:', animation); // Debug log
      setCurrentAnimation(animation);
    });

    return unsubscribe;
  }, []);

  const handleAnimationComplete = () => {
    console.log('Animation completed'); // Debug log
    animationQueue.onAnimationComplete();
  };

  return (
    <View style={styles.container}>
      {children}
      
      {/* Single animation display */}
      {currentAnimation && (
        <PointsAnimation
          points={currentAnimation.points}
          visible={true}
          onComplete={handleAnimationComplete}
          type={currentAnimation.type}
          source={currentAnimation.source}
          multiplier={currentAnimation.multiplier || 1}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});