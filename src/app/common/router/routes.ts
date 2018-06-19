import { Route } from '@angular/router';
import { HomeComponent } from '../../home/home.component';
import { NotAuthorizedComponent } from '../../not-authorized/not-authorized.component';
import { NotFoundComponent } from '../../not-found/not-found.component';
import { LoginComponent } from '../../users/login/login.component';
import { AuthGuard } from './auth-guard';
import { AdminAuthGuard } from './admin-auth-guard';
import { CreateUsersComponent } from '../../users/create-users/create-users.component';
import { CreateAssessmentComponent } from '../../assessment/create-assessment/create-assessment.component';
import { CreateQuestionsComponent } from '../../questions/create-questions/create-questions.component';
import { ViewResultsComponent } from '../../view-results/view-results.component';
import { SuperAdminAuthGuard } from './super-admin-auth-guard';
import { AssessmentComponent } from '../../assessment/assessment.component';
import { ListQuestionsComponent } from '../../questions/list-questions/list-questions.component';
import { ResetPasswordComponent } from '@app/users/reset-password/reset-password.component';

export const routes: Route[] = [
  { path: '',  component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'not-authorized', component: NotAuthorizedComponent},
  { path: 'admin/assessment/create/:page', component: CreateAssessmentComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'admin/assessment/:assessment', component: AssessmentComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'admin/questions/:assessment/create/:page', component: CreateQuestionsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'admin/questions/:assessment', component: ListQuestionsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'admin/results/:assessment', component: ViewResultsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'admin/users/:assessment/create', component: CreateUsersComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: '**', component: NotFoundComponent }
];
