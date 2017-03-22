import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from 'ionic-native';

declare var google;


/*
  Generated class for the Walk page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-walk',
  templateUrl: 'walk.html'
})
export class WalkPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad WalkPage');
	this.loadMap();
  }

  loadMap() {
   /* 
	let latLng = new google.maps.LatLng(-34.9290, 138.6010);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
   */
 
	Geolocation.getCurrentPosition().then((position) => {
	  
	  let latLng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
	  
	  let mapOptions = {
	    center: latLng,
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	  }
	  
	  var map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
	  
	  var myLocation = new google.maps.Marker({
        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        map: map,
		title: "My Location"
      });
	  this.map = map;
	}, (err) => {
	  console.log(err);
	});
	
  }
  
}
