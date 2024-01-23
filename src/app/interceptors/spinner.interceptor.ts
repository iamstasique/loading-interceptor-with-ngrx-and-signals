import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { SpinnerService } from '../services/spinner/spinner.service';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(SpinnerService);
  spinnerService.start();

  return next(req).pipe(
    tap((data) => {
      if ((data as HttpResponse<any>).status) {
        spinnerService.stop();
      }
    })
  );
};
