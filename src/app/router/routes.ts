import { Route } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { NotAuthorizedComponent } from '../not-authorized/not-authorized.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { LoginComponent } from '../login/login.component';
import { AuthGuard } from './auth-guard';
import { AdminAuthGuard } from './admin-auth-guard';
import { CreateUsersComponent } from '../create-users/create-users.component';
import { CreateAssessmentComponent } from '../create-assessment/create-assessment.component';
import { CreateQuestionsComponent } from '../create-questions/create-questions.component';
import { ViewQuestionsComponent } from '../view-questions/view-questions.component';
import { ViewResultsComponent } from '../view-results/view-results.component';
import { SuperAdminAuthGuard } from './super-admin-auth-guard';
import { EditAssessmentComponent } from '../edit-assessment/edit-assessment.component';
import { AssessmentComponent } from '../assessment/assessment.component';

export const routes: Route[] = [
  { path: '',  component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'not-authorized', component: NotAuthorizedComponent},
  { path: 'admin/assessment/:page', component: EditAssessmentComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'admin/assessment', component: AssessmentComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'admin/questions/create/:page', component: CreateQuestionsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'questions/view', component: ViewQuestionsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'admin/results', component: ViewResultsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'admin/users/create', component: CreateUsersComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'superadmin/assessment/create', component: CreateAssessmentComponent, canActivate: [AuthGuard, SuperAdminAuthGuard] },
  { path: '**', component: NotFoundComponent }
];
