import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import styles from './styles';

const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <View style={styles.indicatorContainer}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    </View>
  );
};

export default LoadingIndicator;
