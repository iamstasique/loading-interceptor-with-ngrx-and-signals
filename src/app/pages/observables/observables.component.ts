import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { BehaviorSubject, Observable, exhaustMap, filter, tap } from 'rxjs';
import { ContentComponent } from '../../components/content/content.component';
import { JokeComponent } from '../../components/joke/joke.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { Joke } from '../../models/joke.model';
import { JokeService } from '../../services/joke/joke.service';

@Component({
  selector: 'app-observables',
  standalone: true,
  templateUrl: './observables.component.html',
  styleUrl: './observables.component.scss',
  imports: [CommonModule, NavigationComponent, JokeComponent, ContentComponent],
})
export class ObservablesComponent implements OnInit {
  jokeCategories$: Observable<string[]>;
  currentJoke$: Observable<Joke>;

  private selectCategorySubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  private jokeService: JokeService = inject(JokeService);

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
      exhaustMap((category: string) =>
        this.jokeService.getJokeByCategory(category)
      )
    );
  }

  onSelectCategory(category: string): void {
    this.selectCategorySubject.next(category);
  }
}
