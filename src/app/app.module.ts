import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StartPage } from '../pages/start/start';
import { GamePage } from '../pages/game/game';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {GolfCourseService} from "../services/golf-course.service";
import {HttpClientModule} from "@angular/common/http";

//import {AngularFireDatabase} from 'angularfire2/database';
import {FirebaseApp} from "angularfire2";

@NgModule({
  declarations: [
    MyApp,
    GamePage,
    StartPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StartPage,
    GamePage,
  ],
  providers: [
    StatusBar,
    GolfCourseService,
 //   AngularFireDatabase,
    FirebaseApp,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
