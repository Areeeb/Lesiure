import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface NewsResponse{
  ArticleLink: String,
  ImageLink: String, 
  Content: string
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
public A: string;
public I: string;
public C: string;
NewsList: NewsResponse[] = [];
NewsObject: NewsResponse;



  constructor(private http: HttpClient) { }

  ngOnInit() : void{
    this.http.get<NewsResponse>('http://localhost:3000/api/News').subscribe(
      data => {
      for(var i=0; i < Object.keys(data).length; i++){
   this.A= data[i].ArticleLink;
   this.I=data[i].ImageLink;
   this.C= data[i].Content;
   this.NewsObject ={
     ArticleLink: this.A,
     ImageLink: this.I,
     Content: this.C
   }
   this.NewsList.push(this.NewsObject);
      }  
      },
      err=>{
        console.log("Something is wrong");
      }

    );
  }

}
