import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Result } from 'src/app/shared/form.model';
import { NgNavigatorShareService } from 'ng-navigator-share';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  query: string;
  genre: string;
  // for backend server method
  // results;

  // for httpclient method
  results: Result[];

  // webshare
  // to share in PWA mobile application
  canShare: boolean = false

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private webShare: NgNavigatorShareService,
  ) {}
  // for backend method
  // async ngOnInit(): Promise<void> {
  
  // for httpclient method
  ngOnInit(): void {
    // check if the client is desktop browser or mobile
    // if true display image
    this.canShare = this.webShare.canShare()
    
    this.genre = this.activatedRoute.snapshot.paramMap.get('genre');
    console.log(this.genre);
    this.query = this.activatedRoute.snapshot.paramMap.get('query');
    console.log(this.query);

    // call to server index.js
    // this.results = await this.http
    //   .get(`http://localhost:3000/result/${this.genre}/${this.query}`)
    //   .toPromise();

    // use http client and HttpParams to construct search query
    const url = `https://api.jikan.moe/v3/search/${this.genre}`;
    const params = new HttpParams().set('q', this.query).set('limit','20').set('rated','pg-13');
    console.log('params', params);
    this.http
      .get<any>(url, { params: params })
      .toPromise()
      .then((response) => {
        const targetResults = response.results as any[]
        this.results = targetResults.map(ele => {
          return {
            image_url: ele.image_url,
            title: ele.title,
            synopsis: ele.synopsis,
            url: ele.url
            // cast object as interface Result
          } as Result
        })
        console.log(this.results)
      });
  }
  shareItem(index: number) {
    this.webShare.share({
      title: this.results[index].title,
      text: this.results[index].synopsis,
      url: this.results[index].url
    })
    
  }
}
