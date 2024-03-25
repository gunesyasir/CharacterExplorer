import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList, Screens} from '../../navigation/Screens';
import React, {FC} from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../../App';
import {removeCharacterFromFavorites} from '../../redux/reducers/rootReducer';
import CharacterCard from '../../components/CharacterCard';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, Screens.Favorites>;

const Favorites: FC<Props> = () => {
  const dispatch = useDispatch();
  const favorites = useAppSelector(state => state.root.favorites);
  const favoritesCopy = [...favorites];
  const favoriteIds = favorites.map(favorite => favorite.id);

  const renderDivider = () => {
    return <View style={styles.divider} />;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={favorites}
        renderItem={({item}) => (
          <CharacterCard
            item={item}
            onFavoritePress={async () => {
              dispatch(removeCharacterFromFavorites(item));

              favoritesCopy.splice(favoritesCopy.indexOf(item), 1);
              await AsyncStorage.removeItem('favorites');
              await AsyncStorage.setItem(
                'favorites',
                JSON.stringify(favoritesCopy),
              );
            }}
            isFavorited={favoriteIds.includes(item.id)}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => renderDivider()}
        bounces={false}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
};

export default Favorites;
