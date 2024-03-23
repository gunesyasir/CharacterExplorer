import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {RootStackParamList, Screens} from '../../navigation/Screens';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, Screens.Home>;

const Home: FC<Props> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{borderColor: 'black', borderWidth: 2}}
        onPress={() => navigation.navigate(Screens.Episode)}>
        <Text>Bölüm detayına git</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
