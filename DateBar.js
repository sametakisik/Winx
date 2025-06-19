import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, PanResponder } from 'react-native';
import { format, addDays, subDays } from 'date-fns';
import { tr } from 'date-fns/locale';

export default function DateBar({ selectedDate, setSelectedDate }) {
  const fadeAnim = new Animated.Value(1);
  const swipeAnim = new Animated.Value(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 50) {
        handleSwipe('right');
      } else if (gestureState.dx < -50) {
        handleSwipe('left');
      }
    },
  });

  const handleSwipe = (direction) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(swipeAnim, {
        toValue: direction === 'right' ? 100 : -100,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setSelectedDate(prev => 
        direction === 'right' ? subDays(prev, 1) : addDays(prev, 1)
      );
      swipeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    });
  };

  const goToPreviousDay = () => handleSwipe('right');
  const goToNextDay = () => handleSwipe('left');

  const formattedDate = format(selectedDate, 'd MMMM EEEE', { locale: tr });

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={goToPreviousDay} 
        style={styles.arrowButton}
        activeOpacity={0.7}
      >
        <Text style={styles.arrow}>{'‹'}</Text>
      </TouchableOpacity>

      <Animated.View 
        style={[
          styles.dateContainer,
          { 
            opacity: fadeAnim,
            transform: [{ translateX: swipeAnim }] 
          }
        ]}
        {...panResponder.panHandlers}
      >
        <Text style={styles.dateText}>
          {format(selectedDate, 'd MMMM EEEE', { locale: tr })}
        </Text>
      </Animated.View>

      <TouchableOpacity 
        onPress={goToNextDay} 
        style={styles.arrowButton}
        activeOpacity={0.7}
      >
        <Text style={styles.arrow}>{'›'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginHorizontal: 20,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  arrowButton: {
    padding: 12,
    borderRadius: 30,
    backgroundColor: '#f8f8f8',
  },
  arrow: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#555',
  },
  dateContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    textTransform: 'capitalize',
  },
});