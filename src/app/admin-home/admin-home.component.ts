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
  Connections: 0,
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
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  loginData = {
    Username: '',
    Password: ''
  }

  id: string;
  username: string;
  password: string;
  
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
    this.http.get<loginInterface>('http://localhost:3000/api/AdminAccounts').subscribe(
      data => {
        if(Object.keys(data).length == 0){
          document.getElementById("prompt").style.visibility = "visible";
        }
        for(var loop=0; loop < Object.keys(data).length; loop++){
          if(this.loginData.Username == data[loop].Username){
            if(this.loginData.Password == data[loop].Password){
              authenticated = true;
              this.id = data[loop].id;
              const userInfo = { //for local storage
                username: data[loop].Username,
                id: this.id,
                password: data[loop].Password,
              };
              
              localStorage.setItem('userInfo', JSON.stringify(userInfo));
              console.log(JSON.parse(localStorage.getItem('userInfo') || '{}'));
            }
          }
          
          if (authenticated) {
            document.getElementById("prompt").style.visibility = "hidden";
            setTimeout(() => {
              this.router.navigate(['/admin/home']);
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

}
