import { Injectable } from '@angular/core';
import { Hero } from './hero'
import { MessageService } from './message.service'
import { HEROES } from './mock-heroes'
import { Observable, of } from 'rxjs';

// class qui serre à gérer l'entité Hero
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  // asynchrone
  getHeroes(): Observable<Hero[]> {
    const Heroes = of(HEROES)
    this.messageService.add("job done")
    return Heroes
  }

  constructor(private messageService: MessageService) { }
}
