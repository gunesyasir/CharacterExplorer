import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {RootStackParamList, Screens} from '../../navigation/Screens';
import {View} from 'react-native';
import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, Screens.Episode>;

const Episode: FC<Props> = ({}) => {
  return <View style={styles.container} />;
};

export default Episode;
