import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { UtilService } from '../util.service';
import { Router } from '@angular/router';

interface userResponse{
  userid: string,
  postText: string,
  likes: number,
  comments: number,
  shares: number,
  id: string,
  postImageUrl: string
}

interface UserAccounts{
  id: string,
  Level: number,
  ProfilePic: string,
  firstName: string
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

interface userPut {
  Username: string,
  Password: string,
  firstName: string,
  Age: number,
  ProfilePic: string,
  Points: number,
  Level: number,
  GeneralPoints: number,
  GeneralLevel: number,
  MoviesPoints: number,
  MoviesLevel: number,
  CarsPoints: number,
  CarsLevel: number,
  SportsPoints: number,
  SportsLevel: number,
  Connections: number,
  quote: string,
  sports: string,
  movie: string,
  season: string,
  song: string,
  personality: string,
  education: string,
  id: string,
  perks: number
}

interface UserPost{
  caption: string,
  imageUrl: string,
  likes: number,
  comments: number,
  shares: number,
  userid: string,
  id: string,
  profilePicture: string,
  username: string
}

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css'],
  inputs: ['id']
})
export class SocialComponent implements OnInit, OnDestroy {
  
  
  public likes: number;
  public comments : number;
  public shares: number;
  public PostCaption: string;
  public PostUserID: string;
  public PostID : string;
  public postImage: string;
  public postProfilePic: string;
  public userAccountsVariable: UserAccounts;
  public url = "../../assets/posts/";
  public file: string = undefined;
  public path: string;
  public perks: number;
  public nextLevel: number;
  username: string;
  Postlist: UserPost[] = [];
  PostObject: UserPost;
  TextPost: string = undefined;
  myID: string;
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
  private userSub: any;
  userInfo: user;
  points: number;
  userUpdate: userPut;

  userOwnPosts: userResponse;

  ShareButton: string = "Share Post";
  
  
  constructor(private http: HttpClient, private utilService: UtilService, private router: Router) {
    
  }

  ngOnInit(): void {
    
    const _userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    this.initUserInfo(_userInfo);
    console.log('Social recieved', this.userInfo);
    if(Math.floor(this.userInfo.level) % 2  == 0){
      this.nextLevel = Math.floor(this.userInfo.level) + 2;
    }
    else{
      this.nextLevel = Math.floor(this.userInfo.level) + 1;
    }

    /*this.initUserInfo();
    this.userSub = this.utilService.userAccountInfo.subscribe(data => {
      this.initUserInfo(data);
      console.log('data', data);
      */
      this.http.get<UserAccounts>('http://localhost:3000/api/Accounts').subscribe(
        data => {
          this.userAccountsVariable = data;
          this.myID = this.userInfo.id;
          console.log('userAccountVariable ', this.userAccountsVariable);
          this.http.get<userResponse>('http://localhost:3000/api/posts').subscribe(
            data => {
              for(var i=Object.keys(data).length-1; i >= 0 ; i--){
                this.PostUserID = data[i].userid; //store the id of post owner
                
                  var loopStartValue = Object.keys(this.userAccountsVariable).length;
                  for(var loop=loopStartValue-1; loop >= 0; loop--){
                    if(this.userAccountsVariable[loop].id === this.PostUserID){ //check if this account's id is equal to post owner id
                      if(this.userAccountsVariable[loop].Level <= this.userInfo.level){ // check if the account's level is less than user's level
                        this.PostCaption = data[i].postText;
                        this.likes = data[i].likes;
                        this.comments = data[i].comments;
                        this.shares = data[i].shares;
                        this.PostUserID = data[i].userid;
                        this.PostID = data[i].id;
                        this.postImage = data[i].postImageUrl;
                        if(this.userAccountsVariable[loop].ProfilePic == ''){
                          this.postProfilePic = "../../assets/images/img_avatar2.png";
                          this.username = this.userAccountsVariable[loop].firstName;
                        }
                        else{
                          this.postProfilePic = this.userAccountsVariable[loop].ProfilePic;
                          this.username = this.userAccountsVariable[loop].firstName;
                        }
                        
                        this.PostObject = {
                          caption: this.PostCaption,
                          likes: this.likes,
                          comments: this.comments,
                          shares: this.shares,
                          userid: this.PostUserID,
                          id: this.PostID,
                          imageUrl: this.postImage ,
                          profilePicture: this.postProfilePic,
                          username: this.username
                        }
                        this.Postlist.push(this.PostObject);
                        //this.Postlist.push(this.PostCaption);
                      }
                    }
                  }
                
                
                
              }
            },
            err => {
              console.log('Something went wrong!!');
            }
          );
        },
        err => {
          console.log('Something is wrong!!');
        }
      );
      
      

    /*});*/
    
    
  }

