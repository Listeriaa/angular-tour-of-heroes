import { Injectable } from '@angular/core';
import { Hero } from './hero'
import { MessageService } from './message.service'
import { HEROES } from './mock-heroes'
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

// class qui serre à gérer l'entité Hero
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */

  // On met un type T car il y a plusieurs types que cette fonction peut retourner
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private heroesUrl = "/api/heroes"

  // // asynchrone avec un fetch sur des data en dur
  // getHeroes(): Observable<Hero[]> {

  //   const Heroes = of(HEROES)
  //   this.messageService.add(`liste de héros récupérés`)
  //   return Heroes
  // }


  // asynchrone avec le of (qui renvoie un observable) ou le get
  //on doit préciser pour le get l'interface de ce qui est renvoyé
  getHeroes(): Observable<Hero[]> {

    const Heroes = this.http.get<Hero[]>(this.heroesUrl)
    this.log(`liste de héros récupérés`)
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),

      catchError(this.handleError('getHeroes', [])))
  }

  getHero(id : number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`
    return this.http.get<Hero>(url)
    .pipe(
      tap(_ => this.log(`hero id ${id}`)), //tap permet de faire une action à chaque response mais sans toucher a la value
      catchError(this.handleError<Hero>('getHero')))

  }

  update(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
    .pipe(
      tap(_ => this.log(`hero modifié ${hero.id}`)),
      catchError(this.handleError<any>('update')))


  }

  addHero(hero : Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
    .pipe(
      tap((newHero: Hero) => this.log(`nouveau héros à l'id ${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  }

  deleteHero(hero : Hero) : Observable<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`
    return this.http.delete<Hero>(url, this.httpOptions)
    .pipe(
      tap(_ => this.log(`héros ${hero.id}bien supprimé`)),
      catchError(this.handleError<Hero>('deleteHero'))
    )
  }
  // getHero(id: number): Observable<Hero> {

  //   //je travaille sur un tableau donc j'utilise .find
  //   const hero = HEROES.find(h => h.id === id)!
  //   this.log(`get hero de l'${id} OK`)
  //   //je retourne un observable de hero
  //   return of(hero)
  // }
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  constructor(private messageService: MessageService, private http: HttpClient) { }
}
