import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard, redirectIfAuthenticatedGuard } from './guards/auth.guard';
import { CreateComponent } from './create/create.component';
import { AllComponent } from './all/all.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component:HomeComponent },
    { path: 'login', component:LoginComponent ,canActivate: [redirectIfAuthenticatedGuard] },
    { path: 'register', component:RegisterComponent,canActivate: [redirectIfAuthenticatedGuard] },
    { path: 'create', component:CreateComponent,canActivate: [authGuard] },
    {path: 'all', component:AllComponent},
    {path: '404', component:NotFoundComponent},
    { path: '**', redirectTo: '404', pathMatch: 'full' }
];
