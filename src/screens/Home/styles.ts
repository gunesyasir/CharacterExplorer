import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  contentContainer: {
    backgroundColor: 'white',
    flexGrow: 1,
    paddingHorizontal: 16,
  },

  divider: {
    backgroundColor: 'gray',
    height: 1,
  },

  favoritesButton: {
    backgroundColor: '#E6E8EB',
    padding: 4,
    marginHorizontal: 16,
  },

  favoritesText: {
    fontSize: 19,
  },

  noResults: {
    fontSize: 22,
  },

  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchContainer: {
    margin: 16,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff1f3',
    borderRadius: 8,
  },

  textInput: {
    flex: 1,
    marginStart: 12,
    fontSize: 14,
    color: 'black',
  },

  upperContainer: {
    height: 72,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#78808D',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  upperText: {
    fontSize: 19,
    marginHorizontal: 16,
  },
});
