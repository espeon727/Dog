import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { ImagePath} from '../../app/app.module';

import { Dogs } from '../../providers/Dogs';

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

	// private dogs;

	private dogs: Dogs = Dogs.getInstance();


  static get parameters()
  {
    return [[NavController]];
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, nav, private platform : Platform)
  {
  	this.nav = nav;

  }

	// loads the list of dogs from the database.
	// This function executes when the page is loaded. (this is a feature of Ionic)
  ionViewDidLoad()
  {

    this.platform.ready().then( () => 
    {
      this.dogs.readDatabase();
      var listOfDogs = this.dogs.getListOfDogs();
      //console.log("Dog list", this.dogs.getListOfDogs())
      for (var i = 0; i < this.dogs.getListOfDogs().length; i++)
      {
        var dog = listOfDogs[i];
        dog.updateStats();
      }
      console.log('Trying to Update Database');
      this.dogs.updateDatabase();
      console.log('ionViewDidLoad DogsPage');
    });
 
  }

	// returns the list of all available dogs from the Dogs provider.
  getDogs() {
		return this.dogs.getListOfDogs();


		// return this.dogs;

      // return [
      //   {"name": "Cerberus", "affection": 13, "fullness": 12, "hydration": 10, "cleanliness": 24, "icon": "../www/assets/images/000.png", "icon2": "../assets/images/000.png"},
      //   {"name": "Lucky", "affection": 5, "fullness": 16, "hydration": 28, "cleanliness": 2, "icon": "../www/assets/images/000.png", "icon2": "../assets/images/000.png"},
      //   {"name": "Spot", "affection": 1, "fullness": 0, "hydration": 12, "cleanliness": 13, "icon": "../www/assets/images/000.png", "icon2": "../assets/images/000.png"},

      // ];
  }

	// allows navigation to the Dog-Stats page when a dog is selected on this page.
  navigateDogStats(result)
  {
  	this.navCtrl.push(DogStatsPage, {dog: result});
  }

}
