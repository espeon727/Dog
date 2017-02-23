import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    
  }
  
  clicked(){
   if (document.getElementById('dogpic').src == "../www/assets/images/DogPixelArt.png" )
   {
     document.getElementById('dogpic').src = "../www/assets/images/DogPixelArtNew.png";
   } else
   {
     document.getElementById('dogpic').src = "../www/assets/images/DogPixelArt.png";
   }
}

}
