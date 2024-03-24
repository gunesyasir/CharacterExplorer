import {CharacterResult} from '../network/Responses';

export enum Screens {
  Episode = 'Episode',
  Home = 'Home',
}

export type RootStackParamList = {
  Episode: {characters: CharacterResult[]};
  Home: undefined;
};
