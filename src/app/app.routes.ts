import { Routes } from '@angular/router';
import { HomeMember } from './ui/dashboard/member/home-member/home-member';
import { FormMember } from './ui/dashboard/member/formMember/form-member';
import { SignIn } from './ui/signInAndSignUp/sign-in/sign-in';
import { SignUp } from './ui/signInAndSignUp/sign-up/sign-up';
import { DashboardMain } from './ui/dashboard/dashboard-main/dashboard-main';
import { FormCongregation } from './ui/dashboard/congregation/form-congregation/form-congregation';
import { HomeCongregation } from './ui/dashboard/congregation/home-congregation/home-congregation';
import { HomeDashboard } from './ui/dashboard/home-dashboard/home-dashboard';
import { Main } from './ui/signInAndSignUp/main/main';
import { HomeUser } from './ui/dashboard/user/home-user/home-user';
import { FormUser } from './ui/dashboard/user/form-user/form-user';

export const routes: Routes = [
  {
    path: 'auth',
    component: Main,
    children: [
      { path: 'signin', component: SignIn },
      { path: 'signup', component: SignUp },
    ],
  },

  {
    path: '',
    component: DashboardMain,
    children: [
      { path: '', component: HomeDashboard },

      { path: 'member', component: HomeMember },
      { path: 'member/create', component: FormMember },
      { path: 'member/update/:id', component: FormMember },

      { path: 'congregation', component: HomeCongregation },
      { path: 'congregation/create', component: FormCongregation },
      { path: 'congregation/update/:id', component: FormCongregation },

      { path: 'user', component: HomeUser },
      { path: 'user/create', component: FormUser },
      { path: 'user/update/:id', component: FormUser },
    ],
  },
];
