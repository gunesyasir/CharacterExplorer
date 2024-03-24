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
});
