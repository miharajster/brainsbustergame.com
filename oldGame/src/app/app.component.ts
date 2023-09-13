import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  step:number = 0;

  number_0:number = 0;
  number_1:number = 0;

  number_array:number[] = [0,1,2,3,4,5,6,7,8,9];

  number_position_0:string = '0px';
  number_position_1:string = '0px';

  user_input:string = '';
  user_input_fuse:boolean = false;

  score:number = 0;

  log_all:any[] = [];
  log_out:any;
  objectSubject: Subject<any> = new Subject<any>();
  objectObservable: Observable<any> = this.objectSubject.asObservable();

  bg_sound:HTMLAudioElement = new Audio();
  punch:HTMLAudioElement = new Audio();
  wrong:HTMLAudioElement = new Audio();
  correct:HTMLAudioElement = new Audio();

  constructor() {
  }
  ngOnInit(): void {
    this.bg_sound.src = "../assets/bg_game.mp3";
    this.bg_sound.loop = true;
    this.bg_sound.volume = .5;
    this.bg_sound.load();

    this.punch.src = "../assets/punch.mp3";
    this.punch.load();

    this.wrong.src = "../assets/wrong.mp3";
    this.wrong.load();

    this.correct.src = "../assets/correct.mp3";
    this.correct.load();

    this.objectObservable.subscribe(objects => {
      this.log_out = objects;
    });
  }

  // bined to the START button
  step_one():void {
    // start playing background audio
    this.bg_sound.play();

    this.step = 1;          // change page to show the game
    this.start_chain()      // start the chain
  }

  // bined to RELOAD button
  reroll():void {
    // start playing background audio
    this.punch.play();

    this.user_input = '';   // reset the input
    this.start_chain();     // start the chain
  }

  start_chain():void {
    this.user_input = '';   // reset the input
    this.generate_random_numbers();
  }

  // Function to generate a random two numbers
  generate_random_numbers():void {
    this.number_0 = Math.floor(Math.random() * 9);  // generate random number
    this.number_1 = Math.floor(Math.random() * 9);

    this.number_position_animator();
  }

  // animate the numbers on FE
  number_position_animator():void {
    setTimeout(() => {
      this.number_position_0 = '-'+ (this.number_0 * 140 + (-Math.floor(Math.random() * 10) * 2.5)) +'px';
      if(this.number_0 === 0){
        this.number_position_0 = '0px';
      }

      this.number_position_1 = '-'+ (this.number_1 * 140 + (-Math.floor(Math.random() * 10) * 2.5)) +'px';
      if(this.number_1 === 0){
        this.number_position_1 = '0px';
      }
    }, 100);
    this.user_input_fuse = false;
  }

  // check if result is ok
  run_test():void {
    if(!this.user_input_fuse) {
      if ((this.number_0 + this.number_1) !== parseInt(this.user_input)) {
        this.number_position_0 = '-1510px';   // show WRONG in FE
        this.number_position_1 = '-1520px';

        // generate an object
        const newObject = {
          question: this.number_0 + ' + ' + this.number_1 + ' = _ (user enters ' + this.user_input + ')',
          anwser: this.number_0 + ' + ' + this.number_1 + ' = ' + this.user_input + ' wrong!'
        };
        this.log_all.push(newObject);         // send an object to log_all
        this.objectSubject.next(this.log_all);// emit this.log_all to objectSubject

        this.objectObservable.subscribe(objects => {
          this.log_out = objects;             // "copy" objects to the this.log_out
        });

        // play some audio
        this.wrong.play();

        // set fuse so there will be no multiple scores
        this.user_input_fuse = true;
      } else {
        this.number_position_0 = '-1410px';   // show CORRECT in FE
        this.number_position_1 = '-1400px';
        this.score = this.score + 1;          // up the score

        const newObject = {
          question: this.number_0 + ' + ' + this.number_1 + ' = _ (user enters ' + this.user_input + ')',
          anwser: this.number_0 + ' + ' + this.number_1 + ' = ' + this.user_input + ' correct!'
        };
        this.log_all.push(newObject);
        this.objectSubject.next(this.log_all);

        this.objectObservable.subscribe(objects => {
          this.log_out = objects;
        });

        this.correct.play();

        this.user_input_fuse = true;
      }

      // reset everything so user can enter another round
      setTimeout(() => {
        this.start_chain();
      }, 3000);
    }
  }
}
