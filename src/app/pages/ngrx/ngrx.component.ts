import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, filter, first, tap } from 'rxjs';
import { ContentComponent } from '../../components/content/content.component';
import { JokeComponent } from '../../components/joke/joke.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { Joke } from '../../models/joke.model';
import {
  GET_JOKE,
  GET_JOKE_CATEGORIES,
} from '../../store/joke/actions/joke.actions';
import {
  SELECT_CURRENT_JOKE,
  SELECT_JOKES,
} from '../../store/joke/selectors/joke.selectors';

@Component({
  selector: 'app-ngrx',
  standalone: true,
  templateUrl: './ngrx.component.html',
  styleUrl: './ngrx.component.scss',
  imports: [CommonModule, NavigationComponent, JokeComponent, ContentComponent],
})
export class NgrxComponent implements OnInit {
  private readonly store = inject(Store);
  jokeCategoriesFromNgRxStore$: Observable<string[]> =
    this.store.select(SELECT_JOKES);
  currentJokeFromNgRxStore$: Observable<Joke> =
    this.store.select(SELECT_CURRENT_JOKE);

  ngOnInit(): void {
    this.initNgRxStore();
  }

  onSelectCategory(category: string) {
    this.store.dispatch(GET_JOKE({ category }));
  }

  private initNgRxStore(): void {
    this.store.dispatch(GET_JOKE_CATEGORIES());

    this.jokeCategoriesFromNgRxStore$
      .pipe(
        filter((categories: string[]) => !!categories.length),
        first(),
        tap((categories: string[]) =>
          this.store.dispatch(GET_JOKE({ category: categories[0] }))
        )
      )
      .subscribe();
  }
}
