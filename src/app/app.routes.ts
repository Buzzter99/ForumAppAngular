import { Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { LoginComponent } from './shared/components/user/login/login.component';
import { RegisterComponent } from './shared/components/user/register/register.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { authGuard, redirectIfAuthenticatedGuard } from './core/guards/auth.guard';
import { CreateComponent } from './shared/components/post/create/create.component';
import { AllComponent } from './shared/components/post/all/all.component';
import { PostComponent } from './shared/components/post/post/post.component';
import { EditComponent } from './shared/components/post/edit/edit.component';
import { UserCommentsComponent } from './shared/components/user/user-comments/user-comments.component';
import { EditCommentComponent } from './shared/components/user/edit-comment/edit-comment.component';
import { AboutComponent } from './shared/components/about/about.component';
import { UpdateProfileComponent } from './shared/components/user/update-profile/update-profile.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component:HomeComponent },
    { path: 'login', component:LoginComponent ,canActivate: [redirectIfAuthenticatedGuard] },
    { path: 'register', component:RegisterComponent,canActivate: [redirectIfAuthenticatedGuard] },
    { path: 'create', component:CreateComponent,canActivate: [authGuard] },
    {path: 'all', component:AllComponent},
    { path: 'all/:id', component:PostComponent },
    {path: 'edit/:id', component:EditComponent,canActivate: [authGuard] },
    {path: 'comments', component:UserCommentsComponent,canActivate: [authGuard] },
    {path: 'comments/edit/:id', component:EditCommentComponent,canActivate: [authGuard] },
    {path: 'about', component:AboutComponent},
    {path: 'updateAccount', component:UpdateProfileComponent,canActivate: [authGuard] },
    {path: '404', component:NotFoundComponent},
    { path: '**', redirectTo: '404', pathMatch: 'full' }
];
