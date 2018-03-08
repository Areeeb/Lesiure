import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface user {
  connections: number,
  level: number,
  _GeneralPoints: 0,
  _GeneralLevel: 0,
  _MoviesPoints: 0,
  _MoviesLevel: 0,
  _CarsPoints: 0,
  _CarsLevel: 0,
  _SportsPoints: 0,
  _SportsLevel: 0,
  points: number,
  username: string,
  age: number,
  id: string,
  password: string
  fname: string,
  ProfilePicture: string,
  _quote: string,
  _sports: string,
  _movie: string,
  _season: string,
  _song: string,
  _personality: string,
  _education: string,
  perks: number
}

interface gameQuestion {
  Question: string,
  option1: string,
  option2: string,
  option3: string,
  option4: string,
  answer: string,
  id: string
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  userInfo : user;

  Questions: gameQuestion[] = [];
  ques: string;
  opt1: string;
  opt2: string;
  opt3: string;
  opt4: string;
  ans: string;
  generalLevel: number;
  nextLevel: number;
  carsLevel: number;
  moviesLevel: number;
  sportsLevel: number;
  url: string;
  increment: number= 0;
  buttonChecked: any;
  len: number;
  correct: number = 0;
  volume: string  = "glyphicon glyphicon-volume-up";
  questionNum: number = 1;

  

  constructor(private http: HttpClient, private router: Router) { 
    
  }

  ngOnInit() {
    const _userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    this.initUserInfo(_userInfo); 
    console.log('game recieves', this.userInfo);
    this.UserLevel = this.userInfo.level;
    this.perks = this.userInfo.perks;

    if(Math.floor(this.userInfo.level) % 2  == 0){
      this.nextLevel = Math.floor(this.userInfo.level) + 2;
    }
    else{
      this.nextLevel = Math.floor(this.userInfo.level) + 1;
    }
    

  }

  initUserInfo(data: any = {}){
    this.userInfo = Object.assign({ level: 0, _GeneralPoints: 0, _GeneralLevel: 0, _MoviesPoints: 0, _MoviesLevel: 0, _CarsPoints: 0, _CarsLevel: 0, _SportsPoints: 0, _SportsLevel: 0, connections: 0, points: 0, username: '', age: 0, id: '', password: '', fname: '', ProfilePicture: '', _quote: '', _sports: '', _movie: '', _season: '', _song: '', _personality: '', _education: '' }, data);
  }

  
  
  points=0;
  SportsPoints=0;
  MoviesPoints=0;
  CarsPoints=0;
  GeneralPoints=0;
  SportsLevel=0;
  MoviesLevel=0;
  CarsLevel=0;
  GeneralLevel=0;
  level=0;
  counter=1;
  UserLevel: number;
  perks: number;
  type: string;
  hint_: string;
  userPut = {
    Username: '',
    Password: '',
    firstName: '',
    Age: 0,
    ProfilePic: '',
    Points: 0,
    Level: 0,
    GeneralPoints: 0,
    GeneralLevel: 0,
    MoviesPoints: 0,
    MoviesLevel: 0,
    CarsPoints: 0,
    CarsLevel: 0,
    SportsPoints: 0,
    SportsLevel: 0,
    Connections: 0,
    quote: '',
    sports: '',
    movie: '',
    season: '',
    song: '',
    personality: '',
    education: '',
    id: '',
    perks: 0
  }

  userPutLocalStorage = {
    points: 0,
    connections: 0,
    level: 0,
    _GeneralPoints: 0, 
    _GeneralLevel: 0, 
    _MoviesPoints: 0, 
    _MoviesLevel: 0, 
    _CarsPoints: 0, 
    _CarsLevel: 0, 
    _SportsPoints: 0, 
    _SportsLevel: 0,
    username: '',
    age: 0,
    id: '',
    password: '',
    fname: '',
    ProfilePicture: '',
    _quote: '',
    _sports: '',
    _movie: '',
    _season: '',
    _song: '',
    _personality: '',
    _education: '',
    perks: 0
  }
  

