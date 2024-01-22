import { createSelector } from '@ngrx/store';
import { getJokesState } from '../../app.state';
import { JokeState } from '../state/joke.state';

export const SELECT_JOKES = createSelector(
  getJokesState,
  (state: JokeState) => state.jokeList
);
export const SELECT_CURRENT_JOKE = createSelector(
  getJokesState,
  (state: JokeState) => state.currentJoke
);
