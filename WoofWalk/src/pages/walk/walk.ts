import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation, Diagnostic } from 'ionic-native';

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

  private currLocation;
  private curr_marker;
  private distance: number;
  private watch_id;
  private onTrack: boolean = false;

  private options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0
  };
  
  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
    Diagnostic.requestLocationAuthorization();
  }

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pastDistance') ElementRef;
  map: any;
  pastDistance: any
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad WalkPage');
	this.loadMap();
  }

  startClicked() {
    if (this.onTrack == false) {
      this.onTrack = true;
	  this.watch_id = Geolocation.watchPosition(this.updateMap); //, this.error, this.options);
	}
  }
  
  stopClicked() {
    if (this.onTrack == true) {
	  this.onTrack = false;
	  navigator.geolocation.clearWatch(this.watch_id);
      this.watch_id = null;
	  this.pastDistance = this.distance;
	}
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
	  
	  this.curr_marker = new google.maps.Marker({
        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        map: map,
		title: "My Location"
      });
	  this.map = map;
	  this.currLocation = position;
	}, (err) => {
	  console.log(err);
	});
	this.distance = 0;
	
  }
  
  public updateMap(pos) {
    var curr = pos.coords;
	if (curr.latitude == this.currLocation.latitude && curr.longitude == this.currLocation.longitude ) {
	  return;
	}
	this.distance = this.distance + 0.62137119 * this.gps_distance(curr.latitude, curr.longitude, this.currLocation.latitude, this.currLocation.longitude);
	
	this.map.setCenter({lat: this.currLocation.latitude, lng: this.currLocation.longitude, alt: 0});
	this.curr_marker.setPosition({lat: this.currLocation.latitude, lng: this.currLocation.longitude, alt: 0});
	this.map.addPolyline((new google.maps.PolylineOptions()).add(this.currLocation, curr).width(6).color(google.maps.Color.BLUE)
        .visible(true));
	this.currLocation = curr;
  }
  
  public error(err) {
    alert("There was an error: "+err);
  }
  
  gps_distance(lat1, lon1, lat2, lon2) {
	// http://www.movable-type.co.uk/scripts/latlong.html
    var R: number = 6371; // km
    var dLat = (lat2-lat1) * (Math.PI / 180);
    var dLon = (lon2-lon1) * (Math.PI / 180);
    var lat1: any = lat1 * (Math.PI / 180);
    var lat2: any = lat2 * (Math.PI / 180);
 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
     
    return d;
}
  
}