  ChangeQuestion(){
    
    this.increment = Math.floor(Math.random() * Object.keys(this.Questions).length); 
    this.questionNum++;
    this.counter++;
    this.ques = this.Questions[this.increment].Question;
    this.opt1 = this.Questions[this.increment].option1;
    this.opt2 = this.Questions[this.increment].option2;
    this.opt3 = this.Questions[this.increment].option3;
    this.opt4 = this.Questions[this.increment].option4;
    this.ans = this.Questions[this.increment].answer;
    

    document.getElementById('Change').style.display='none';	
    document.getElementById('Response_1').style.display='none';	
    document.getElementById('Response_2').style.display='none';	
    document.getElementById('Check').style.display='block';
  }

  switch(_type: string){
    console.log('Switch ');
    document.getElementById('block1').style.display = 'none';
    document.getElementById('Body_').style.display = 'block';
    console.log(_type);
    if(_type == 'general'){
      this.url = 'http://localhost:3000/api/Generals';
    }
    else if(_type == 'movies'){
      this.url = 'http://localhost:3000/api/Movies';
    }
    else if(_type == 'sports'){
      this.url ='http://localhost:3000/api/Sports';
    }
    else if(_type == 'cars'){
      this.url = 'http://localhost:3000/api/Cars'
    }
    this.http.get(this.url).subscribe(
      data => {
        console.log('data', data);
        for (var loop=0; loop< Object.keys(data).length; loop++){
          this.Questions[loop] = data[loop];
          console.log('Question data', this.Questions[loop]);
        }
        this.len = Object.keys(this.Questions).length;
        console.log('Questions length is ' + Object.keys(this.Questions).length + ' lentgh is ' + this.len)
        this.ques = this.Questions[0].Question;
        this.opt1 = this.Questions[0].option1;
        this.opt2 = this.Questions[0].option2;
        this.opt3 = this.Questions[0].option3;
        this.opt4 = this.Questions[0].option4;
        this.ans = this.Questions[0].answer;
        this.type = _type;

        this.points=this.userInfo.points;
        this.SportsPoints=this.userInfo._SportsPoints;
        this.MoviesPoints=this.userInfo._MoviesPoints;
        this.CarsPoints=this.userInfo._CarsPoints;
        this.GeneralPoints=this.userInfo._GeneralPoints;
        this.SportsLevel=this.userInfo._SportsLevel;
        this.MoviesLevel=this.userInfo._MoviesLevel;
        this.CarsLevel=this.userInfo._CarsLevel;
        this.GeneralLevel=this.userInfo._GeneralLevel;
        this.level=this.userInfo.level;
        this.perks = this.userInfo.perks;

        if(this.perks > 0){
          document.getElementById('undo').style.visibility = 'block';
        }

        if(this.perks > 0){
          document.getElementById('Hint').style.visibility = 'block';
        }

        
      },
      err => {
        console.log('something is wrong!');
      }
    );
  }

  reverse(){
    console.log('reverse');
    document.getElementById('Body_').style.display = 'none';
    document.getElementById('block1').style.display = 'block';
  }

  undo(){
    var status = confirm('Do you want to use a perk?')
    if(status == true){
      document.getElementById('Check').style.display='block';
      document.getElementById('Change').style.display='none';
  
      this.perks = this.perks - 1;
      this.userPut = {
        Username: this.userInfo.username,
        Password: this.userInfo.password,
        firstName: this.userInfo.fname,
        Age: this.userInfo.age,
        ProfilePic: this.userInfo.ProfilePicture,
        Points: this.userInfo.points,
        Level: this.userInfo.level,
        GeneralPoints: this.userInfo._GeneralPoints,
        GeneralLevel: this.userInfo._GeneralLevel,
        MoviesPoints: this.userInfo._MoviesPoints,
        MoviesLevel: this.userInfo._MoviesLevel,
        CarsPoints: this.userInfo._CarsPoints,
        CarsLevel: this.userInfo._CarsLevel,
        SportsPoints: this.SportsPoints,
        SportsLevel: this.SportsLevel,
        Connections: this.userInfo.connections,
        quote: this.userInfo._quote,
        sports: this.userInfo._sports,
        movie: this.userInfo._movie,
        season: this.userInfo._season,
        song: this.userInfo._song,
        personality: this.userInfo._personality,
        education: this.userInfo._education,
        id: this.userInfo.id,
        perks: this.perks
      }
  
      this.http.post('http://localhost:3000/api/Accounts', this.userPut).subscribe();
    }

    
  }

