import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilService } from '../util.service';
import { Router } from '@angular/router';

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
  _education: string
  
}

interface password{
  Password: string
}

interface UserPost{
  caption: string,
  imageUrl: string,
  likes: number,
  comments: number,
  shares: number,
  userid: string,
  id: string
  profilePicture: string
}

interface userResponse{
  userid: string,
  postText: string,
  likes: number,
  comments: number,
  shares: number,
  id: string,
  postImageUrl: string,

}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  Username: string;
  quote: string = "";
  Firstname: string;
  level: number;
  points: number;
  connections: number;
  sports: string = "";
  movie: string = "";
  season: string = "";
  song: string = "";
  personality: string = "";
  education: string = "";
  profilePic: string;
  Id: string;
  pw: string;
  EnteredPassword: string = "";
  newPassword: string;
  confirmPassword: string;

  PostCaption: string = undefined;
  likes: number;
  comments: number;
  shares: number;
  PostUserID: string;
  PostID: string;
  public postImage: string;
  public url = "../../assets/posts/";
  public file: string = undefined;

  userInfo: user;

  Postlist: UserPost[] = [];
  PostObject: UserPost;
  myID: string;

  path: string;
  userPost = {
    userid: '',
    postText: '',
    likes: 0,
    comments: 0,
    shares: 0,
    postImageUrl: ''
  };
  postPut = {
    userid: '',
    postText: '',
    postImageUrl: '',
    likes: 0,
    comments: 0,
    shares: 0,
    id: ''
  };
  AccountUpdate = {
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
    education: '',
    id: ''
  }

  constructor(private http: HttpClient, private utilService: UtilService, private router: Router) { }

  ngOnInit() {
    const _userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    this.initUserInfo(_userInfo);
    console.log('Profile recieved', this.userInfo);
    this.Username = this.userInfo.username;
    this.level = this.userInfo.level;
    this.points = this.userInfo.points;
    this.connections = this.userInfo.connections;
    this.quote = this.userInfo._quote;
    this.Firstname= this.userInfo.fname;
    this.sports= this.userInfo._sports;
    this.movie= this.userInfo._movie;
    this.season = this.userInfo._season;
    this.song = this.userInfo._song;
    this.personality= this.userInfo._personality;
    this.education= this.userInfo._education;
    if(this.userInfo.ProfilePicture == ''){
      this.profilePic = "../../assets/images/img_avatar2.png";
    }
    else{
      console.log('new pic');
      this.profilePic = this.userInfo.ProfilePicture;
      console.log('profile pic', this.profilePic);
    }


    this.path = "http://localhost:3000/api/posts";
    this.http.get<userResponse>(this.path).subscribe(
      data => {
        this.myID = this.userInfo.id;
        for(var loop=Object.keys(data).length-1; loop >= 0  ; loop--){
          if(data[loop].userid == this.userInfo.id){    
            console.log('compared ' + data[loop].userid + ' ' + this.userInfo.id);
            this.PostCaption = data[loop].postText;
            this.likes = data[loop].likes;
            this.comments = data[loop].comments;
            this.shares = data[loop].shares;
            this.PostUserID = data[loop].userid;
            this.PostID = data[loop].id;
            this.postImage = data[loop].postImageUrl;
            this.PostObject = {
              caption: this.PostCaption,
              likes: this.likes,
              comments: this.comments,
              shares: this.shares,
              userid: this.PostUserID,
              id: this.PostID,
              imageUrl: this.postImage,
              profilePicture: this.profilePic
            }
            console.log('posting ', this.PostObject);
            this.Postlist.push(this.PostObject);
            
          }
        }
      },
      err => {
        console.log('something is wrong!!');
      }
    );
  }

  initUserInfo(data: any = {}) {
    console.log(data);
    this.userInfo = Object.assign({ level: 0, _GeneralPoints: 0, _GeneralLevel: 0, _MoviesPoints: 0, _MoviesLevel: 0, _CarsPoints: 0, _CarsLevel: 0, _SportsPoints: 0, _SportsLevel: 0, connections: 0, points: 0, username: '', age: 0, id: '', password: '', fname: '', ProfilePicture: '', _quote: '', _sports: '', _movie: '', _season: '', _song: '', _personality: '', _education: '' }, data);
    
    console.log(this.userInfo);
  }

  change_password(){
    this.Id = this.userInfo.id;
    this.path = 'http://localhost:3000/api/Accounts/' + this.Id;
    this.http.get<password>(this.path).subscribe(
      data => {
        this.pw = data.Password;
      },
      err => {
        console.log('something is wrong!!');
      }
    );
    this.display();
  }

  display(){
    if(document.getElementById('confirmPasswordButton').style.display == 'none'){
      document.getElementById('confirmPasswordButton').style.display = 'block';
    }
    else{
      document.getElementById('confirmPasswordButton').style.display = 'none';
    }
  }

  enter(){
    document.getElementById('wrongPrompt').style.display = 'none';
    if(this.EnteredPassword == this.pw){
      document.getElementById('wrongPrompt').style.display = 'none';
      document.getElementById('CN_1').style.display = 'block';
      document.getElementById('CN_2').style.display = 'block';
      document.getElementById('done').style.display = 'block';
    }
    else{
      document.getElementById('wrongPrompt').style.display = 'none';
      document.getElementById('wrongPrompt').style.display = 'block';
    }
  }

  done(){
    document.getElementById('passwordMismatch').style.display = 'none';
    if(this.newPassword == this.confirmPassword){
      document.getElementById('passwordMismatch').style.display = 'none';
      this.Id = this.userInfo.id;
      
      this.AccountUpdate = {
        Username: this.userInfo.username,
        Password: this.confirmPassword,
        firstName: this.userInfo.fname,
        Age: this.userInfo.age,
        ProfilePic: this.userInfo.ProfilePicture,
        Points: this.userInfo.points,
        Level: this.userInfo.level,
        Connections: this.userInfo.connections,
        quote: this.userInfo._quote,
        sports: this.userInfo._sports,
        movie: this.userInfo._movie,
        season: this.userInfo._season,
        song: this.userInfo._song,
        personality: this.userInfo._personality,
        education: this.userInfo._education,
        id: this.userInfo.id
      }
      console.log(this.AccountUpdate);
      console.log(this.Id);
      this.path = 'http://localhost:3000/api/Accounts/' + this.Id;
      this.http.put(this.path, this.AccountUpdate).subscribe();
      document.getElementById('passwordMismatch').style.display = 'none';
      document.getElementById('passwordMatch').style.display = 'block';

      setTimeout(() => {
        this.router.navigate(['/blank']);
      }, 1000);
    }
    else{
      document.getElementById('passwordMismatch').style.display = 'none';
      document.getElementById('passwordMismatch').style.display = 'block';
    }
  }

  fileEvent(fileInput: any){
    console.log(this.userInfo.id);
    let file = fileInput.target.files;
    let fileLength = fileInput.target.files.length
    for(var loop=0; loop< fileLength; loop++){
      this.file = this.url + file[loop].name;
    }
    this.AccountUpdate = {
      Username: this.userInfo.username,
      Password: this.userInfo.password,
      firstName: this.userInfo.fname,
      Age: this.userInfo.age,
      ProfilePic: this.file,
      Points: this.userInfo.points,
      Level: this.userInfo.level,
      Connections: this.userInfo.connections,
      quote: this.userInfo._quote,
      sports: this.userInfo._sports,
      movie: this.userInfo._movie,
      season: this.userInfo._season,
      song: this.userInfo._song,
      personality: this.userInfo._personality,
      education: this.userInfo._education,
      id: this.userInfo.id
    }
    this.http.put('http://localhost:3000/api/Accounts',this.AccountUpdate).subscribe();
    const userInfo = { //for local storage
      points: this.points,
      connections: this.AccountUpdate.Connections,
      level: this.AccountUpdate.Level,
      username: this.AccountUpdate.Username,
      age: this.AccountUpdate.Age,
      id: this.AccountUpdate.id,
      password: this.AccountUpdate.Password,
      fname: this.AccountUpdate.firstName,
      ProfilePicture: this.AccountUpdate.ProfilePic,
      _quote: this.AccountUpdate.quote,
      _sports: this.AccountUpdate.sports,
      _movie: this.AccountUpdate.movie,
      _season: this.AccountUpdate.season,
      _song: this.AccountUpdate.song,
      _personality: this.AccountUpdate.personality,
      _education: this.AccountUpdate.education
    };
    localStorage.clear();
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    console.log(JSON.parse(localStorage.getItem('userInfo') || '{}'));
    setTimeout(() => {
      this.router.navigate(['/profile']);
    }, 2000);
  }

  LikeReaction(object: any, caption: string, postUrl: string, Likes: number, Comments: number, Shares: number, Userid: string, Id: string){
    object.style.border = "5px solid yellow";
    //Likes = Likes + 1;
    this.postPut = {
      userid: Userid,
      postText: caption,
      postImageUrl: postUrl,
      likes: Likes,
      comments: Comments,
      shares: Shares,
      id: Id
    };
    //console.log('put request',this.postPut);
    this.http.put('http://localhost:3000/api/posts',Object.assign({}, this.postPut, { likes : Likes + 1})).subscribe(res => {
      console.log('res', res);
    });
    console.log('put request',this.postPut);
  }

  CommentReaction(object: any, caption: string, postUrl: string, Likes: number, Comments: number, Shares: number, Userid: string, Id: string){
    object.style.border = "5px solid yellow";
    //Comments = Comments + 1;
    this.postPut = {
      userid: Userid,
      postText: caption,
      postImageUrl: postUrl,
      likes: Likes,
      comments: Comments,
      shares: Shares,
      id: Id
    };
    //console.log('put request',this.postPut);
    this.http.put('http://localhost:3000/api/posts',Object.assign({}, this.postPut, { comments : Comments + 1})).subscribe(res => {
      console.log('res', res);
    });
    console.log('put request',this.postPut);
  }

  ShareReaction(object: any, caption: string, postUrl: string, Likes: number, Comments: number, Shares: number, Userid: string, Id: string){
    object.style.border = "5px solid yellow";
    // Shares = Shares + 1;
    this.postPut = {
      userid: Userid,
      postText: caption,
      postImageUrl: postUrl,
      likes: Likes,
      comments: Comments,
      shares: Shares,
      id: Id
    };
    //console.log('put request',this.postPut);
    this.http.put('http://localhost:3000/api/posts', Object.assign({}, this.postPut, { shares: Shares + 1})).subscribe(res => {
      console.log('res', res);
    });
    console.log('put request',this.postPut);

    this.userPost = {
      userid: this.myID,
      postText: caption,
      postImageUrl: postUrl,
      likes: 0,
      comments: 0,
      shares: 0
    }
    this.http.post('http://localhost:3000/api/posts', this.userPost).subscribe();
    console.log('shared!');
  }

  ApplyChanges(){
    this.AccountUpdate = {
      Username: this.Username,
      Password: this.userInfo.password,
      firstName: this.Firstname,
      Age: this.userInfo.age,
      ProfilePic: this.userInfo.ProfilePicture,
      Points: this.points,
      Level: this.level,
      Connections: this.connections,
      quote: this.quote,
      sports: this.sports,
      movie: this.movie,
      season: this.season,
      song: this.song,
      personality: this.personality,
      education: this.education,
      id: this.userInfo.id
    }
    this.http.put('http://localhost:3000/api/Accounts', this.AccountUpdate).subscribe();
    const userInfo = { //for local storage
      points: this.AccountUpdate.Points,
      connections: this.AccountUpdate.Connections,
      level: this.AccountUpdate.Level,
      username: this.AccountUpdate.Username,
      age: this.AccountUpdate.Age,
      id: this.AccountUpdate.id,
      password: this.AccountUpdate.Password,
      fname: this.AccountUpdate.firstName,
      ProfilePicture: this.AccountUpdate.ProfilePic,
      _quote: this.AccountUpdate.quote,
      _sports: this.AccountUpdate.sports,
      _movie: this.AccountUpdate.movie,
      _season: this.AccountUpdate.season,
      _song: this.AccountUpdate.song,
      _personality: this.AccountUpdate.personality,
      _education: this.AccountUpdate.education
    };
    localStorage.clear();
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    console.log(JSON.parse(localStorage.getItem('userInfo') || '{}'));
    setTimeout(() => {
      this.router.navigate(['/profile']);
    }, 2000);
  }

  ngOnDestroy(){

  }

}
