import { INITIAL_JOKE_STATE, JokeState } from './joke/state/joke.state';

export interface AppState {
  jokeState: JokeState;
}

const INITIAL_APP_STATE: AppState = {
  jokeState: INITIAL_JOKE_STATE,
};

export function getInitialAppState(): AppState {
  return INITIAL_APP_STATE;
}

export function getInitialJokeState(): JokeState {
  return INITIAL_APP_STATE.jokeState;
}

export const getJokesState = (state: AppState) => state.jokeState;
