import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { metaReducers, reducers } from './store/app.state';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './store/effects/app.effects';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { createTranslateLoader } from './shared/utils/utils';
import { SharedModule } from './shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
    declarations: [AppComponent, ErrorPageComponent, LoginComponent],
    imports: [
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        SharedModule,
        FormsModule,
        MatIconModule,
        ReactiveFormsModule,
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        }),
        StoreModule.forRoot(reducers, { metaReducers }),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        EffectsModule.forRoot([AppEffects]),
        BrowserAnimationsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
            useDefaultLang: false,
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
