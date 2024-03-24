import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC, useEffect, useState} from 'react';
import {RootStackParamList, Screens} from '../../navigation/Screens';
import {FlatList, SafeAreaView, Text, TextInput, View} from 'react-native';
import styles from './styles';
import {sendRequest, SUFFIX_EPISODE} from '../../network/RequestManager';
import {EpisodeResult} from '../../network/Responses';
import EpisodeCard from '../../components/EpisodeCard';
import LoadingIndicator from '../../components/LoadingIndicator';

type Props = NativeStackScreenProps<RootStackParamList, Screens.Home>;

const Home: FC<Props> = ({navigation}) => {
  const [episodes, setEpisodes] = useState<EpisodeResult[]>([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState<EpisodeResult[]>([]); // Holding search results
  const [hasNextPage, setHasNextPage] = useState<string>('');
  const [pageNo, setPageNo] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>('');
  const [showLoading, setShowLoading] = useState<boolean>(false);

  useEffect(() => {
    _sendRequest();
  }, [pageNo]);

  useEffect(() => {
    setFilteredEpisodes(
      episodes.filter(episode =>
        episode.name.toLowerCase().includes(searchText.toLowerCase()),
      ),
    );
  }, [searchText]);

  const onEpisodePress = (index: number) => {
    navigation.navigate(Screens.Episode);
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

  const _sendRequest = async () => {
    setShowLoading(true);

    sendRequest(SUFFIX_EPISODE, pageNo).then(response => {
      setShowLoading(false);

      response.results.map(element => {
        setEpisodes(prevList => [...prevList, element]);
      });

      setHasNextPage(response.info.next ?? false);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderSearchBar()}
      <FlatList
        data={searchText.length > 0 ? filteredEpisodes : episodes}
        renderItem={({item, index}) => (
          <EpisodeCard item={item} onPress={() => onEpisodePress(index)} />
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
