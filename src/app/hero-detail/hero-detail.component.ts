import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})


export class HeroDetailComponent implements OnInit {

  // équivalent aux props, j'imagine
  // @Input() hero?: Hero utilisé quand l'élément est fourni par le composant parent

  constructor(private activatedRoute: ActivatedRoute, private location: Location, private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHero()
  }

  hero?: Hero

  getHero() {
    //pour récupérer un paramètre de route
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'))

    //je récupérer l'obsevable du héros et j'y souscrit
    this.heroService.getHero(id).subscribe(hero => this.hero = hero)
  }

  goBack() {
    // permet de revenir a la page précédente
    this.location.back()
  }
}
