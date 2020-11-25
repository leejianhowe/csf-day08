import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimeDataBase } from '../..//shared/anime.database';
import { Form } from '../../shared/form.model';
@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.css'],
})
export class SearchListComponent implements OnInit {
  searchList: Form[];
  constructor(private router: Router, private animeDatabase: AnimeDataBase) {}

  ngOnInit(): void {
    this.getList()
      
  }

  navigate() {
    this.router.navigate(['/search']);
  }

  onDelete(index) {
    console.log(index)
    this.animeDatabase.deleteSearch(index)
    this.getList()
  }

  getList() {
    this.animeDatabase.getSearchList().then(ele => {
      return this.searchList = ele
    })
  }
}
