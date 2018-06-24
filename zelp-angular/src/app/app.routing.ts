import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ProfileComponent } from "./profile/profile.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { NewPostComponent } from "./new-post/new-post.component";
import { PostComponent } from "./post/post.component";
import { SearchComponent } from "./search/search.component";
import {RestaurantComponent} from './restaurant/restaurant.component';
import {SearchResultComponent} from './search-result/search-result.component';
import {AdminViewComponent} from './admin-view/admin-view.component';

const appRoutes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomePageComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "profile", component: ProfileComponent },
  { path: "admin-view", component: AdminViewComponent },
  { path: "new-post", component: NewPostComponent },
  { path: "post/:postId", component: PostComponent },
  { path: "post/:postId/new-response", component: PostComponent },
  { path: "search", component: SearchComponent },
  { path: "restaurant", component: RestaurantComponent},
  { path: "searchresult", component: SearchResultComponent},
  { path: "**", component: HomePageComponent }
];

export const routing = RouterModule.forRoot(appRoutes);
