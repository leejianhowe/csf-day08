import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dexie } from 'dexie';
import { Form } from './form.model';

export const normaliseText = (text: string) => {
  return text.trim().toLowerCase();
};

@Injectable()
export class AnimeDataBase extends Dexie {
  private search: Dexie.Table<Form, number>;
  constructor(private http: HttpClient) {
    // super call for extends Dexie name of db is searchDB
    super('searchDB');
    //setup schema for v1
    this.version(1).stores({
      //table name is search with pri key as auto-increment id
      // index the title for easy referencing infuture
      search: '++id,title',
    });
    // this.search refer to the table
    this.search = this.table('search');
  }

  async addSearch(searchData: Form): Promise<any> {
    // remove the whitespace at either end of the string and conver to lowercase
    // easy for future use
    searchData.title = normaliseText(searchData.title);
    const found = await this.search
      .where('title')
      .equals(searchData.title)
      .and((ele) => ele.genre == searchData.genre)
      .count();
    if (found <= 0)
      // dont need to await here
      // as this put() returns a promise not need to resolve or reject
      return this.search.put(searchData);
  }
  // why dont need promise async and await
  // function returns a promise
  getSearchList(): Promise<Form[]> {
      return this.search.toArray();
  }

  deleteSearch(index): Promise<any> {
    return this.search.delete(index)
  }
}
