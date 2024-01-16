import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
  WritableSignal,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject, Observable, filter, switchMap, tap } from 'rxjs';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { Joke } from '../../models/joke.model';
import { JokeService } from '../../services/joke/joke.service';
import { SpinnerService } from '../../services/spinner/spinner.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    NavigationComponent,
    MatButtonModule,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePageComponent implements OnInit {
  /**
   * @description
   * OBSERVABLES
   * here we CAN send a new request with the same category and receive a new joke
   * here we CAN show the first joke by default
   */

  jokeCategories$!: Observable<string[]>;
  currentJoke$!: Observable<Joke>;
  private selectCategorySubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  /**
   * @description
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
}
