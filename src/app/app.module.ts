import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { routes } from './router/routes';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { AssessComponent } from './assess/assess.component';
import { CreateUsersComponent } from './create-users/create-users.component';
import { CreateAssessmentComponent } from './create-assessment/create-assessment.component';
import { CreateQuestionsComponent } from './create-questions/create-questions.component';
import { ViewQuestionsComponent } from './view-questions/view-questions.component';
import { ViewResultsComponent } from './view-results/view-results.component';
import { CreateAdminsComponent } from './create-admins/create-admins.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AuthService } from './common/services/auth.service';
import { AuthGuard } from './router/auth-guard';
import { UserService } from './common/services/user.service';
import { AdminAuthGuard } from './router/admin-auth-guard';
import { SuperAdminAuthGuard } from './router/super-admin-auth-guard';
import { AppErrorHandler } from './common/error-handling/app-error-handler';
import { ShopMaterialModule } from './common/shop-material/shop-material.module';
import { CurrentRouteService } from './common/current-route.service';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotAuthorizedComponent,
    NotFoundComponent,
    LoginComponent,
    NavigationBarComponent,
    AssessComponent,
    CreateUsersComponent,
    CreateAssessmentComponent,
    CreateQuestionsComponent,
    ViewQuestionsComponent,
    ViewResultsComponent,
    CreateAdminsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ShopMaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatRadioModule,
    RouterModule.forRoot(routes)
],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler},
    AuthService,
    AuthGuard,
    UserService,
    AdminAuthGuard,
    CurrentRouteService,
    SuperAdminAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
