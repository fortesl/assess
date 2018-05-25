import { Route } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { NotAuthorizedComponent } from '../not-authorized/not-authorized.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { LoginComponent } from '../login/login.component';
import { AuthGuard } from './auth-guard';
import { AdminAuthGuard } from './admin-auth-guard';
import { AssessComponent } from '../assess/assess.component';
import { CreateUsersComponent } from '../create-users/create-users.component';
import { CreateAssessmentComponent } from '../create-assessment/create-assessment.component';
import { CreateQuestionsComponent } from '../create-questions/create-questions.component';
import { ViewQuestionsComponent } from '../view-questions/view-questions.component';
import { ViewResultsComponent } from '../view-results/view-results.component';
import { CreateAdminsComponent } from '../create-admins/create-admins.component';
import { SuperAdminAuthGuard } from './super-admin-auth-guard.service';

export const routes: Route[] = [
  { path: '',  component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'not-authorized', component: NotAuthorizedComponent},
  { path: 'assess', component: AssessComponent, canActivate: [AuthGuard] },
  { path: 'users/create', component: CreateUsersComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'questions/create', component: CreateQuestionsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'questions/view', component: ViewQuestionsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'results', component: ViewResultsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'admin/create', component: CreateAdminsComponent, canActivate: [AuthGuard, SuperAdminAuthGuard] },
  { path: 'assessment/create', component: CreateAssessmentComponent, canActivate: [AuthGuard, SuperAdminAuthGuard] },
  { path: '**', component: NotFoundComponent }
];
