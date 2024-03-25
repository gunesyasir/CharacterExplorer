import React, {FC} from 'react';
import {CharacterResult} from '../../network/Responses';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';

type Props = {
  item: CharacterResult;
  onFavoritePress: () => void;
  isFavorited: boolean;
};

const EpisodeCard: FC<Props> = ({item, onFavoritePress, isFavorited}) => {
  return (
    <View style={styles.cardContainer}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>

        <View style={styles.flexRow}>
          <View
            style={[
              styles.statusContainer,
              {backgroundColor: item.status === 'Alive' ? 'green' : 'red'},
            ]}>
            <Text style={styles.status}>{item.status}</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.addToFavoriteButton,
              isFavorited && {backgroundColor: 'green'},
            ]}
            onPress={() => onFavoritePress()}>
            <Text style={styles.status}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EpisodeCard;
