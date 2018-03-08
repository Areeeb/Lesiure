import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CoverComponent } from './cover/cover.component';
import { SocialComponent } from './social/social.component';
import { GameComponent } from './game/game.component';
import { NewsComponent } from './news/news.component';
import { FormsModule } from '@angular/forms';
import { UtilService } from './util.service';
import { ProfileComponent } from './profile/profile.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { BlankComponent } from './blank/blank.component';
import { AdminPageAccountsComponent } from './admin-page-accounts/admin-page-accounts.component';
import { AdminPageNewsComponent } from './admin-page-news/admin-page-news.component';
import { AdminPageSocialComponent } from './admin-page-social/admin-page-social.component';
import { AdminPageGameComponent } from './admin-page-game/admin-page-game.component';

const AppRoutes = RouterModule.forRoot([
  {
    path: '',
    component: CoverComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'social'
      },
      {
        path: 'social',
        component: SocialComponent
      },
      {
        path: 'game',
        component: GameComponent
      },
      {
        path: 'news',
        component: NewsComponent
      }
    ]
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'admin',
    component: AdminHomeComponent,
  },
  {
    path: 'admin/home',
    component: AdminPageComponent,
    children: [
      {
        path: 'social',
        component: AdminPageSocialComponent
      },
      {
        path: 'news',
        component: AdminPageNewsComponent
      },
      {
        path: 'accounts',
        component: AdminPageAccountsComponent
      },
      {
        path: 'game',
        component: AdminPageGameComponent
      },
      {
        path: '',
        redirectTo: 'social',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'blank',
    component: BlankComponent
  }
]);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CoverComponent,
    SocialComponent,
    GameComponent,
    NewsComponent,
    ProfileComponent,
    AdminHomeComponent,
    AdminPageComponent,
    BlankComponent,
    AdminPageAccountsComponent,
    AdminPageNewsComponent,
    AdminPageSocialComponent,
    AdminPageGameComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutes,
    FormsModule
  ],
  providers: [UtilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
