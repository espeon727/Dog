import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
	public name: string;

	public affection: number;
	public fullness: number;
	public hydration: number;
	public cleanliness: number;

	public icon: string;
	public icon2: string;


  public chartLabels:string[] = ['Affection', 'Fullness', 'Hydration', 'Cleanliness'];

  public chartData:any = [{
    label: "",
    data: [ 
      this.navParams.get("affection"), 
      this.navParams.get("fullness"), 
      this.navParams.get("hydration"), 
      this.navParams.get("cleanliness")
    ]
  }];

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
  	this.name = navParams.get("name");

  	this.affection = navParams.get("affection");
  	this.fullness = navParams.get("fullness");
  	this.hydration = navParams.get("hydration");
  	this.cleanliness = navParams.get("cleanliness");

  	this.icon = navParams.get("icon");
  	this.icon2 = navParams.get("icon2");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DogStatsPage');


  }

}