  hint(){
    var status = confirm('Do you want to use a perk?')
    if(status == true){
      document.getElementById('Hint').style.visibility = 'block';
      if(this.ques == 'Michael Jordan is famous for which sport?'){
        this.hint_ = 'Slam dunk';
        document.getElementById('hints').style.visibility = 'block';
      }
      else if(this.ques == "Which team won the UEFA Champions League in 2012?"){
        this.hint_ = 'blue';
        document.getElementById('hints').style.visibility = 'block';
      }
      else if(this.ques == 'Which player was the most expensive transfer (up to the year 2016)?'){
        this.hint_ = 'DAB';
        document.getElementById('hints').style.visibility = 'block';
      }
      this.perks = this.perks - 1;
      this.userPut = {
        Username: this.userInfo.username,
        Password: this.userInfo.password,
        firstName: this.userInfo.fname,
        Age: this.userInfo.age,
        ProfilePic: this.userInfo.ProfilePicture,
        Points: this.userInfo.points,
        Level: this.userInfo.level,
        GeneralPoints: this.userInfo._GeneralPoints,
        GeneralLevel: this.userInfo._GeneralLevel,
        MoviesPoints: this.userInfo._MoviesPoints,
        MoviesLevel: this.userInfo._MoviesLevel,
        CarsPoints: this.userInfo._CarsPoints,
        CarsLevel: this.userInfo._CarsLevel,
        SportsPoints: this.SportsPoints,
        SportsLevel: this.SportsLevel,
        Connections: this.userInfo.connections,
        quote: this.userInfo._quote,
        sports: this.userInfo._sports,
        movie: this.userInfo._movie,
        season: this.userInfo._season,
        song: this.userInfo._song,
        personality: this.userInfo._personality,
        education: this.userInfo._education,
        id: this.userInfo.id,
        perks: this.perks
      }

      this.http.post('http://localhost:3000/api/Accounts', this.userPut).subscribe();
    }
  }

