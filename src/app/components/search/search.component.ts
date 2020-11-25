import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimeDataBase, normaliseText } from '../../shared/anime.database'
import { Form } from '../../shared/form.model'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  form: FormGroup
  genre: string = 'anime'
  constructor(private fb: FormBuilder, private router: Router, private animeDataBase: AnimeDataBase) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: this.fb.control('',[Validators.required,Validators.minLength(3)]),
      // genre: this.fb.control(this.genre),
    })
  }
  setGenre(genre:string) {
    this.genre = genre
  }
  onSearch() {
    console.log('query', this.form.value)
    console.log('genre', this.genre)
    const query = normaliseText(this.form.get('title').value)
    // /result/genre/query
    this.router.navigate(['/result',this.genre,query])
  }
  
  async onSave() {
    const searchData: Form = this.form.value as Form
    searchData.genre = this.genre
    console.log('save', searchData)
    await this.animeDataBase.addSearch(searchData)
    this.onSearch()
  }
  navigate() {
    this.router.navigate(['/searchlist'])
  }

} 
