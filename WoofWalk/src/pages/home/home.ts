import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage 
{
  constructor(public navCtrl: NavController) 
  {
    
  }

  
  clicked()
  {
    // for android
    if (document.getElementById('dogpic').getAttribute("src") == "../www/assets/images/dpa_02_transparent_bg_large.png")
    {
      document.getElementById('dogpic').setAttribute("src", "../www/assets/images/dpa_01_transparent_bg_large.png");
    } 
    else if (document.getElementById('dogpic').getAttribute("src") == "../www/assets/images/dpa_01_transparent_bg_large.png")
    {
      document.getElementById('dogpic').setAttribute("src", "../www/assets/images/dpa_02_transparent_bg_large.png");
    }


    // web
    if (document.getElementById('dogpic').getAttribute("src") == "../assets/images/dpa_02_transparent_bg_large.png" )
    {
      document.getElementById('dogpic').setAttribute("src", "../assets/images/dpa_01_transparent_bg_large.png");
    }
    else if (document.getElementById('dogpic').getAttribute("src") == "../assets/images/dpa_01_transparent_bg_large.png")
    {
      document.getElementById('dogpic').setAttribute("src", "../assets/images/dpa_02_transparent_bg_large.png");
    }   
  }
  


}
