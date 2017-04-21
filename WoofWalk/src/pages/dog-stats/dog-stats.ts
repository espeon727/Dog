import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { ImagePath, Dog } from '../../app/app.module';

import { Dogs } from '../../providers/Dogs';

/*
  Generated class for the DogStats page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-dog-stats',
  templateUrl: 'dog-stats.html'
})
export class DogStatsPage {

	public dog: Dog;
	public imgPath: ImagePath = new ImagePath();

	public dogProvider: Dogs = Dogs.getInstance();


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController)
  {
		this.dog = navParams.get("dog");

  }

  ionViewDidLoad() : void {
    console.log('ionViewDidLoad DogStatsPage');
    //call update stats for the dog
  }

	getDog() : Dog {
		return this.dog;
	}

	getBarImage(stat: string) : string {
		var val;
		switch(stat) {
		case'affection':
			val = this.dog.getAffection();
			break;
		case'fullness':
			val = this.dog.getFullness();
			break;
		case'hydration':
			val = this.dog.getHydration();
			break;
		case'cleanliness':
			val = this.dog.getCleanliness();
			break;
		default:
			console.log("UNKNOWN ATTRIBUTE");
			return "000.png";
		}

		return this.imgPath.getImagePath("dog_stat_bars/" + stat + "_bars/" + stat + "_bar" + Math.floor(val/10) * 10 + ".png");
	}

  confirmSwitch()
  {
    var currentDog = this.dogProvider.getActiveDog();
    let confirm = this.alertCtrl.create({
      title: 'Switch active dog to ' + this.dog.getName() + '?',
      message: 'Current dog is ' + currentDog.getName(),
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
            this.changeActiveDog();
          }
        }
      ]
    });
    confirm.present()
  }

	changeActiveDog()
	{
		this.dogProvider.setActiveDog(this.getDog());
		console.log("Changed dog");
	}

  fastForward()
  {
    var dog = this.getDog();

    var affectionDate = dog.getAffectionTime();
    var fullnessDate = dog.getFullnessTime();
    var hydrationDate = dog.getHydrationTime();
    var cleanlinessDate = dog.getCleanlinessTime();

    affectionDate.setHours(affectionDate.getHours() - 1);
    fullnessDate.setHours(fullnessDate.getHours() - 1);
    hydrationDate.setHours(hydrationDate.getHours() - 1);
    cleanlinessDate.setHours(cleanlinessDate.getHours() - 1);

    dog.setAffectionTime(affectionDate);
    dog.setFullnessTime(fullnessDate);
    dog.setHydrationTime(hydrationDate);
    dog.setCleanlinessTime(cleanlinessDate);

    dog.updateStats();
    this.dogProvider.updateDatabase();
    var currentTime = new Date;

    dog.setAffectionTime(currentTime);
    dog.setFullnessTime(currentTime);
    dog.setHydrationTime(currentTime);
    dog.setCleanlinessTime(currentTime);

  }
}
