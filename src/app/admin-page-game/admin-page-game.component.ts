import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-page-game',
  templateUrl: './admin-page-game.component.html',
  styleUrls: ['./admin-page-game.component.css']
})
export class AdminPageGameComponent implements OnInit {

  constructor(private http: HttpClient) { }
  gamePost = {
    Question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  }
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
  ngOnInit() {
    
  }

  postQuestion(){
    console.log('posting');
    this.gamePost = {
      Question: this.question,
      option1: this.option1,
      option2: this.option2,
      option3: this.option3,
      option4: this.option4,
      answer: this.answer,
    }
    this.question = '';
    this.option1= '';
    this.option2 = '';
    this.option3 = '';
    this.option4= '';
    this.answer = '';
    this.http.post('http://localhost:3000/api/games', this.gamePost).subscribe();
  }

}
