import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, ItemSliding } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  bills: any = [];

  settings = {
    accesCode: "",
    openAdmin: false,
    bill: 1,
    number: [1, 2, 3, 4, 5, 6, 7, 8, 9 , 10, 11, 12],
    billsId: [],
    actualBillId: "",
  }

  ordersItems;
  timer;
  storage: Storage;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public toastCtrl: ToastController, public http: Http, storage: Storage) {
    this.ordersItems = [];
    this.storage = storage;
    for(let i = 1; i <= 12; i++){
      var pushBills = {
        billIdentifier: "",
        tip_controller: false,
        tips: 0.00,
        subtotal: 0.0,
        totalPayment: 0.0,
        tableNumber: i,
        items: [],
        billStatus: true,
      };
      this.bills.push(pushBills);
      this.settings.billsId.push(pushBills.billIdentifier);
    }
    for(let item of this.bills){
      this.calculatePay(item);
      item.items = [];
    }
  }

  ionViewDidLoad(){
    this.checkBeforeLogin();
    this.checkFlags();
  }

  checkAccessCode(){
    if(this.settings.accesCode.toLowerCase()  == "jajaja"){
      this.presentToast("Access Code Valid \n Redirecting !", "bottom", 1000);
      this.settings.openAdmin = true;
      this.saveLocalSettings();
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

  addTip(item){
    if(item.tip_controller == true){
      let alert = this.alertCtrl.create({
        title: 'Hey !',
        message: 'Do you want to put a $ Quantity of Tips (Leave Blank to use a Common Percentage)',
        inputs: [
          {
            name: 'tipQuantity',
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              item.controller = false;
              this.presentToast("Tips were not added !", "bottom", 1500);
            }
          },
          {
            text: 'Order',
            role: 'order',
            handler: data => {
              if(data.tipQuantity.length <= 0 || data.tipQuantity == "")
                item.tips = item.subtotal * 0.20;
              else
                item.tips = parseFloat(data.tipQuantity);
              this.presentToast("Tips were added !", "bottom", 3000);
              this.calculatePay(item);
            }
          }
        ]
      });
      alert.present();
    }
    else{
      item.tips = 0.00;
      this.calculatePay(item);
    }

  }

  calculatePay(item){
    item.subtotal = 0;
    item.items.forEach(i => {
      item.subtotal = item.subtotal + i.price;
    });
    item.totalPayment = item.subtotal + item.tips;
  }

  openBill(item){
    this.resetBill(item);
    let idGenerated = "";
    let possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    for(let i = 0; i < 7; i++)
        idGenerated += possible.charAt(Math.floor(Math.random() * possible.length));
    item.billIdentifier = idGenerated;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('http://localhost:3000/api/bills/', JSON.stringify(item), {headers: headers})
      .map(res => res.json())
      .subscribe(
        response => {
          this.settings.billsId[this.settings.bill - 1] = item.billIdentifier;
          this.saveLocalBill(item);
          this.saveLocalSettings();
          this.presentToast("Bill was Created !", "top", 3000);
          this.changeBill(item.tableNumber);
          this.calculatePay(item);
        },
        error => {
          this.presentToast("Occurs an Error When we Try to Create the Bill, Please, Try Again :)", "middle", 3000);
        }
      );

  }

  closeBill(item){
    this.resetBill(item);
    this.changeBill(item.tableNumber);
    this.saveLocalSettings();
  }

  resetBill(item){
    item.tip_controller = false;
    item.tips = 0.0;
    item.subtotal = 0;
    item.totalPayment = 0;
    item.billIdentifier = "";
    this.settings.billsId[this.settings.bill - 1] = item.billIdentifier;
  }

  changeBill(number){
    this.settings.bill = number;
    this.bills.forEach(i => {
      if(i.tableNumber === number){
        this.settings.actualBillId = i.billIdentifier;
        this.saveLocalSettings();
      }
    });
  }

  checkFlags(){
    this.timer = Observable.interval(10000).subscribe(x => {
      this.http.get('http://localhost:3000/api/orders/')
          .map(res => res.json())
          .subscribe(data => {
            if(data != null){
              data.forEach(item => {
                this.bills.forEach(bill => {
                  if(item.billIdentifier === bill.billIdentifier){
                    bill.items.push(item);
                    this.calculatePay(bill);
                    this.saveLocalBill(bill);
                  }
                });
              });
            }
          });
      });
  }

  checkBeforeLogin(){
    this.storage.ready().then(() => {
      this.storage.get('adminSettings').then((val) => {
        if(val != null) {
          let tempObject = JSON.parse(val);
          if(tempObject.openAdmin === true && tempObject.accesCode.length > 0){
            this.settings = JSON.parse(val);
            this.settings.billsId.forEach(i => {
              this.storage.get('order_for_' + i).then((value) => {
                if(value != null){
                  let tempOrderObj = JSON.parse(value);
                  this.bills[tempOrderObj.tableNumber - 1] = tempOrderObj;
                }
              });
            });
          }

          //this.showLocalOrders();
        }
        else {
          this.storage.set('adminSettings', JSON.stringify(this.settings));
          this.storage.set('adminOrders', null);
        }
      });
    });
  }

  saveLocalSettings(){
    this.storage.ready().then(() => {
      this.storage.set('adminSettings', JSON.stringify(this.settings));
     });
  }

  saveLocalOrders(){
    this.storage.ready().then(() => {
      this.storage.set('adminOrders', JSON.stringify(this.ordersItems));
     });
  }

  showLocalOrders(){
    this.storage.ready().then(() => {
       this.storage.get('adminOrders').then((val) => {
         if(val != null) {
           this.ordersItems = JSON.parse(val);
         }
       });
     });
  }

  saveLocalBill(item){
    this.storage.ready().then(() => {
      this.storage.set('order_for_' + item.billIdentifier, JSON.stringify(item));
     });
  }

}
