import { CommonModule } from '@angular/common';
import {
    Component,
    DestroyRef,
    Input,
    OnInit,
    forwardRef,
    inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    ControlValueAccessor,
    FormControl,
    FormsModule,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { tap } from 'rxjs';
import { SwitcherElements } from '../../enums/switcher-elements.enum';

@Component({
  selector: 'app-switcher',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './switcher.component.html',
  styleUrl: './switcher.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitcherComponent),
      multi: true,
    },
  ],
})
export class SwitcherComponent implements ControlValueAccessor, OnInit {
  @Input({ required: true }) items: SwitcherElements[] = [];

  control: FormControl<SwitcherElements> = new FormControl<SwitcherElements>(
    SwitcherElements.NgRx
  );

  onChange: any = () => {};
  onTouched: any = () => {};

  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((data) => this.writeValue(data))
      )
      .subscribe();
  }

  writeValue(value: SwitcherElements): void {
    // if this.control.value !== value => set value to the control, otherwise skip
    this.control.value === value || this.control.setValue(value);
    this.onChange(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
