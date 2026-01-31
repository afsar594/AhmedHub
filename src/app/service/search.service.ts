// src/app/service/search.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  // 1️⃣ BehaviorSubject to store current search value
  private searchTextSource = new BehaviorSubject<string>(''); 

  // 2️⃣ Observable that other components can subscribe to
  searchText$ = this.searchTextSource.asObservable();          

  // 3️⃣ Method to update search value
  setSearchText(text: string) {
    this.searchTextSource.next(text);
  }
}
