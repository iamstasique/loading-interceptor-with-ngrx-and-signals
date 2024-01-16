import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  isLoading$: Observable<boolean>

  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.isLoading$ = this.loadingSubject.asObservable();
   }

  start(): void {
    this.loadingSubject.next(true)
  }
  
  stop(): void {
    this.loadingSubject.next(false);
  }
}
