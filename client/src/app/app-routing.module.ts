import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { CanActivateIfGuest } from "./shared/guards/CanActivateIfGuest";
import { CanActivateIfUser } from "./shared/guards/CanActivateIfUser";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/login" },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [CanActivateIfGuest]
  },
  {
    path: "chat",
    component: HomeComponent,
    canActivate: [CanActivateIfUser]
  },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [CanActivateIfGuest]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static components = [LoginComponent, RegisterComponent];
}
