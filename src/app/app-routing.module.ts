import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthorizedComponent } from './layouts/unauthorized/unauthorized.component';
import { AuthorizedComponent } from './layouts/authorized/authorized.component';
import { LoginpageComponent } from './modules/loginpage/loginpage.component';
import { RegisterpageComponent } from './modules/registerpage/registerpage.component';
import { ForgotPasswordComponent } from './modules/forgot-password/forgot-password.component';
import { WorkspacehomeComponent } from './modules/workspacehome/workspacehome.component';
import { WorkspacemembersComponent } from './modules/workspacemembers/workspacemembers.component';
import { BoardhomeComponent } from './modules/boardhome/boardhome.component';
import { BoardShowComponent } from './modules/board-show/board-show.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { loginaccessGuard } from './guards/loginaccess.guard';
import { secureloginpageGuard } from './guards/secureloginpage.guard';
import { WorkspaceComponent } from './layouts/workspace/workspace.component';
import { BoardComponent } from './layouts/board/board.component';

const routes: Routes = [
{path:'',redirectTo:'u',pathMatch:'full'},
  {path:'u'
  ,component:UnauthorizedComponent
  ,canActivate:[secureloginpageGuard]
  ,children:[
    {path:'',redirectTo:'loginpage',pathMatch:'full'},
    {path:'loginpage',component:LoginpageComponent},
    {path:'registerpage',component:RegisterpageComponent},
    {path:'forgotpasswordpage',component:ForgotPasswordComponent},

  ]},
  {path:'a'
  ,component:AuthorizedComponent
  ,canActivate:[loginaccessGuard]
  ,children:[
  {path:'',redirectTo:'workspacehome',pathMatch:'full'},
  {path:"workspacehome",component:WorkspacehomeComponent},
]},
{
  path:'w'
  ,component:WorkspaceComponent
  ,canActivate:[loginaccessGuard]
  ,children:[
    { path: '', redirectTo: 'boardhome', pathMatch: 'full' },
    { path: "boardhome/:w_id", component: BoardhomeComponent },
    { path: "members", component: WorkspacemembersComponent },
    { path: "settings", component: WorkspacemembersComponent },
  ]
},
  {
    path: 'b'
    , component: BoardComponent
    , canActivate: [loginaccessGuard]
    , children: [
      { path: "board/:id", component: BoardShowComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
