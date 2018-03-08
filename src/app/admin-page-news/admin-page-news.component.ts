import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface NewsResponse{
  ArticleLink: String,
  ImageLink: String, 
  Content: string,
  id: string
}

@Component({
  selector: 'app-admin-page-news',
  templateUrl: './admin-page-news.component.html',
  styleUrls: ['./admin-page-news.component.css']
})
export class AdminPageNewsComponent implements OnInit {
  public A: string;
  public I: string;
  public C: string;
  public Id: string;
  NewsList: NewsResponse[] = [];
  NewsObject: NewsResponse;

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.http.get<NewsResponse>('http://localhost:3000/api/News').subscribe(
      data => {
      for(var i=0; i < Object.keys(data).length; i++){
   this.A= data[i].ArticleLink;
   this.I=data[i].ImageLink;
   this.C= data[i].Content;
   this.Id = data[i].id;
   this.NewsObject ={
     ArticleLink: this.A,
     ImageLink: this.I,
     Content: this.C,
     id: this.Id
   }
   this.NewsList.push(this.NewsObject);
      }  
      },
      err=>{
        console.log("Something is wrong");
      }

    );
  }

  deleteNews(id: string){
    const newsPath = 'http://localhost:3000/api/News/' + id;
    console.log(id);
    this.http.delete(newsPath).subscribe();
  }

}
