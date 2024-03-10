import {
  Component,
  Signal,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, switchMap } from 'rxjs';
import { ContentComponent } from '../../components/content/content.component';
import { JokeComponent } from '../../components/joke/joke.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { Joke } from '../../models/joke.model';
import { JokeService } from '../../services/joke/joke.service';

@Component({
  selector: 'app-signals',
  standalone: true,
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.scss',
  imports: [NavigationComponent, JokeComponent, ContentComponent],
})
export class SignalsComponent {
  private jokeService: JokeService = inject(JokeService);

  jokeCategories: Signal<string[]> = toSignal(
    this.jokeService.getJokeCategories()
  );

  /**
   * here we CAN send a new request with the same category and receive a new joke ONLY IF we use { equal: (a, b) => false }
   */
  selectedCategory: WritableSignal<string> = signal(
    this.jokeCategories() ? this.jokeCategories()![0] : '',
    { equal: (a, b) => false }
  );

  currentJoke: Signal<Joke> = toSignal(
    toObservable(this.selectedCategory).pipe(
      filter((category) => !!category),
      switchMap((category) => this.jokeService.getJokeByCategory(category))
    )
  );

  onSelectCategory(category: string): void {
    this.selectedCategory.set(category);
  }
}
