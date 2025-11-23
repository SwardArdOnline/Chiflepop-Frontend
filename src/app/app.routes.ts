import { Routes } from "@angular/router";
import { LandingComponent } from "./landing/landing.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { Dashboard } from "./dashboard/dashboard";
import { Products } from "./dashboard/products/products";
import { Accounts } from "./dashboard/accounts/accounts";
import { Checkout } from "./dashboard/checkout/checkout";
import { Home } from "./dashboard/home/home";
import { Orders } from "./dashboard/orders/orders";
import { AdminProducts } from "./admin/admin-products/admin-products";
import { Admin } from "./admin/admin";
import { AdminEmployees } from "./admin/admin-employees/admin-employees";
import { AdminCustomers } from "./admin/admin-customers/admin-customers";

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
      { path: "orders", component: Orders },
    ],
  },
  {
    path: "admin",
    component: Admin,
    children: [
      { path: "products", component: AdminProducts },
      { path: "employees", component: AdminEmployees },
      { path: "customers", component: AdminCustomers },
      { path: "", redirectTo: "products", pathMatch: "full" }
    ]
  },
  { path: "**", redirectTo: "" },
];
