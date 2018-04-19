import {Component, OnInit} from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {IGolfCourse} from "../../interfaces/IGolfCourse";

@Component({
  selector: 'page-home',
  templateUrl: 'game.html'
})
export class GamePage implements OnInit{

  golfCourse: IGolfCourse;
  players: any[] = [];
  score: Array<number>[] = [[], [], [], []];
  courseId: number;
  holes: number[] = [];
  par: number[] = [];
  yards: number[] = [];
  hcp: number[] = [];
  teeType: any;
  totalIn: number[] = [];
  totalOut: number[] = [];
  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public navParams: NavParams) {

  }

  ngOnInit(){
    console.log(this.navParams.data);
    this.players = this.navParams.data[0];
    this.courseId = this.navParams.data[1];
    this.golfCourse = this.navParams.data[1];
    this.holes = this.navParams.data[1].holes;
    this.teeType = this.navParams.data[2];
    for (let player = 0; player < this.players.length; player++){
      this.totalIn[player] = 0;
      this.totalOut[player] = 0;
      for (let hole = 0; hole < this.holes.length; hole++){
        this.score[player][hole] = 0;
      }
    }
    for (let hole = 0; hole < this.holes.length; hole++){
      this.par[hole] = this.navParams.data[1].holes[hole].tee_boxes[this.teeType].par;
      this.yards[hole] = this.navParams.data[1].holes[hole].tee_boxes[this.teeType].yards;
      this.hcp[hole] = this.navParams.data[1].holes[hole].tee_boxes[this.teeType].hcp;
      this.holes[hole] = hole + 1;
    }
    console.log("Par: ", this.par, "\nYards: ", this.yards, "\nHCP: ", this.hcp);
  }

  addInput(p, h, input){
    let i = Number(input);
    console.log(p);
    console.log(h);
    console.log(i);
    console.log(this.score.length);
    h--;
    let count = 0;
    for (let player = 0; player < this.score.length; player++){
      if (p === this.players[player]){
        this.score[count][h] = i;
        console.log("Player: " + player, "Score At Hole ", h, ": " + this.score[count][h]);
        count++;
      }
    }
    this.getTotals(p);
  }

  getTotals(p){
    let total = 0;
    for (let player = 0; player < this.score.length; player++){
      if (p === this.players[player]){
        for(let i = 0; i < 9; i++) {
          if (isNaN(this.score[player][i])){
            this.score[player][i] = 0;
            let alert = this.alertCtrl.create({
              title: 'Sorry!',
              subTitle: "But we can't add non-number characters",
              buttons: ['OK']
            });
            alert.present();
          }
          total += this.score[player][i];

        }
        this.totalIn[player] = total;
        if (this.holes.length === 18){
          total = 0;
          for(let i = 9; i < 18; i++) {
            if (isNaN(this.score[player][i])){
              let alert = this.alertCtrl.create({
                title: 'Sorry!',
                subTitle: "But we can't add non-number characters",
                buttons: ['OK']
              });
              alert.present();
              this.score[player][i] = 0;
            }
            total += this.score[player][i];
          }
        }
        console.log("Total: " + total);
        this.totalOut[player] = total;
      }
    }
  }

  showTotals(p, t?){
    console.log(p);
    let inner = [];
    let outer = [];
    if (p === this.players){
      for (let playa = 0; playa < this.players.length; playa++){
        if (this.players[playa] === p){
          return this.totalIn[playa] + this.totalOut[playa];
        }
      }
    }
    else if (p === 'hcp'){
      for (let i = 0; i < 9; i++){
        inner[i] = this.hcp[i];
      }
      if(t === "in"){
        return inner.reduce(this.getSum);
      }
      if(this.holes.length === 18){
        for (let i = 9; i < 18; i++){
          outer[i - 9] = this.hcp[i];
        }
      }
    }
    else if (p === 'par'){
      for (let i = 0; i < 9; i++){
        inner[i] = this.par[i];
      }
      if(t === "in"){
        return inner.reduce(this.getSum);
      }
      if(this.holes.length === 18){
        for (let i = 9; i < 18; i++){
          outer[i - 9] = this.par[i];
        }
      }
    }
    else if (p === 'yards'){
      for (let i = 0; i < 9; i++){
        inner[i] = this.yards[i];
      }
      if(t === "in"){
        return inner.reduce(this.getSum);
      }
      if(this.holes.length === 18){
        for (let i = 9; i < 18; i++){
          outer[i - 9] = this.yards[i];
        }
      }
    }
  }

  getSum(total, num){
    return total + num;
  }

}
