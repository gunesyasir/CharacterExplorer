import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC, useEffect, useState} from 'react';
import {RootStackParamList, Screens} from '../../navigation/Screens';
import {FlatList, SafeAreaView, Text, TextInput, View} from 'react-native';
import styles from './styles';
import CharacterCard from '../../components/CharacterCard';
import {CharacterResult} from '../../network/Responses';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../../App';
import {
  addCharacterToFavorites,
  removeCharacterFromFavorites,
} from '../../redux/reducers/rootReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, Screens.Episode>;

const Episode: FC<Props> = ({route}) => {
  const [filteredCharacters, setFilteredCharacters] = useState<
    CharacterResult[]
  >([]);
  const [searchText, setSearchText] = useState<string>('');
  const dispatch = useDispatch();
  const favorites = useAppSelector(state => state.root.favorites);
  const favoritesCopy = [...favorites];
  const favoriteIds = favorites.map(favorite => favorite.id);

  useEffect(() => {
    setFilteredCharacters(
      route.params.characters.filter(characters =>
        characters.name.toLowerCase().includes(searchText.toLowerCase()),
      ),
    );
  }, [searchText]);

  const renderDivider = () => {
    return <View style={styles.divider} />;
  };

  const renderListEmptyComponent = () => {
    return (
      <View style={styles.noResultsContainer}>
        <Text style={styles.noResults}>No results found</Text>
      </View>
    );
  };

  const renderSearchBar = () => {
    return (
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={setSearchText}
          blurOnSubmit={true}
          returnKeyType="search"
          placeholder="Search character name"
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderSearchBar()}
      <FlatList
        data={
          searchText.length > 0 ? filteredCharacters : route.params.characters
        }
        renderItem={({item}) => (
          <CharacterCard
            item={item}
            onFavoritePress={async () => {
              if (favoriteIds.includes(item.id)) {
                dispatch(removeCharacterFromFavorites(item));
              } else {
                dispatch(addCharacterToFavorites(item));
                favoritesCopy.push(item);
                await AsyncStorage.removeItem('favorites');
                await AsyncStorage.setItem(
                  'favorites',
                  JSON.stringify(favoritesCopy),
                );
              }
            }}
            isFavorited={favoriteIds.includes(item.id)}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => renderDivider()}
        ListEmptyComponent={renderListEmptyComponent()}
        bounces={false}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
};

export default Episode;
