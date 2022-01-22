import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})


export class HeroDetailComponent implements OnInit {

  // équivalent aux props, j'imagine
  @Input() hero?: Hero

  constructor() { }

  ngOnInit(): void {
  }


}
