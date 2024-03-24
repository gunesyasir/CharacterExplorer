import React, {FC} from 'react';
import {EpisodeResult} from '../../network/Responses';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';

type Props = {
  item: EpisodeResult;
  onPress: () => void;
};

const EpisodeCard: FC<Props> = ({item, onPress}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.cardContainer}
      onPress={onPress}>
      <View style={styles.flexRow}>
        <Text style={styles.episodeText}>{item.episode}</Text>
        <Text style={styles.name}>{item.name}</Text>
      </View>

      <Text style={styles.date}>{item.air_date}</Text>
    </TouchableOpacity>
  );
};

export default EpisodeCard;
