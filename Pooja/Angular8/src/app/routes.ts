import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LandingPageComponent } from './user/landing-page/landing-page.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
    {
        
        path: '', component:LandingPageComponent,
        //children: [{ path: '', component: SignUpComponent }]
    },
  
    {
        path: 'signup', component: SignUpComponent,
        //children: [{ path: '', component: SignUpComponent }]
    },

    {
        path: 'login', component: SignInComponent,
      //  children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'userProfile', component:UserProfileComponent,canActivate:[AuthGuard]
    },
      {
        path: 'xD', redirectTo: '' , pathMatch: 'full'
    }
];