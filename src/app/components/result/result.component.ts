import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  query: string;
  genre: string;
  results;
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  async ngOnInit(): Promise<void> {
    this.genre = this.activatedRoute.snapshot.paramMap.get('genre');
    console.log(this.genre);
    this.query = this.activatedRoute.snapshot.paramMap.get('query');
    console.log(this.query);
    this.results = await this.http
      .get(`http://localhost:3000/result/${this.genre}/${this.query}`)
      .toPromise();
  }
}
