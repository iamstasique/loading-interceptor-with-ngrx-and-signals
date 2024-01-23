import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Joke } from '../../models/joke.model';
import { NavigationComponent } from '../navigation/navigation.component';
import { JokeComponent } from '../joke/joke.component';

@Component({
  selector: 'app-content',
  standalone: true,
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
  imports: [NavigationComponent, JokeComponent],
})
export class ContentComponent {
  @Input({ required: true }) categories: string[];
  @Input({ required: true }) currentJoke: Joke;
  @Output() onSelect: EventEmitter<string> = new EventEmitter<string>();

  onSelectCategory(category: string) {
    this.onSelect.emit(category);
  }
}
