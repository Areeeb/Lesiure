import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UtilService } from '../util.service';

interface loginInterface{ //for login
  Username: string,
  Password: string,
  id: string
}

interface AccountResponse{ //to get account information and store it in local variables
  Username: string,
  Password: string,
  firstName: string,
  Age: 0,
  ProfilePic: string,
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
  quote: string,
  sports: string,
  movie: string,
  season: string,
  song: string,
  personality: string,
  education: string,
  perks: number,
  id: string
}

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {

  loginData = {
    Username: '',
    Password: ''
  }

  contactUs = {
    Name: '',
    Email: '',
    Comments: ''
  }

  Signup = { //for signup
    Username: '',
    Password: '',
    firstName: '',
    Age: 0,
    ProfilePic: '',
    Points: 0,
    Level: 0,
    Connections: 0,
    quote: '',
    sports: '',
    movie: '',
    season: '',
    song: '',
    personality: '',
    education: ''
  }

  id: string;
  path: string;
  points : number;
  level : number;
  _GeneralPoints: number;
  _GeneralLevel: number;
  _MoviesPoints: number;
  _MoviesLevel: number;
  _CarsPoints: number;
  _CarsLevel: number;
  _SportsPoints: number;
  _SportsLevel: number;
  connections : number;
  age: number;
  username: string;
  password: string;
  fname: string;
  ProfilePicture: string;
  _quote: string;
  _sports: string;
  _movie: string;
  _season: string;
  _song: string;
  _personality: string;
  _education: string;
  perks: number

  name: string ="";
  email: string = "";
  comment: string= "";

  constructor(private router: Router, private http: HttpClient, private utilService: UtilService) { }

  ngOnInit() {
  }

  login(username: string, password: string) {
    
    document.getElementById("prompt").style.visibility = "hidden";
    // if user is authenticated
    this.loginData = {
      Username: username,
      Password: password
    }
    let authenticated = false;
    this.http.get<loginInterface>('http://localhost:3000/api/Accounts').subscribe(
      data => {
        if(Object.keys(data).length == 0){
          document.getElementById("prompt").style.visibility = "visible";
        }
        for(var loop=0; loop < Object.keys(data).length; loop++){
          if(this.loginData.Username == data[loop].Username){
            if(this.loginData.Password == data[loop].Password){
              authenticated = true;
              this.id = data[loop].id;
              this.path = 'http://localhost:3000/api/Accounts/' + this.id;
              console.log(this.id);
              this.http.get<AccountResponse>(this.path).subscribe(
                data => {
                  this.points = data.Points;
                  this.connections = data.Connections;
                  this.level = data.Level;
                  this._GeneralPoints= data.GeneralPoints;
                  this._GeneralLevel= data.GeneralLevel;
                  this._MoviesPoints= data.MoviesPoints;
                  this._MoviesLevel= data.MoviesLevel;
                  this._CarsPoints= data.CarsPoints;
                  this._CarsLevel= data.CarsLevel;
                  this._SportsPoints= data.SportsPoints;
                  this._SportsLevel= data.SportsLevel;
                  this.username = data.Username;
                  this.age = data.Age;
                  this.id = data.id;
                  this.password = data.Password;
                  this.fname= data.firstName;
                  this.ProfilePicture= data.ProfilePic;
                  this._quote= data.quote;
                  this._sports= data.sports;
                  this._movie= data.movie;
                  this._season= data.season;
                  this._song= data.song;
                  this._personality= data.personality;
                  this._education= data.education;
                  this.perks = data.perks;
                  
                  const userInfo = { //for local storage
                    points: this.points,
                    connections: this.connections,
                    level: this.level,
                    _GeneralPoints: this._GeneralPoints,
                    _GeneralLevel: this._GeneralLevel,
                    _MoviesPoints: this._MoviesPoints,
                    _MoviesLevel: this._MoviesLevel,
                    _CarsPoints: this._CarsPoints,
                    _CarsLevel: this._CarsLevel,
                    _SportsPoints: this._SportsPoints,
                    _SportsLevel: this._SportsLevel,
                    username: this.username,
                    age: this.age,
                    id: this.id,
                    password: this.password,
                    fname: this.fname,
                    ProfilePicture: this.ProfilePicture,
                    _quote: this._quote,
                    _sports: this._sports,
                    _movie: this._movie,
                    _season: this._season,
                    _song: this._song,
                    _personality: this._personality,
                    _education: this._education,
                    perks: this.perks
                  };
                  
                  localStorage.setItem('userInfo', JSON.stringify(userInfo));
                  console.log(JSON.parse(localStorage.getItem('userInfo') || '{}'));
                  /*this.utilService.userAccountInfo.emit(userInfo);*/

                  console.log('emitted data');
                },
                err => {
                  console.log("Something went wrong!!");
                }
              );
              
              
            }
          }
          
          if (authenticated) {
            document.getElementById("prompt").style.visibility = "hidden";
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 2000);

            
            
            
          }
          else{
            document.getElementById("prompt").style.visibility = "visible";
          }
        }
      },
      err => {
        console.log('something is wrong');
      }
    );
    
  }

  postRequest() {
    alert('Feedback recieved!');
    this.contactUs = {
      Name: this.name,
      Email: this.email,
      Comments: this.comment
    }
    this.name = "";
    this.email = "";
    this.comment = "";
    this.http.post('http://localhost:3000/api/UserRequests', this.contactUs).subscribe();
  }

  signup(username: string, _age: string, firstname:string, password: string, confirmPassword: string){
    if(password == confirmPassword){
      document.getElementById("PasswordPrompt").style.visibility = "hidden";
      var age = +_age;
      this.Signup = {
        Username: username,
        Password: password,
        firstName: firstname,
        Age: age,
        ProfilePic: '',
        Points: 0,
        Level: 0,
        Connections: 0,
        quote: '',
        sports: '',
        movie: '',
        season: '',
        song: '',
        personality: '',
        education: ''
      };
      this.http.post('http://localhost:3000/api/Accounts', this.Signup).subscribe();
      this.login(this.Signup.Username, this.Signup.Password);
    }
    else{
      document.getElementById('PasswordPrompt').style.visibility = "visible";
    }
  }

}

