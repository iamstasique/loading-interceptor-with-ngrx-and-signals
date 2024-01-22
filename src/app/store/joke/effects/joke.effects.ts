import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, exhaustMap, map } from 'rxjs';
import { Joke } from '../../../models/joke.model';
import { JokeService } from '../../../services/joke/joke.service';
import { JokeActions } from '../actions/joke.actions';

@Injectable()
export class JokeEffects {
  private jokeService = inject(JokeService);

  getJokes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JokeActions.GetJokes),
      exhaustMap(() => this.jokeService.getJokeCategories()),
      map((categories: string[]) => ({
        type: JokeActions.GetJokesSuccess,
        categories,
      })),
      catchError(() => EMPTY)
    )
  );

  getJoke$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JokeActions.GetJoke),
      exhaustMap((action: any) =>
        this.jokeService.getJokeByCategory(action.category)
      ),
      map((joke: Joke) => ({
        type: JokeActions.GetJokeSuccess,
        joke,
      })),
      catchError(() => EMPTY)
    )
  );

  constructor(private readonly actions$: Actions) {}
}
