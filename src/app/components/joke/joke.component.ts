import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  booleanAttribute
} from '@angular/core';
import { Joke } from '../../models/joke.model';

@Component({
  selector: 'app-joke',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './joke.component.html',
  styleUrl: './joke.component.scss',
})
export class JokeComponent {
  @Input({ required: true }) joke!: Joke;
  @Input({ transform: booleanAttribute }) showCategory: boolean = false;
}
