import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';


import { DogsPage } from '../dogs/dogs';
import { ShopPage } from '../shop/shop';
import { InventoryPage } from '../inventory/inventory';
import { WalkPage } from '../walk/walk';
import { CameraPage } from '../camera/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage 
{
  private rootPage;
  private homePage;
  private shopPage;
  private inventoryPage;
  private walkPage;
  private cameraPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
    this.rootPage = HomePage;

    this.homePage = HomePage;
    this.shopPage = ShopPage;
    this.inventoryPage = InventoryPage;
    this.walkPage = WalkPage;
    this.cameraPage = CameraPage;
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

  openPage(p)
  {
    this.rootPage = p;
  }

  // toggleMenu()
  // {
  //   var menu = document.getElementById("menu");
  //   if(menu.classList.contains("show-menu"))
  //   {
  //     menu.classList.remove("show-menu");      
  //   }
  //   else
  //   {
  //     menu.classList.add("show-menu");
  //   }
  // }

  

  navigateDogs()
  {
    this.navCtrl.push(DogsPage);
  }
  navigateShop()
  {
    this.navCtrl.push(ShopPage);
  }
  navigateInventory()
  {
    this.navCtrl.push(InventoryPage);
  }
  navigateWalk()
  {
    this.navCtrl.push(WalkPage);
  }
  navigateCamera()
  {
    this.navCtrl.push(CameraPage);
  }

}
