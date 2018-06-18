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
import { ViewResultsComponent } from '../view-results/view-results.component';
import { SuperAdminAuthGuard } from './super-admin-auth-guard';
import { EditAssessmentComponent } from '../edit-assessment/edit-assessment.component';
import { AssessmentComponent } from '../assessment/assessment.component';
import { ListQuestionsComponent } from '../list-questions/list-questions.component';

export const routes: Route[] = [
  { path: '',  component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'not-authorized', component: NotAuthorizedComponent},
  { path: 'admin/assessment/create/:page', component: CreateAssessmentComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'admin/assessment/:assessment', component: AssessmentComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'admin/questions/create/:page', component: CreateQuestionsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'admin/questions/:assessment', component: ListQuestionsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'admin/results/:assessment', component: ViewResultsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'admin/users/create', component: CreateUsersComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: '**', component: NotFoundComponent }
];
