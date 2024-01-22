import { createAction, props } from '@ngrx/store';
import { Joke } from '../../../models/joke.model';

export enum JokeActions {
  GetJokes = '[JOKE] Get Joke Categories',
  GetJokesSuccess = '[JOKE] Get Joke Categories Success',

  GetJoke = '[JOKE] Get Joke',
  GetJokeSuccess = '[JOKE] Get Joke Success',
}

export const GET_JOKE_CATEGORIES = createAction(JokeActions.GetJokes);
export const GET_JOKE_CATEGORIES_SUCCESS = createAction(
  JokeActions.GetJokesSuccess,
  props<{ categories: string[] }>()
);

export const GET_JOKE = createAction(
  JokeActions.GetJoke,
  props<{ category: string }>()
);
export const GET_JOKE_SUCCESS = createAction(
  JokeActions.GetJokeSuccess,
  props<{ joke: Joke }>()
);