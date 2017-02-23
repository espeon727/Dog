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
   
   if (document.getElementById('dogpic').getAttribute("src") == "../www/assets/images/DogPixelArt.png" )
   {
     document.getElementById('dogpic').getAttribute("src").replace("../www/assets/images/DogPixelArt.png","../www/assets/images/dpa_01_transparent_bg_Large.png");
   } else
   {
     document.getElementById('dogpic').getAttribute("src").replace("../www/assets/images/dpa_01_transparent_bg_Large.png","../www/assets/images/DogPixelArt.png");
   }
   
   console.log("CLICKED");
}

}
