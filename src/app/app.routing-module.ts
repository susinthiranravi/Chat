import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ChatComponent } from './views/chat/chat.component';
import { LoginComponent } from './views/login/login.component';


const routes : Routes = [
    {
        path : '',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'chat/:name',
        component:ChatComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }