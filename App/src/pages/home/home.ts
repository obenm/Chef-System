import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, ItemSliding } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})

export class HomePage {

  bill = {
    billIdentifier: "",
    totalPayment: 0.00,
    items: [],
  };
  settings = {
    openBill: true,
    menu: "fastfood",
  }
  items: any[];
  storage: Storage;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public toastCtrl: ToastController, public http: Http, storage: Storage) {
    this.storage = storage;
  }

  ionViewDidLoad(){
    this.getItems();
  }

  checkAccessCode(){
    if(this.bill.billIdentifier.toLowerCase()  == "jajaja"){
      this.presentToast("Access Code Valid \n Redirecting !", "bottom", 1000);
      this.settings.openBill = true;
      this.settings.menu = "fastfood";
    }
    else
      this.showBasicAlert("Alert!", "Access Code not Valid !");
  }

  showBasicAlert(title, subtitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }

  presentToast(txt, position, duration) {
    let toast = this.toastCtrl.create({
      message: txt,
      duration: duration,
      position: position
    });
    toast.present();
  }

  requestOrder(slidingItem: ItemSliding, item){
    let alert = this.alertCtrl.create({
      title: 'Hey !',
      message: 'Do you want to leave a description for your order? (Optional)',
      inputs: [
        {
          name: 'description',
          placeholder: item.name + ", w/ " + item.description,
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            this.presentToast("Order was canceled !", "bottom", 1500);
          }
        },
        {
          text: 'Order',
          role: 'order',
          handler: data => {
            if(data.description != "")
              item.descriptionToChef = data.description;
            this.bill.items.push(item);
            this.calculatePayment(item.price);
            this.presentToast("Order was placed !", "bottom", 3000);
            this.saveLocalBill();
          }
        }
      ]
    });
    alert.present();
    slidingItem.close();
  }

  calculatePayment(price){
    this.bill.totalPayment = this.bill.totalPayment + price;
  }

  getItems(){
    if (this.items) {
      return Promise.resolve(this.items);
    }
    return new Promise(resolve => {
      this.http.get('http://localhost:3000/api/products/')
        .map(res => res.json())
        .subscribe(data => {
          this.items = data;
          resolve(this.items);
        });
    });
  }

  saveLocalBill(){
    this.storage.ready().then(() => {
      this.storage.set('bill', JSON.stringify(this.bill));
       /*storage.get('bill').then((val) => {
         console.log('Your bill is', val);
       })*/
     });
  }

}
