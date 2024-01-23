import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { spinnerInterceptor } from './interceptors/spinner.interceptor';
import { JokeEffects } from './store/joke/effects/joke.effects';
import { jokeReducer } from './store/joke/reducers/joke.reducers';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([spinnerInterceptor])),
    provideStore(),
    provideState({ name: 'jokeState', reducer: jokeReducer }),
    provideEffects(JokeEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
],
};
