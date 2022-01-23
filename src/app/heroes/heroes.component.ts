import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero'
// import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service'
import { MessageService } from '../message.service';

@Component({
  selector: 'cpt-heroes', // le nom que l'on donne au composant pour l'appeler dans l'app
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  //On passe le service dans le constructeur, pour avoir son instance dans le composant
  constructor(private heroService: HeroService, public messageService: MessageService) { }

  //methode hook qui se lance à la création du composant
  ngOnInit(): void {
    this.getHeroes()
  }

  //on crée un tableau vide qui devra contenir des heros
  heroes:Hero[] =[]

  //methode utilisant le service de hero pour récupérer les datas
  getHeroes () {
    // On utililse subscribe car ca renvoie un observable donc du async. On passe une fonction qui permet d'attriber à this.heroes, la valeur attendue qui est en paramètre
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes)

  }

  // propriété qui est indéfinie et qui sera de type Hero
  selectedHero? : Hero

  onSelect(hero:Hero) {
    this.selectedHero = hero
    const hour: number = new Date().getHours()
    let minutes: number|string = new Date().getMinutes()
    if (minutes < 10) {
      minutes = '0' + minutes.toString()
    }
    this.messageService.add(`Vous avez sélectionné ${hero.name} à ${hour}H${minutes}`)
  }
}
