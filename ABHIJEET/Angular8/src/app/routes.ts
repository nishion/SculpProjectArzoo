import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LandingPageComponent } from './user/landing-page/landing-page.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { AuthGuard } from './auth/auth.guard';
import { MyPlanComponent } from './user/my-plan/my-plan.component';
import { GoalListComponent } from './goal-list/goal-list.component';
import { GoalWLComponent } from './goal-wl/goal-wl.component';
import { GoalNComponent } from './goal-n/goal-n.component';
import { GoalSTComponent } from './goal-st/goal-st.component';

export const appRoutes: Routes = [
    {

        path: '', component: LandingPageComponent,
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
        path: 'userProfile', component: UserProfileComponent, canActivate: [AuthGuard]
    },
    {
        path: 'myPlan', component: MyPlanComponent,
    },
    {
        path: 'xD', redirectTo: '', pathMatch: 'full'
    },
    {
        path: 'goalList', component: GoalListComponent, canActivate: [AuthGuard]
    },
    {
        path: 'goalWL', component: GoalWLComponent,
    },
    {
        path: 'goalN', component: GoalNComponent,
    },
    {
        path: 'goalSt', component: GoalSTComponent,
    }
];