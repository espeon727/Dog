import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera } from 'ionic-native';

/*
  Used this tutorial 
  https://www.thepolyglotdeveloper.com/2016/04/use-the-device-camera-in-an-ionic-2-android-and-ios-app/
*/
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {
	public base64Image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
  	this.base64Image = "../www/assets/images/dpa_02_transparent_bg_large.png"
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad CameraPage');
  }

  public takePicture() 
  {
  	Camera.getPicture(
  	{
  		quality: 75,
  		destinationType: Camera.DestinationType.DATA_URL,
  		sourceType: Camera.PictureSourceType.CAMERA,
  		allowEdit: true,
  		encodingType: Camera.EncodingType.JPEG,
  		targetWidth: 300,
  		targetHeight: 300,
  		saveToPhotoAlbum: false
  	}).then(imageData => 
  	{
  		this.base64Image = "data:image/jpeg;base64," + imageData;
  	}, error =>
  	{
  		alert("Error -> " + JSON.stringify(error));
  	});
  }

}
