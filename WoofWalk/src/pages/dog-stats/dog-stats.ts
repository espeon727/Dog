import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ImagePath, Dog } from '../../app/app.module';

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

  public chartLabels:string[] = ['Affection', 'Fullness', 'Hydration', 'Cleanliness'];
  public chartData:any;
  public barChartOptions:any = {
    scales: {
      xAxes: [{
        display:false,
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 100,
        },
        gridLines: {
          display:true
        }
      }],
      yAxes: [{
        gridLines: {
          display:false
        }
      }]
    },
    legend: {
      display: false
    }
  }
  public barChartType:string = 'horizontalBar';

  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
		this.dog = navParams.get("dog");

		this.updateChart();
		console.log(this.getAffectionBarImage());
  }

  ionViewDidLoad() : void {
    console.log('ionViewDidLoad DogStatsPage');
  }

	updateChart() : void {
		this.chartData = [{
			label: "",
			data: [ 
				this.dog.getAffection(),
				this.dog.getFullness(),
				this.dog.getHydration(),
				this.dog.getCleanliness()
			]
		}];
	}

	getDog() : Dog {
		return this.dog;
	}

	changeStats() : void {
		this.dog.setAffection(50);
		this.dog.setFullness(84);
		this.dog.setHydration(31);
		this.dog.setCleanliness(100);

		this.updateChart();
	}

	getAffectionBarImage() : string {
		return this.imgPath.getImagePath("dog_stat_bars/affection_bars/affection_bar" + Math.floor(this.dog.getAffection()/10) + ".png");
	}

	getBarImage(stat: string) : string {
		var val;
		switch(stat) {
		case'affection':
			val = this.dog.getAffection();
			break;
		case'hunger':
			val = this.dog.getFullness();
			break;
		case'thirst':
			val = this.dog.getHydration();
			break;
		default:
			console.log("UNKNOWN ATTRIBUTE");
			return "000.png";
		}

		return this.imgPath.getImagePath("dog_stat_bars/" + stat + "_bars/" + stat + "_bar" + Math.floor(val/10) + ".png");
	}

}
