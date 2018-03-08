import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AccountResponse{
  Connections: number,
  Level: number,
  Points: number,
  Username: string,
  Password: string,
  id: number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  ngOnInit() : void {
    
  }

}