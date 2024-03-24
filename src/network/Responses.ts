import {Location, Origin} from './Models';

export interface EpisodeResponse {
  info: Info;
  results: EpisodeResult[];
}

export interface Info {
  count: number; // The length of the response
  pages: number;
  next: string; // Link to the next page (if it exists)
  prev: string; // Link to the previous page (if it exists)
}

export interface EpisodeResult {
  id: number;
  name: string;
  air_date: string;
  episode: string; // The code of the episode.
  characters: string[]; // List of characters who have been seen in the episode.
  url: string; // Link to the episode's own endpoint.
  created: string; // Time at which the episode was created in the database.
}

export interface CharacterResponse {
  info: Info;
  results: CharacterResult[];
}

export interface CharacterResult {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}
