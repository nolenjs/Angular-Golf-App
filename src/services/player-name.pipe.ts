import { Pipe, PipeTransform } from '@angular/core';
import 'rxjs';

@Pipe({name: 'nameCheck'})
export class PlayerNamePipe implements PipeTransform {

  constructor() { }

  sameName: any = {name: [''], count: [0]};
  players: string[];

  transform(players) {
    this.players = players;
    for (let index = 0; index < players.length; index++){
      for (let index2 = 0; index2 < players.length; index2++){
        this.compare(index, index2);
      }
    }
    return this.players;
  }

  compare(index1, index2){
    let p = this.players;
    if (p.length - index2 > 0 && index1 !== index2){
      let name = this.sameName.name;
      let count = this.sameName.count;
      if (p[index1] === p[index2] && (p[index1] !== '' || p[index2] !== '')){
        let counter = 0;
        let used =false;
        for (let playa of name){
          if (p[index2] === playa){
            count[counter]++;
            p[index2] += `(${count[counter]})`;
            used = true;
          }
          counter++;
        }
        if (used === false){
          name[name.length] = p[index2];
          count[count.length] = 1;
          p[index2] += `(${count[count.length - 1]})`;
        }
      }
      this.compare(index1, index2 + 1);
    }
  }
}
