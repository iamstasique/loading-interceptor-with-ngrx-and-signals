import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { SwitcherComponent } from '../../components/switcher/switcher.component';
import { SwitcherElements } from '../../enums/switcher-elements.enum';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { NgrxComponent } from '../ngrx/ngrx.component';
import { ObservablesComponent } from '../observables/observables.component';
import { SignalsComponent } from '../signals/signals.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    SwitcherComponent,
    ObservablesComponent,
    ReactiveFormsModule,
    SignalsComponent,
    NgrxComponent,
  ],
})
export default class HomePageComponent {
  switcherItems: SwitcherElements[] = [
    SwitcherElements.Observables,
    SwitcherElements.Signals,
    SwitcherElements.NgRx,
  ];

  switcherControl: FormControl<SwitcherElements> =
    new FormControl<SwitcherElements>(this.switcherItems[0]);

  protected spinnerService = inject(SpinnerService);
  protected switcherElements = SwitcherElements;
  protected isLoading$: Observable<boolean> = this.spinnerService.isLoading$;
}
