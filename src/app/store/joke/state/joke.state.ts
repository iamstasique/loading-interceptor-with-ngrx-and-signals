import { Joke } from '../../../models/joke.model';

export interface JokeState {
  jokeList: string[];
  currentJoke: Joke | null;
}

export const INITIAL_JOKE_STATE: JokeState = {
  jokeList: [],
  currentJoke: null,
};
