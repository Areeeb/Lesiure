import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilService } from '../util.service';
import { Router } from '@angular/router';

interface AccountResponse{
  Connections: number,
  Level: number,
  Points: number,
  Username: string,
  Password: string,
  id: number
}

interface userInterface{
  user: string
}

interface user{
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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  points : number;
  level : number;
  connections : number;
  username: string;
  password: string;
  elements: string;
  found : boolean = false;
  id : string;
  age: number;
  fname: string;
  ProfilePicture: string;
  _quote: string;
  _sports: string;
  _movie: string;
  _season: string;
  _song: string;
  _personality: string;
  _education: string;
  path : string = "";
  private userSub2: any;
  userVariable: userInterface;

  private userSub: any;
  userInfo: user;

  constructor(private http: HttpClient, private utilService: UtilService, private router: Router) { 
    console.log('Home component....');
    /*setTimeout(() => {
      
    }, 2000);*/
  }

  ngOnInit(): void {
    const _userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    console.log('Home component ngOnInit....', _userInfo);
    this.initUserInfo(_userInfo);
    console.log('data recieved', _userInfo);

    this.points = this.userInfo.points;
    this.level = this.userInfo.level;
    this.connections = this.userInfo.connections;
    this.id = this.userInfo.id;
    this.username = this.userInfo.username;
    this.age = this.userInfo.age
    this.fname= this.userInfo.fname;
    if(this.userInfo.ProfilePicture == ''){
      console.log('default pic');
      this.ProfilePicture = '../../assets/images/img_avatar2.png';
    }
    else{
      console.log('custom picture');
      this.ProfilePicture= this.userInfo.ProfilePicture;
    }
    this._quote= this.userInfo._quote;
    this._sports= this.userInfo._sports;
    this._movie= this.userInfo._movie;
    this._season= this.userInfo._season;
    this._song= this.userInfo._song;
    this._personality= this.userInfo._personality;
    this._education= this.userInfo._education;
    document.getElementById('social').style.color = 'yellow';

    if(this.level >= 1 && this.level <= 3){
      console.log('rookie');
      document.getElementById('bronze').style.display = 'block';
    }
    else if(this.level > 3 && this.level <= 6){
      console.log('contender');
      document.getElementById('silver').style.display = 'block';
    }
    else if(this.level > 6 && this.level <= 9){
      console.log('Intermediatte');
       document.getElementById('gold').style.display = 'block';
    }
    else if(this.level > 9){
      console.log('Expert');
      document.getElementById('platinum').style.display = 'block';
    }
    else{
      document.getElementById('novice').style.display = 'block';
    }
    
  }

  initUserInfo(data: any = {}) {
    this.userInfo = Object.assign({ level: 0, _GeneralPoints: 0, _GeneralLevel: 0, _MoviesPoints: 0, _MoviesLevel: 0, _CarsPoints: 0, _CarsLevel: 0, _SportsPoints: 0, _SportsLevel: 0, connections: 0, points: 0, username: '', age: 0, id: '', password: '', fname: '', ProfilePicture: '', _quote: '', _sports: '', _movie: '', _season: '', _song: '', _personality: '', _education: '', perks: 0 }, data);
  }

  NavigateToProfile(){
    setTimeout(() => {
      this.router.navigate(['/profile']);
    }, 2000);
  }

  logout(){
    
    localStorage.clear();
    console.log(JSON.parse(localStorage.getItem('userInfo') || '{}'));
  }

  toggleNews(){
    document.getElementById('news').style.color = 'yellow';
    document.getElementById('social').style.color = 'white';
    document.getElementById('social').style.color = 'white';
  }

  toggleSocial(){
    document.getElementById('social').style.color = 'yellow';
    document.getElementById('news').style.color = 'white';
    document.getElementById('game').style.color = 'white';
  }

  toggleGame(){
    document.getElementById('game').style.color = 'yellow';
    document.getElementById('news').style.color = 'white';
    document.getElementById('social').style.color = 'white';
  }

  ngOnDestroy() {
    //this.userSub.unsubscribe();
  }

}
