import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  Observable,
  filter,
  first,
  switchMap,
  tap,
} from 'rxjs';
import { JokeComponent } from '../../components/joke/joke.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { Joke } from '../../models/joke.model';
import { JokeService } from '../../services/joke/joke.service';
import { SpinnerService } from '../../services/spinner/spinner.service';
import {
  GET_JOKE,
  GET_JOKE_CATEGORIES,
} from '../../store/joke/actions/joke.actions';
import {
  SELECT_CURRENT_JOKE,
  SELECT_JOKES,
} from '../../store/joke/selectors/joke.selectors';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    NavigationComponent,
    MatButtonModule,
    JokeComponent,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePageComponent implements OnInit {
  private store = inject(Store);

  jokeCategoriesFromNgRxStore$ = this.store.select(SELECT_JOKES);
  currentJokeFromNgRxStore$ = this.store.select(SELECT_CURRENT_JOKE);

  /**
   * OBSERVABLES
   */

  jokeCategories$!: Observable<string[]>;
  currentJoke$!: Observable<Joke>;
  private selectCategorySubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  /**
   * SIGNALS
   * here we CAN'T show the first joke by default
   */

  jokeCategories: Signal<string[] | undefined> = toSignal(
    this.jokeService.getJokeCategories()
  );

  /**
   * here we CAN send a new request with the same category and receive a new joke ONLY IF we use { equal: (a, b) => false }
   */
  selectedCategory: WritableSignal<string> = signal(
    this.jokeCategories() ? this.jokeCategories()![0] : '',
    { equal: (a, b) => false }
  );
  currentJoke: Signal<Joke | undefined> = toSignal(
    toObservable(this.selectedCategory).pipe(
      filter((category) => !!category),
      switchMap((category) => this.getJoke(category))
    )
  );

  isLoading$!: Observable<boolean>;
  isSignals: boolean = false;

  constructor(
    private jokeService: JokeService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.initNgRxStore();

    this.jokeCategories$ = this.jokeService
      .getJokeCategories()
      .pipe(
        tap((categories: string[]) =>
          this.selectCategorySubject.next(categories[0])
        )
      );

    this.currentJoke$ = this.selectCategorySubject.pipe(
      filter((joke) => !!joke),
      switchMap((category: string) => this.getJoke(category))
    );

    this.isLoading$ = this.spinnerService.isLoading$;
  }

  onSelectCategory(category: string): void {
    this.isSignals
      ? this.selectedCategory.set(category)
      : this.selectCategorySubject.next(category);
  }

  private getJoke(category: string): Observable<Joke> {
    return this.jokeService.getJokeByCategory(category);
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
