import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  cardContainer: {
    height: 200,
    backgroundColor: 'gray',
    marginVertical: 12,
    borderRadius: 8,
    padding: 12,
    justifyContent: 'space-between',
  },

  date: {
    alignSelf: 'flex-end',
  },

  episodeText: {
    fontSize: 18,
    marginEnd: 12,
  },

  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  name: {
    fontSize: 18,
    flex: 1,
    textAlign: 'right',
  },
});
