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
   if (document.getElementById('dogpic').getAttribute("src") == "../assets/images/DogPixelArt.png" )
   {
     document.getElementById('dogpic').setAttribute("src", "../assets/images/dpa_01_transparent_bg_Large.png");
   } else
   {
     document.getElementById('dogpic').setAttribute("src", "../assets/images/DogPixelArt.png");
   }
}

}
