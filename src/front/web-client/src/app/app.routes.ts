import { Routes } from '@angular/router';
import { ForgotPassword } from './pages/forgot-password/forgot-password';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { OnlineGuide } from './pages/online-guide/online-guide';
import { ResetPassword } from './pages/reset-password/reset-password';
import { PageTemplateComponent } from './shared/page-template/page-template.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
    title: 'login.title',
  },
  { path: 'reset-password', component: ResetPassword },
  {
    path: 'forgot-password',
    component: ForgotPassword,
    title: 'forgotPassword.title',
  },
  {
    path: '',
    component: PageTemplateComponent,
    children: [
      {
        path: 'home',
        component: Home,
        title: 'home.title',
      },
      {
        path: 'guide',
        component: OnlineGuide,
        title: 'navbar.onlineGuide',
      },
    ],
  },
];
