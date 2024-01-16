import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Joke } from '../../models/joke.model';
import { JokeRepository } from '../../repositories/joke.repository';

@Injectable({
  providedIn: 'root',
})
export class JokeService {
  constructor(private jokeRepository: JokeRepository) {}

  getJokeCategories(): Observable<string[]> {
    return this.jokeRepository.getJokeCategories();
  }

  getJokeByCategory(category: string): Observable<Joke> {
    return this.jokeRepository.getJokeByCategory(category);
  }
}
