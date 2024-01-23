import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { JokeComponent } from '../../components/joke/joke.component';
import { NavigationComponent } from '../../components/navigation/navigation.component';
import { SwitcherComponent } from '../../components/switcher/switcher.component';
import { SwitcherElements } from '../../enums/switcher-elements.enum';
import { JokeService } from '../../services/joke/joke.service';
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
    NavigationComponent,
    MatButtonModule,
    JokeComponent,
    SwitcherComponent,
    ObservablesComponent,
    FormsModule,
    ReactiveFormsModule,
    SignalsComponent,
    NgrxComponent,
  ],
})
export default class HomePageComponent implements OnInit {
  switcherItems: SwitcherElements[] = [
    SwitcherElements.Observables,
    SwitcherElements.Signals,
    SwitcherElements.NgRx,
  ];

  switcherControl: FormControl<SwitcherElements> =
    new FormControl<SwitcherElements>(this.switcherItems[0]);

  protected switcherElements = SwitcherElements;
  protected isLoading$: Observable<boolean>;

  constructor(
    private jokeService: JokeService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.spinnerService.isLoading$;
  }
}
