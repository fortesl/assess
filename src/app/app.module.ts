import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './users/login/login.component';
import { RouterModule } from '@angular/router';
import { routes } from './common/router/routes';
import { NavigationBarComponent } from './common/navigation-bar/navigation-bar.component';
import { CreateUsersComponent } from './users/create-users/create-users.component';
import { CreateAssessmentComponent } from './assessment/create-assessment/create-assessment.component';
import { CreateQuestionsComponent } from './questions/create-questions/create-questions.component';
import { ViewResultsComponent } from './view-results/view-results.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AuthService } from './common/services/auth.service';
import { AuthGuard } from './common/router/auth-guard';
import { UserService } from './common/services/user.service';
import { AdminAuthGuard } from './common/router/admin-auth-guard';
import { SuperAdminAuthGuard } from './common/router/super-admin-auth-guard';
import { AppErrorHandler } from './common/error-handling/app-error-handler';
import { ShopMaterialModule } from './common/shop-material/shop-material.module';
import { CurrentRouteService } from './common/current-route.service';
import { AssessmentService } from './common/services/assessment.service';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { QuestionService } from './common/services/question.service';
import { AssessmentComponent } from './assessment/assessment.component';
import { ListQuestionsComponent } from './questions/list-questions/list-questions.component';
import { DialogComponent } from './common/dialog/dialog/dialog.component';
import { DatabaseService } from './common/database.service';
import { ResetPasswordComponent } from './users/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotAuthorizedComponent,
    NotFoundComponent,
    LoginComponent,
    NavigationBarComponent,
    CreateUsersComponent,
    CreateAssessmentComponent,
    CreateQuestionsComponent,
    ViewResultsComponent,
    ListUsersComponent,
    AssessmentComponent,
    ListQuestionsComponent,
    DialogComponent,
    ResetPasswordComponent
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
    RouterModule.forRoot(routes)
],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler},
    AuthService,
    AuthGuard,
    UserService,
    AdminAuthGuard,
    CurrentRouteService,
    SuperAdminAuthGuard,
    AssessmentService,
    QuestionService,
    DatabaseService
  ],
  entryComponents: [
    DialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
