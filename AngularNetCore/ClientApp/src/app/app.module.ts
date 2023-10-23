import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { BooksComponent } from './components/books/books.component';
import { DeleteBookComponent } from './components/delete-book/delete-book.component';
import { NewBookComponent } from './components/new-book/new-book.component';
import { ShowBookComponent } from './components/show-book/show-book.component';
import { UpdateBookComponent } from './components/update-book/update-book.component';
import { BookService } from './services/book.service';
import { StoreModule } from '@ngrx/store';
import { BookReducer } from './store/book.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BookEffects } from './store/book.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from '../environments/environment'; // Angular CLI environment

// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';
import { AuthGuard } from './services/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    BooksComponent,
    DeleteBookComponent,
    NewBookComponent,
    ShowBookComponent,
    UpdateBookComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: 'dev-ntxsdkue1cw3sq38.us.auth0.com',
      clientId: 'Ti2Uq1ro9yG2ekqCXBhGLCXBQvHiXsbn',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'books', component: BooksComponent, canActivate: [AuthGuard] },
      { path: 'new-book', component: NewBookComponent, canActivate: [AuthGuard] },
      { path: 'update-book/:id', component: UpdateBookComponent, canActivate: [AuthGuard] },
      { path: 'delete-book/:id', component: DeleteBookComponent, canActivate: [AuthGuard] },
      { path: 'show-book/:id', component: ShowBookComponent, canActivate: [AuthGuard] },
    ]),
    StoreModule.forRoot({booksState: BookReducer}),
    EffectsModule.forRoot([BookEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    })
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
