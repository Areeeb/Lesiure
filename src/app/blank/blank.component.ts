import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface user {
  connections: number,
  level: number,
  points: number,
  username: string,
  age: number,
  id: string,
  password: string
}

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.css']
})
export class BlankComponent implements OnInit {
  userInfo: user;

  constructor(private router: Router) { }

  ngOnInit() {
    const _userInfo = JSON.parse(localStorage.getItem('userInfo' || '{}')) ;
    this.initUserInfo(_userInfo);
    console.log(this.userInfo); 

    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1000);
  }

  initUserInfo(data: any = {}){
    this.userInfo = Object.assign({connections: 0, level: 0, points: 0, username: '', age: 0, id: '', password: ''}, data);
  }

}
