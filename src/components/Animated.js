import React, {useEffect, useRef} from 'react';
import {Animated, Easing} from 'react-native';

export const AnimatedContainer = ({children}) => {
  const animate_state = {
    start: 0,
    end: 100,
  };

  const value = useRef(new Animated.Value(animate_state.start)).current;

  const startAnimate = () => {
    Animated.timing(value, {
      toValue: animate_state.end,
      useNativeDriver: true,
      duration: 1000,
      easing: Easing.bounce,
    }).start();
  };

  const inputRange = [animate_state.start, animate_state.end]; //или Object.values(animate_state)
  const translateY = value.interpolate({inputRange, outputRange: [0, 20]});
  const opacity = value.interpolate({inputRange, outputRange: [0, 1]});

  useEffect(() => {
    startAnimate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View style={{transform: [{translateY}], opacity}}>
      {children}
    </Animated.View>
  );
};

export const FadeInContainer = props => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};
