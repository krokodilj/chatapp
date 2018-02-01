import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatListModule
} from '@angular/material';

import {
  BrowserAnimationsModule,
  NoopAnimationsModule
} from '@angular/platform-browser/animations'

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatListModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatListModule
  ]
})
export class MaterialModule {}