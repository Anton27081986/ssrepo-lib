import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes), BrowserModule,
    CommonModule, provideAnimationsAsync(), BrowserAnimationsModule, importProvidersFrom([
      BrowserAnimationsModule, HttpClientModule
    ])]
};
