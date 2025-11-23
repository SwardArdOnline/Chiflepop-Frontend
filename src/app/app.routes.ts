import { Routes } from "@angular/router";
import { LandingComponent } from "./landing/landing.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { Dashboard } from "./dashboard/dashboard";
import { Products } from "./dashboard/products/products";
import { Accounts } from "./dashboard/accounts/accounts";
import { Checkout } from "./dashboard/checkout/checkout";
import { Home } from "./dashboard/home/home";

export const routes: Routes = [
  { path: "", component: LandingComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "dashboard",
    component: Dashboard,
    children: [
      { path: "home", component: Home },
      { path: "products", component: Products },
      { path: "bank-accounts", component: Accounts },
      { path: "checkout", component: Checkout },
      { path: "", redirectTo: "home", pathMatch: "full" },
    ],
  },
  { path: "**", redirectTo: "" },
];
