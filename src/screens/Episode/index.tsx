import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC, useEffect, useState} from 'react';
import {RootStackParamList, Screens} from '../../navigation/Screens';
import {FlatList, SafeAreaView, Text, TextInput, View} from 'react-native';
import styles from './styles';
import CharacterCard from '../../components/CharacterCard';
import {CharacterResult} from '../../network/Responses';

type Props = NativeStackScreenProps<RootStackParamList, Screens.Episode>;

const Episode: FC<Props> = ({route}) => {
  const [filteredCharacters, setFilteredCharacters] = useState<
    CharacterResult[]
  >([]);
  const [searchText, setSearchText] = useState<string>('');

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
            onFavoritePress={() => {
              // add to favorite
            }}
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
