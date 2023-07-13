import { NgModule } from '@angular/core'
import { RouterModule, Routes} from '@angular/router'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'

const appRoutes:Routes=[
{path:'', component: HomeComponent, pathMatch:'full'},
{path:'login', component: LoginComponent},
{path:'update/:id', component: LoginComponent}
]

@NgModule({
    imports:[RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})

export class AppRoutingModule{}