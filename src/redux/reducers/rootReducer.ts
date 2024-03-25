import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CharacterResult} from '../../network/Responses';

type RootState = {
  favorites: CharacterResult[];
};

const initialState: RootState = {
  favorites: [],
};

const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    addCharacterToFavorites: (
      state,
      action: PayloadAction<CharacterResult>,
    ) => {
      state.favorites.push(action.payload);
    },

    removeCharacterFromFavorites: (
      state,
      action: PayloadAction<CharacterResult>,
    ) => {
      state.favorites.splice(state.favorites.indexOf(action.payload), 1);
    },

    setFavorites: (state, action: PayloadAction<CharacterResult[]>) => {
      state.favorites = action.payload;
    },
  },
  extraReducers: () => {}, // Needed for asynchronous tasks
});

export const {
  addCharacterToFavorites,
  removeCharacterFromFavorites,
  setFavorites,
} = rootSlice.actions;

export default rootSlice.reducer;
