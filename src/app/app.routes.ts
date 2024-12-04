import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard, redirectIfAuthenticatedGuard } from './guards/auth.guard';
import { CreateComponent } from './create/create.component';
import { AllComponent } from './all/all.component';
import { PostComponent } from './post/post.component';
import { EditComponent } from './edit/edit.component';
import { UserCommentsComponent } from './user-comments/user-comments.component';
import { EditCommentComponent } from './edit-comment/edit-comment.component';
import { AboutComponent } from './about/about.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

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
