import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC, useEffect, useState} from 'react';
import {RootStackParamList, Screens} from '../../navigation/Screens';
import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {sendRequest, EndpointSuffixes} from '../../network/RequestManager';
import {CharacterResult, EpisodeResult} from '../../network/Responses';
import EpisodeCard from '../../components/EpisodeCard';
import LoadingIndicator from '../../components/LoadingIndicator';
import {useDispatch} from 'react-redux';
import {setFavorites} from '../../redux/reducers/rootReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = NativeStackScreenProps<RootStackParamList, Screens.Home>;

const Home: FC<Props> = ({navigation}) => {
  const [episodes, setEpisodes] = useState<EpisodeResult[]>([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState<EpisodeResult[]>([]); // Holding search results
  const [hasNextPage, setHasNextPage] = useState<string>('');
  const [pageNo, setPageNo] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>('');
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    _setFavorites();
  }, []);

  useEffect(() => {
    _sendRequest(EndpointSuffixes.EPISODE);
  }, [pageNo]);

  useEffect(() => {
    setFilteredEpisodes(
      episodes.filter(episode =>
        episode.name.toLowerCase().includes(searchText.toLowerCase()),
      ),
    );
  }, [searchText]);

  const onEpisodePress = (item: EpisodeResult) => {
    let idArray: string[] = [];

    if (item.characters.length > 0) {
      item.characters.forEach(characterAdresses => {
        if (characterAdresses.split('/').pop()) {
          idArray.push(characterAdresses.split('/').pop()!);
        }
      });
    }

    _sendRequest(
      EndpointSuffixes.CHARACTER,
      idArray.join(',').toString(),
      characters => {
        navigation.navigate(Screens.Episode, {characters: characters});
      },
    );
  };

  const onReachedEnd = () => {
    if (!hasNextPage) {
      return;
    }

    setPageNo(pageNo + 1);
  };

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
          placeholder="Search episode name"
        />
      </View>
    );
  };

  const renderUpperMenu = () => {
    return (
      <View style={styles.upperContainer}>
        <Text style={styles.upperText}>CharacterExplorer</Text>
        <TouchableOpacity
          style={styles.favoritesButton}
          onPress={() => navigation.navigate(Screens.Favorites)}>
          <Text style={styles.favoritesText}>Favorites</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const _sendRequest = async (
    endpointSuffix: EndpointSuffixes,
    idSuffix?: string,
    onCompleted?: (results: CharacterResult[]) => void,
  ) => {
    setShowLoading(true);

    sendRequest(endpointSuffix, idSuffix ? undefined : pageNo, idSuffix).then(
      response => {
        setShowLoading(false);

        if (idSuffix) {
          onCompleted?.(response);
        } else {
          response.results.map(element => {
            setEpisodes(prevList => [...prevList, element]);
          });

          setHasNextPage(response.info.next ?? false);
        }
      },
    );
  };

  const _setFavorites = async () => {
    const favorites = await AsyncStorage.getItem('favorites');
    if (favorites) {
      const parsedFavorites = JSON.parse(favorites);

      dispatch(setFavorites(parsedFavorites));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderUpperMenu()}

      {renderSearchBar()}

      <FlatList
        data={searchText.length > 0 ? filteredEpisodes : episodes}
        renderItem={({item}) => (
          <EpisodeCard item={item} onPress={() => onEpisodePress(item)} />
        )}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => renderDivider()}
        ListEmptyComponent={renderListEmptyComponent()}
        bounces={false}
        contentContainerStyle={styles.contentContainer}
        onEndReachedThreshold={0.1}
        onEndReached={onReachedEnd}
      />
      {showLoading && <LoadingIndicator />}
    </SafeAreaView>
  );
};

export default Home;
