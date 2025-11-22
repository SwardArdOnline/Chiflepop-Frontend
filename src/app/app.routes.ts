import { Routes } from "@angular/router";
import { LandingComponent } from "./landing/landing.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { Dashboard } from "./dashboard/dashboard";
import { Products } from "./dashboard/products/products";
import { Accounts } from "./dashboard/accounts/accounts";
import { Checkout } from "./dashboard/checkout/checkout";

export const routes: Routes = [
  { path: "", component: LandingComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "dashboard",
    component: Dashboard,
    children: [
      { path: "products", component: Products },
      { path: "bank-accounts", component: Accounts },
      { path: "checkout", component: Checkout },
      { path: "", redirectTo: "productos", pathMatch: "full" },
    ],
  },
  { path: "**", redirectTo: "" },
];
