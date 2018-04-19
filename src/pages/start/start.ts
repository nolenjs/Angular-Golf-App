import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {IGolfCourse} from "../../interfaces/IGolfCourse";
import {GolfCourseService} from "../../services/golf-course.service";
import {AngularFireDatabase} from 'angularfire2/database';
import {GamePage} from "../game/game";
import 'firebase/auth';
import {PlayerNamePipe} from "../../services/player-name.pipe";

@Component({
  selector: 'page-about',
  templateUrl: 'start.html',
  providers: [AngularFireDatabase, PlayerNamePipe]
})
export class StartPage {

  golfCourses: IGolfCourse[];
  golfCourse: IGolfCourse;
  teeTypes: any[];
  teeType: any;
  players: string[] = [];
  courseId: number;

  constructor(public navCtrl: NavController,
              public golfCourseService: GolfCourseService,
              public check: PlayerNamePipe,
              public alertCtrl: AlertController) {

  }

  ngOnInit(): void{

    this.golfCourseService.getGolfCourses()
      .subscribe((golfCourses: IGolfCourse[]) => {
          this.golfCourses = golfCourses;
          console.log(this.golfCourses);
        }
      );
    this.addPlayer();

  }

  getCourseTees(courseId): void{
    console.log( courseId );
    this.golfCourseService.getCourseInfo(courseId)
      .subscribe((golfCourse: any) => {
        this.golfCourse = golfCourse.course;
        this.courseId = courseId;
        this.teeTypes = golfCourse.course.tee_types;
        console.log(this.teeTypes);
        console.log(this.teeTypes[0].tee_type)
      });
  }

  saveTeeType(tee){
    let count = 0;
    for (let t of this.teeTypes){
      console.log(t);
      if (t.tee_type === tee){
        this.teeType = this.teeTypes[count];
      }
    }
    console.log(this.teeType)
  }

  startGame(): void{
    let counter = 0;
    for (let playa of this.players){
      console.log(playa);
      if (playa === '' || playa === ' '){
        playa = "Player " + (counter + 1);
        this.players[counter] = playa;
        console.log("found an unnamed player")
      }
      console.log("Renamed to " + playa);
      counter++;
    }
    for (let tee = 0; tee < this.teeTypes.length; tee++){
      if (this.teeTypes[tee] === this.teeType){
        this.teeType = tee;
      }
    }
    this.navCtrl.push(GamePage, [this.players, this.golfCourse, this.teeType])
  }

  addPlayer(){
    if (this.players.length >= 4){
      let alert = this.alertCtrl.create({
        title: 'Whoa, Chill Yourselves',
        subTitle: "This app doesn't allow more than 4 players",
        buttons: ['OK']
      });
      alert.present();
    }
    else{
      this.players[this.players.length] = '';
      console.log(this.players);
    }
  }

  checkName() {
    let players;
    players = this.check.transform(this.players);
    this.players = players;
  }

}
