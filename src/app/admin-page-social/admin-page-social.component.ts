import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface userResponse{
  userid: string,
  postText: string,
  likes: number,
  comments: number,
  shares: number,
  id: string,
  postImageUrl: string
}

interface PostInterface{
  ProfilePic: string
}

interface UserPost{
  caption: string,
  imageUrl: string,
  likes: number,
  comments: number,
  shares: number,
  userid: string,
  id: string,
  profilePicture: string
}

interface accountStore{
  id: string,
  ProfilePic: string
}

@Component({
  selector: 'app-admin-page-social',
  templateUrl: './admin-page-social.component.html',
  styleUrls: ['./admin-page-social.component.css']
})
export class AdminPageSocialComponent implements OnInit {
  public likes: number;
  public comments : number;
  public shares: number;
  public PostCaption: string;
  public PostUserID: string;
  public PostID : string;
  public postImage: string;
  public postProfilePic: string;

  account: accountStore[] = [];
  accountVar: accountStore;

  Postlist: UserPost[] = [];
  PostObject: UserPost;
  found: boolean =  false;

  post = {
    userid: '',
    postText: '',
    postImageUrl: '',
    likes: 0,
    comments: 0,
    shares: 0,
    id: ''
  };

  path: string;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<accountStore>('http://localhost:3000/api/Accounts').subscribe(
      data => {
        for(var loop=0; loop< Object.keys(data).length; loop++){
          this.accountVar = {
            id: data[loop].id,
            ProfilePic: data[loop].ProfilePic
          }
          
          this.account.push(this.accountVar);
          
        }
      },
      err => {
        console.log('something is wrong!!');
      }
    );

    this.http.get<userResponse>('http://localhost:3000/api/posts').subscribe(
      data => {

        for (var i = 0; i < Object.keys(data).length; i++) {
          this.PostCaption = data[i].postText;
          this.likes = data[i].likes;
          this.comments = data[i].comments;
          this.shares = data[i].shares;
          this.PostID = data[i].id;
          this.postImage = data[i].postImageUrl;
          this.PostUserID = data[i].userid;
          for(var loop=0; loop< Object.keys(this.account).length; loop++){
            if(this.account[loop].id == data[i].userid){
              this.postProfilePic = this.account[loop].ProfilePic;
              this.found= true;
            }
          }
          if(!this.found){
            this.postProfilePic = "../../assets/images/img_avatar2.png";
          }
          
          this.PostObject = {
            caption: this.PostCaption,
            likes: this.likes,
            comments: this.comments,
            shares: this.shares,
            userid: this.PostUserID,
            id: this.PostID,
            imageUrl: this.postImage,
            profilePicture: this.postProfilePic
          }
          this.Postlist.push(this.PostObject);
          //this.Postlist.push(this.PostCaption);
        }
      
      },
      err => {
        console.log('Something went wrong!!');
      }
    );
  }

  
  deletePost(Id: string, text: string, image: string, like: number, comment: number, share: number, user: string, dp: string){
    const deletePostPath = 'http://localhost:3000/api/posts/' + Id;
    this.http.get(deletePostPath).subscribe(
      data => {
        this.post = {
          userid: user,
          postText: text,
          postImageUrl: image,
          likes: like,
          comments: comment,
          shares: share,
          id: Id
        };
        console.log('delete post', this.post);
        this.http.delete(deletePostPath).subscribe();
      },
      err => {
        console.log('Something is wrong!!');
      }
    );
  }

}
