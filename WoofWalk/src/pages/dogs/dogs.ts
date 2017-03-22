import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DogStatsPage } from '../dog-stats/dog-stats';

/*
  Generated class for the Dogs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dogs',
  templateUrl: 'dogs.html'
})
export class DogsPage 
{
	private nav;
  private results;

  static get parameters() 
  {
    return [[NavController]];
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, nav) 
  {
  	this.nav = nav;
    this.results = this.getResults();
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad DogsPage');
  }

  getResults() {
      return [
        {"name": "Cerberus", "affection": 13, "fullness": 12, "hydration": 10, "cleanliness": 24, "icon": "../www/assets/images/bone_normal.png", "icon2": "../assets/images/000.png"},
        {"name": "Lucky", "affection": 5, "fullness": 16, "hydration": 28, "cleanliness": 2, "icon": "../www/assets/images/bone_normal.png", "icon2": "../assets/images/000.png"},
        {"name": "Spot", "affection": 1, "fullness": 0, "hydration": 12, "cleanliness": 13, "icon": "../www/assets/images/bone_normal.png", "icon2": "../assets/images/000.png"},
        
      ];
  }

  navigateDogStats(result)
  {
  	this.navCtrl.push(DogStatsPage, result);
  }

}