  Option(){	
          console.log('Option');
          this.points = this.userInfo.points;
          this.level = this.userInfo.level;
            document.getElementById('Response_1').style.display='none';
            document.getElementById('Response_2').style.display='none';
            document.getElementById('Check').style.display='none';
            console.log(Object.keys(this.Questions).length);						
            if(this.counter>=Object.keys(this.Questions).length){
              document.getElementById('Result').style.display='block';
              document.getElementById('Check').style.display='none';
            }			
            else{
              document.getElementById('Change').style.display='block';
            }
      
            
                if(document.getElementById('Q1_').style.display=='block'){
                  console.log(this.buttonChecked);
                  if(this.buttonChecked == this.ans){
                        document.getElementById('Response_1').style.display='block';
                          if(this.type == 'sports'){
                            
                            this.points++;
                            this.correct++;
                            this.SportsPoints++;
                            this.level = this.points / 20;
                            this.sportsLevel = this.SportsPoints / 5;
                            
                            if(Math.floor(this.level) > this.nextLevel){
                              this.perks = this.perks + 2;
                            }
  
                            this.userPut = {
                              Username: this.userInfo.username,
                              Password: this.userInfo.password,
                              firstName: this.userInfo.fname,
                              Age: this.userInfo.age,
                              ProfilePic: this.userInfo.ProfilePicture,
                              Points: this.points,
                              Level: this.level,
                              GeneralPoints: this.userInfo._GeneralPoints,
                              GeneralLevel: this.userInfo._GeneralLevel,
                              MoviesPoints: this.userInfo._MoviesPoints,
                              MoviesLevel: this.userInfo._MoviesLevel,
                              CarsPoints: this.userInfo._CarsPoints,
                              CarsLevel: this.userInfo._CarsLevel,
                              SportsPoints: this.SportsPoints,
                              SportsLevel: this.SportsLevel,
                              Connections: this.userInfo.connections,
                              quote: this.userInfo._quote,
                              sports: this.userInfo._sports,
                              movie: this.userInfo._movie,
                              season: this.userInfo._season,
                              song: this.userInfo._song,
                              personality: this.userInfo._personality,
                              education: this.userInfo._education,
                              id: this.userInfo.id,
                              perks: this.perks
                            }
                            this.http.put('http://localhost:3000/api/Accounts', this.userPut).subscribe();
                            this.userPutLocalStorage = {
                              points: this.userPut.Points,
                              connections: this.userPut.Connections,
                              level: this.userPut.Level,
                              _GeneralPoints: this.userPut.GeneralPoints, 
                              _GeneralLevel: this.userPut.GeneralLevel, 
                              _MoviesPoints: this.userPut.MoviesPoints, 
                              _MoviesLevel: this.userPut.MoviesLevel,
                              _CarsPoints: this.userPut.CarsPoints, 
                              _CarsLevel: this.userPut.CarsLevel, 
                              _SportsPoints: this.userPut.SportsPoints, 
                              _SportsLevel: this.userPut.SportsLevel,
                              username: this.userPut.Username,
                              age: this.userPut.Age,
                              id: this.userPut.id,
                              password: this.userPut.Password,
                              fname: this.userPut.firstName,
                              ProfilePicture: this.userPut.ProfilePic,
                              _quote: this.userPut.quote,
                              _sports: this.userPut.sports,
                              _movie: this.userPut.movie,
                              _season: this.userPut.season,
                              _song: this.userPut.song,
                              _personality: this.userPut.personality,
                              _education: this.userPut.education,
                              perks: this.userPut.perks
                            }
                            
                            this.userInfo.points += 1;
                            
                            localStorage.clear();
                            localStorage.setItem('userInfo', JSON.stringify(this.userPutLocalStorage));
                            console.log(JSON.parse(localStorage.getItem('userInfo') || '{}'));
                          }
                          else if(this.type == 'movies'){
                            
                            this.points++;
                            this.correct++;
                            this.MoviesPoints++;
  
                            this.level = this.points / 20;
                            this.moviesLevel = this.MoviesPoints / 5;
                            console.log('Perks unlock at', this.nextLevel)
                            if(Math.floor(this.level) > this.nextLevel){
                              this.perks = this.perks + 2;
                            }
  
                            this.userPut = {
                              Username: this.userInfo.username,
                              Password: this.userInfo.password,
                              firstName: this.userInfo.fname,
                              Age: this.userInfo.age,
                              ProfilePic: this.userInfo.ProfilePicture,
                              Points: this.points,
                              Level: this.level,
                              GeneralPoints: this.userInfo._GeneralPoints,
                              GeneralLevel: this.userInfo._GeneralLevel,
                              MoviesPoints: this.MoviesPoints,
                              MoviesLevel: this.MoviesLevel,
                              CarsPoints: this.userInfo._CarsPoints,
                              CarsLevel: this.userInfo._CarsLevel,
                              SportsPoints: this.userInfo._SportsPoints,
                              SportsLevel: this.userInfo._SportsLevel,
                              Connections: this.userInfo.connections,
                              quote: this.userInfo._quote,
                              sports: this.userInfo._sports,
                              movie: this.userInfo._movie,
                              season: this.userInfo._season,
                              song: this.userInfo._song,
                              personality: this.userInfo._personality,
                              education: this.userInfo._education,
                              id: this.userInfo.id,
                              perks: this.perks
                            }
                            this.http.put('http://localhost:3000/api/Accounts', this.userPut).subscribe();
                            this.userPutLocalStorage = {
                              points: this.userPut.Points,
                              connections: this.userPut.Connections,
                              level: this.userPut.Level,
                              _GeneralPoints: this.userPut.GeneralPoints, 
                              _GeneralLevel: this.userPut.GeneralLevel, 
                              _MoviesPoints: this.userPut.MoviesPoints, 
                              _MoviesLevel: this.userPut.MoviesLevel,
                              _CarsPoints: this.userPut.CarsPoints, 
                              _CarsLevel: this.userPut.CarsLevel, 
                              _SportsPoints: this.userPut.SportsPoints, 
                              _SportsLevel: this.userPut.SportsLevel,
                              username: this.userPut.Username,
                              age: this.userPut.Age,
                              id: this.userPut.id,
                              password: this.userPut.Password,
                              fname: this.userPut.firstName,
                              ProfilePicture: this.userPut.ProfilePic,
                              _quote: this.userPut.quote,
                              _sports: this.userPut.sports,
                              _movie: this.userPut.movie,
                              _season: this.userPut.season,
                              _song: this.userPut.song,
                              _personality: this.userPut.personality,
                              _education: this.userPut.education,
                              perks: this.userPut.perks
                            }
                            
                            this.userInfo.points += 1;
                            
                            localStorage.clear();
                            localStorage.setItem('userInfo', JSON.stringify(this.userPutLocalStorage));
                            console.log(JSON.parse(localStorage.getItem('userInfo') || '{}'));
                          }
                          else if(this.type == 'cars'){
                            
                            this.points++;
                            this.correct++;
                            this.CarsPoints++;
  
                            this.level = this.points / 20;
                            this.carsLevel = this.CarsPoints / 5;
                            if(Math.floor(this.level) > this.nextLevel){
                              this.perks = this.perks + 2;
                            }
  
                            this.userPut = {
                              Username: this.userInfo.username,
                              Password: this.userInfo.password,
                              firstName: this.userInfo.fname,
                              Age: this.userInfo.age,
                              ProfilePic: this.userInfo.ProfilePicture,
                              Points: this.points,
                              Level: this.level,
                              GeneralPoints: this.userInfo._GeneralPoints,
                              GeneralLevel: this.userInfo._GeneralLevel,
                              MoviesPoints: this.userInfo._MoviesPoints,
                              MoviesLevel: this.userInfo._MoviesLevel,
                              CarsPoints: this.CarsPoints,
                              CarsLevel: this.CarsLevel,
                              SportsPoints: this.userInfo._SportsPoints,
                              SportsLevel: this.userInfo._SportsLevel,
                              Connections: this.userInfo.connections,
                              quote: this.userInfo._quote,
                              sports: this.userInfo._sports,
                              movie: this.userInfo._movie,
                              season: this.userInfo._season,
                              song: this.userInfo._song,
                              personality: this.userInfo._personality,
                              education: this.userInfo._education,
                              id: this.userInfo.id,
                              perks: this.perks
                            }
                            this.http.put('http://localhost:3000/api/Accounts', this.userPut).subscribe();
                            this.userPutLocalStorage = {
                              points: this.userPut.Points,
                              connections: this.userPut.Connections,
                              level: this.userPut.Level,
                              _GeneralPoints: this.userPut.GeneralPoints, 
                              _GeneralLevel: this.userPut.GeneralLevel, 
                              _MoviesPoints: this.userPut.MoviesPoints, 
                              _MoviesLevel: this.userPut.MoviesLevel,
                              _CarsPoints: this.userPut.CarsPoints, 
                              _CarsLevel: this.userPut.CarsLevel, 
                              _SportsPoints: this.userPut.SportsPoints, 
                              _SportsLevel: this.userPut.SportsLevel,
                              username: this.userPut.Username,
                              age: this.userPut.Age,
                              id: this.userPut.id,
                              password: this.userPut.Password,
                              fname: this.userPut.firstName,
                              ProfilePicture: this.userPut.ProfilePic,
                              _quote: this.userPut.quote,
                              _sports: this.userPut.sports,
                              _movie: this.userPut.movie,
                              _season: this.userPut.season,
                              _song: this.userPut.song,
                              _personality: this.userPut.personality,
                              _education: this.userPut.education,
                              perks: this.userPut.perks
                            }
                            
                            this.userInfo.points += 1;
                            
                            localStorage.clear();
                            localStorage.setItem('userInfo', JSON.stringify(this.userPutLocalStorage));
                            console.log(JSON.parse(localStorage.getItem('userInfo') || '{}'));
                          }
                          else if(this.type == 'general'){
                            
                            this.points++;
                            this.correct++;
                            this.GeneralPoints++;
                            console.log( 'General Points ', this.GeneralPoints);
  
                            this.level = this.points / 20;
                            this.generalLevel = this.GeneralPoints / 5;
                            console.log('Ceiled level ', Math.floor(this.level));
                            if(Math.floor(this.level) > this.nextLevel){
                              this.perks = this.perks + 2;
                            }

  
                            this.userPut = {
                              Username: this.userInfo.username,
                              Password: this.userInfo.password,
                              firstName: this.userInfo.fname,
                              Age: this.userInfo.age,
                              ProfilePic: this.userInfo.ProfilePicture,
                              Points: this.points,
                              Level: this.level,
                              GeneralPoints: this.GeneralPoints,
                              GeneralLevel: this.GeneralLevel,
                              MoviesPoints: this.userInfo._MoviesPoints,
                              MoviesLevel: this.userInfo._MoviesLevel,
                              CarsPoints: this.userInfo._CarsPoints,
                              CarsLevel: this.userInfo._CarsLevel,
                              SportsPoints: this.userInfo._SportsPoints,
                              SportsLevel: this.userInfo._SportsLevel,
                              Connections: this.userInfo.connections,
                              quote: this.userInfo._quote,
                              sports: this.userInfo._sports,
                              movie: this.userInfo._movie,
                              season: this.userInfo._season,
                              song: this.userInfo._song,
                              personality: this.userInfo._personality,
                              education: this.userInfo._education,
                              id: this.userInfo.id,
                              perks: this.perks
                            }
                            this.http.put('http://localhost:3000/api/Accounts', this.userPut).subscribe();
                            this.userPutLocalStorage = {
                              points: this.userPut.Points,
                              connections: this.userPut.Connections,
                              level: this.userPut.Level,
                              _GeneralPoints: this.userPut.GeneralPoints, 
                              _GeneralLevel: this.userPut.GeneralLevel, 
                              _MoviesPoints: this.userPut.MoviesPoints, 
                              _MoviesLevel: this.userPut.MoviesLevel,
                              _CarsPoints: this.userPut.CarsPoints, 
                              _CarsLevel: this.userPut.CarsLevel, 
                              _SportsPoints: this.userPut.SportsPoints, 
                              _SportsLevel: this.userPut.SportsLevel,
                              username: this.userPut.Username,
                              age: this.userPut.Age,
                              id: this.userPut.id,
                              password: this.userPut.Password,
                              fname: this.userPut.firstName,
                              ProfilePicture: this.userPut.ProfilePic,
                              _quote: this.userPut.quote,
                              _sports: this.userPut.sports,
                              _movie: this.userPut.movie,
                              _season: this.userPut.season,
                              _song: this.userPut.song,
                              _personality: this.userPut.personality,
                              _education: this.userPut.education,
                              perks: this.userPut.perks
                            }
                            
                            this.userInfo.points += 1;
                            
                            localStorage.clear();
                            localStorage.setItem('userInfo', JSON.stringify(this.userPutLocalStorage));
                            console.log(JSON.parse(localStorage.getItem('userInfo') || '{}'));
                          }
    
                      
                  }
                  else{
                    document.getElementById('Response_2').style.display='block';
                  }
                }
                document.getElementById('S').innerHTML= "Score " + this.points;
                
      }
  
  ShowResult(){
    document.getElementById('Response_2').style.display='none';
    document.getElementById('Response_1').style.display='none';

    console.log('show result');
   
    document.getElementById('Result_').style.display='block';
  //document.getElementById('R').style.display='block';
  //document.getElementById('P').style.display='block';
  document.getElementById('R').innerHTML=String(this.correct);
  document.getElementById('P').innerHTML=String(this.correct);
  document.getElementById('Change').style.display='none';
  document.getElementById('Check').style.display='none';
  document.getElementById('Result').style.display='none';
  document.getElementById('S').style.display='none';



  setTimeout(() => {
    this.router.navigate(['/blank']);
  }, 5000);
  }

  volumeToggle(){
    if(this.volume == 'glyphicon glyphicon-volume-up'){
      this.volume = 'glyphicon glyphicon-volume-off';
      var audio = document.getElementById('audio1') as HTMLMediaElement;
      audio.muted = true;
    }
    else{
      this.volume = 'glyphicon glyphicon-volume-up';
      var audio = document.getElementById('audio1') as HTMLMediaElement;
      audio.muted = false;
    }
  }

}