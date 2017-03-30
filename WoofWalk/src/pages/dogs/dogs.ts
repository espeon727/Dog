import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ImagePath, Dog } from '../../app/app.module';

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

	private imgPath: ImagePath = new ImagePath();

	private dogs;

  static get parameters() 
  {
    return [[NavController]];
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, nav) 
  {
  	this.nav = nav;
		
		this.dogs = [ new Dog("Cerberus", this.imgPath.getImagePath("000.png"), 13, 12, 10, 24),
								  new Dog("Lucky", this.imgPath.getImagePath("000.png"), 5, 16, 28, 2),
								  new Dog("Spot", this.imgPath.getImagePath("000.png"), 1, 0, 12, 13) ];
		for( var i = 0; i < this.dogs.length; i++) {
			console.log(this.dogs[i].getName() + " ID: " + this.dogs[i].getId());
		}
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad DogsPage');
  }

  getResults() {
		return this.dogs;

      // return [
      //   {"name": "Cerberus", "affection": 13, "fullness": 12, "hydration": 10, "cleanliness": 24, "icon": "../www/assets/images/000.png", "icon2": "../assets/images/000.png"},
      //   {"name": "Lucky", "affection": 5, "fullness": 16, "hydration": 28, "cleanliness": 2, "icon": "../www/assets/images/000.png", "icon2": "../assets/images/000.png"},
      //   {"name": "Spot", "affection": 1, "fullness": 0, "hydration": 12, "cleanliness": 13, "icon": "../www/assets/images/000.png", "icon2": "../assets/images/000.png"},
        
      // ];
  }

  navigateDogStats(result)
  {
  	this.navCtrl.push(DogStatsPage, {dog: result});
  }

}
