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
  MatSlideToggleModule,
  MatCheckboxModule
} from "@angular/material";

import {
  BrowserAnimationsModule,
  NoopAnimationsModule
} from "@angular/platform-browser/animations";

import { FlexLayoutModule } from "@angular/flex-layout";

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
    MatSlideToggleModule,
    FlexLayoutModule,
    MatCheckboxModule
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
    MatSlideToggleModule,
    FlexLayoutModule,
    MatCheckboxModule
  ]
})
export class MaterialModule {}
