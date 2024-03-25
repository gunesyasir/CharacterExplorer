import {CharacterResult} from '../network/Responses';

export enum Screens {
  Episode = 'Episode',
  Favorites = 'Favorites',
  Home = 'Home',
}

export type RootStackParamList = {
  Episode: {characters: CharacterResult[]};
  Favorites: undefined;
  Home: undefined;
};
