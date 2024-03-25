import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  addToFavoriteButton: {
    height: 24,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },

  addToFavoriteText: {
    fontSize: 20,
  },

  cardContainer: {
    height: 146,
    backgroundColor: 'skyblue',
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
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
    alignItems: 'center',
  },

  image: {
    height: '100%',
    width: '50%',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },

  name: {
    fontSize: 18,
  },

  status: {
    fontSize: 16,
    padding: 4,
  },

  statusContainer: {
    borderRadius: 6,
  },

  textContainer: {
    justifyContent: 'space-between',
    flex: 1,
    padding: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});
