import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-controls',
  standalone: true,
  imports: [
    MatFormField,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule

  ],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlsComponent implements OnInit, OnDestroy {
  private sub!: Subscription;
  searchControl = new FormControl("");
  
  search = output<string>();
  openDialog = output<void>();

  ngOnInit(): void {
    this.sub = this.searchControl.valueChanges.subscribe({
      next: (v) => {
        if (typeof v === 'string') this.search.emit(v); 
      }
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