  initUserInfo(data: any = {}) {
    console.log(data);
    this.userInfo = Object.assign({ level: 0, _GeneralPoints: 0, _GeneralLevel: 0, _MoviesPoints: 0, _MoviesLevel: 0, _CarsPoints: 0, _CarsLevel: 0, _SportsPoints: 0, _SportsLevel: 0, connections: 0, points: 0, username: '', age: 0, id: '', password: '', fname: '', ProfilePicture: '', _quote: '', _sports: '', _movie: '', _season: '', _song: '', _personality: '', _education: '', perks: 0 }, data);
    
    console.log(this.userInfo);
  }

  postData() : void{
    console.log('textpost', this.TextPost);
    this.userPost = {
      userid: this.userInfo.id,
      postText: this.TextPost,
      likes: 0,
      comments: 0,
      shares: 0,
      postImageUrl: this.file
    };
    this.http.post('http://localhost:3000/api/posts',this.userPost).subscribe((res)=>  {
      console.log('response', res);
    });
    

    this.changeText();

  }

  changeText(){
    this.ShareButton = 'Posted';
    setTimeout(() => {
      
      document.getElementById('id01').style.display = 'none';
      this.ShareButton = 'SharePost';
      this.router.navigate(['/blank']);
    }, 3000);


  }

  updatePoints(){
    this.http.get<userResponse>('http://localhost:3000/api/posts').subscribe(
      data => {
        for(var loop=0; loop< Object.keys(data).length; loop++){

          if(data[loop].userid == this.userInfo.id){
            this.userOwnPosts = {
              userid: data[loop].userid,
              postText: data[loop].postText,
              likes: data[loop].likes,
              comments: data[loop].comments,
              shares: data[loop].shares,
              id: data[loop].id,
              postImageUrl: data[loop].postImageUrl
            }
          }
        }

        if(Object.keys(this.userOwnPosts).length % 5 == 0){
          this.perks = this.userInfo.perks;
          const value = (this.userInfo.points + 1) / 20;
          if(Math.floor(value) > this.nextLevel){
            this.perks = this.perks + 2;
          }

          this.userUpdate = {
            Username: this.userInfo.username,
            Password: this.userInfo.password,
            firstName: this.userInfo.fname,
            Age: this.userInfo.age,
            ProfilePic: this.userInfo.ProfilePicture,
            Points: this.userInfo.points + 1,
            Level: (this.userInfo.points + 1) / 20,
            GeneralPoints: this.userInfo._GeneralPoints,
            GeneralLevel: this.userInfo._GeneralLevel,
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
        }

        this.post();
      },
      err => {
        console.log('something is wrong!');
      }
    );
  }

  post(){
    this.http.put('http://localhost:3000/api/Accounts', this.userUpdate);
  }

  fileEvent(fileInput: any){
    let file = fileInput.target.files;
    let fileLength = fileInput.target.files.length
    for(var loop=0; loop< fileLength; loop++){
      this.file = this.url + file[loop].name;
    }
  }

  LikeReaction(object: any, caption: string, postUrl: string, Likes: number, Comments: number, Shares: number, Userid: string, Id: string){
    object.style.border = "5px solid yellow";
    //Likes = Likes + 1;
    object.likes = object.likes+1;
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
    Likes = Likes + 1;
    console.log('put request',this.postPut);
    if(Likes % 5 == 0){
      console.log('Like reached!');
      this.pointsIncrement(Likes, Userid);
    }

  }

  pointsIncrement(num: number, user: string){
    this.path = 'http://localhost:3000/api/Accounts/' + user;
    this.http.get<userPut>(this.path).subscribe(
      data => {
        console.log(data);
        this.perks = data.perks;
        if(Math.floor(data.Level / 20) > this.nextLevel){
          this.perks = this.perks + 2;
        }

        this.userUpdate = {
            Username: data.Username,
            Password: data.Password,
            firstName: data.firstName,
            Age: data.Age,
            ProfilePic: data.ProfilePic,
            Points: data.Points+ 1,
            Level: (data.Points+ 1) / 20,
            GeneralPoints: data.GeneralPoints,
            GeneralLevel: data.GeneralLevel,
            MoviesPoints: data.MoviesPoints,
            MoviesLevel: data.MoviesLevel,
            CarsPoints: data.CarsPoints,
            CarsLevel: data.CarsLevel,
            SportsPoints: data.SportsPoints,
            SportsLevel: data.SportsLevel,
            Connections: data.Connections,
            quote: data.quote,
            sports: data.sports,
            movie: data.movie,
            season: data.season,
            song: data.song,
            personality: data.personality,
            education: data.education,
            id: data.id,
            perks: this.perks
        }
        this.putData(this.userUpdate);
      },
      err => {
        console.log('something is wrong!');
      }
    );
    
  }

  putData(postUser: any){
    console.log('user update', postUser);
    this.http.put('http://localhost:3000/api/Accounts', postUser).subscribe();
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
  }

  ngOnDestroy() {
    //this.userSub.unsubscribe();
  }

}