import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { Joke } from '../models/joke.model';

@Injectable({
  providedIn: 'root'
})
export class JokeRepository {

  constructor(private apiService: ApiService) { }

  
  getJokeCategories(): Observable<string[]>{
    return this.apiService.getAll<string>('https://api.chucknorris.io/jokes/categories');
  }

  getJokeByCategory(category: string): Observable<Joke> {
    return this.apiService.getOne<Joke>(`https://api.chucknorris.io/jokes/random?category=${category}`)
  }

}
