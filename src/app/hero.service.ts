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
    this.messageService.add(`liste de héros récupérés`)
    return Heroes
  }

  getHero(id: number): Observable<Hero> {

    //je travaille sur un tableau donc j'utilise .find
    const hero = HEROES.find(h => h.id === id)!
    this.messageService.add(`info du héros à l'id ${id} OK`)

    //je retourne un observable de hero
    return of(hero)
  }
  constructor(private messageService: MessageService) { }
}
