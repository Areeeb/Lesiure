import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AccountResponse{
  Username: string,
  Password: string,
  FirstName: string,
  Age: number,
  ProfilePic: string,
  Points: number,
  Level: number,
  Connections: number
  Quote: string,
  Sports: string,
  Movie: string,
  Season: string,
  Song: string,
  Personality: string,
  Education: string
}

interface AccountData{ //to get account information and store it in local variables
  Username: string,
  Password: string,
  firstName: string,
  Age: number,
  ProfilePic: string,
  Points: number,
  Level: number,
  Connections: number,
  quote: string,
  sports: string,
  movie: string,
  season: string,
  song: string,
  personality: string,
  education: string,
  id: string
}

@Component({
  selector: 'app-admin-page-accounts',
  templateUrl: './admin-page-accounts.component.html',
  styleUrls: ['./admin-page-accounts.component.css']
})
export class AdminPageAccountsComponent implements OnInit {
  Accounts: AccountResponse[] = [];
  Account: AccountResponse;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    console.log('loading');
    this.http.get<AccountData>('http://localhost:3000/api/Accounts').subscribe(
      data => {
        for (var loop=0; loop< Object.keys(data).length; loop++){
          this.Account= {
            Username: data[loop].Username,
            Password: data[loop].Password,
            FirstName: data[loop].firstName,
            Age: data[loop].Age,
            Connections: data[loop].Connections,
            Education: data[loop].education,
            Level: data[loop].Level,
            Movie: data[loop].movie,
            Personality: data[loop].personality,
            Points: data[loop].Points,
            ProfilePic: '',
            Quote: data[loop].quote,
            Season: data[loop].season,
            Song: data[loop].song,
            Sports: data[loop].sports
          }
          if(data[loop].ProfilePic == ''){
            console.log('default pic');
            this.Account.ProfilePic= '../../assets/images/img_avatar2.png';
          }
          else{
            console.log('custom picture');
            this.Account.ProfilePic= data[loop].ProfilePic;
          }
          console.log('Account', this.Account);
          this.Accounts.push(this.Account);
        }
      },
      err => {
        console.log('something is wrong!');
      }
    );
    console.log('loaded');

  }

  Show_UserInfo(){
    
    
    if(document.getElementById("Info_").style.display=='none'){
      document.getElementById("Info_").style.display= 'block';
      document.getElementById("A_U").style.display= 'block';
      document.getElementById("A_D").style.display= 'none';
    }
    else{
      document.getElementById("Info_").style.display='none';
      document.getElementById("A_U").style.display='none';
      document.getElementById("A_D").style.display= 'block';		
    }
    
  }

  makeAdmin(username: string, password: string){
    const postAdmin = {
      Username: username,
      Password: password
    }
    
    this.http.post('http://localhost:3000/api/AdminAccounts', postAdmin).subscribe();
    console.log('Added as Admin');
  }

}
