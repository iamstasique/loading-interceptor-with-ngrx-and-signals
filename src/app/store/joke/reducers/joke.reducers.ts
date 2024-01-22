import { createReducer, on } from '@ngrx/store';
import { Joke } from '../../../models/joke.model';
import { getInitialJokeState } from '../../app.state';
import {
    GET_JOKE_CATEGORIES_SUCCESS,
    GET_JOKE_SUCCESS,
    JokeActions,
} from '../actions/joke.actions';
import { JokeState } from '../state/joke.state';

export const jokeReducer = createReducer(
  getInitialJokeState(),

  on(
    GET_JOKE_CATEGORIES_SUCCESS,
    (
      state: JokeState,
      action: { type: JokeActions; categories: string[] }
    ) => ({
      ...state,
      jokeList: action.categories,
    })
  ),

  on(
    GET_JOKE_SUCCESS,
    (state: JokeState, action: { type: JokeActions; joke: Joke }) => ({
      ...state,
      currentJoke: { ...action.joke },
    })
  )
);
