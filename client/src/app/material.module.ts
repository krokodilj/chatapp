import { NgModule } from "@angular/core";

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule,
  MatListModule,
  MatSidenavModule,
  MatDividerModule,
  MatSlideToggleModule
} from "@angular/material";

import {
  BrowserAnimationsModule,
  NoopAnimationsModule
} from "@angular/platform-browser/animations";

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
    MatListModule,
    MatSidenavModule,
    MatDividerModule,
    MatSlideToggleModule
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
    MatListModule,
    MatSidenavModule,
    MatDividerModule,
    MatSlideToggleModule
  ]
})
export class MaterialModule {}
