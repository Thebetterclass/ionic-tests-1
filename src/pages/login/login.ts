import { Component, ViewChild, ElementRef } from '@angular/core'
import { IonicPage, NavController } from 'ionic-angular'
import { Keyboard } from '@ionic-native/keyboard'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [Keyboard]
})
export class LoginPage {
  // @ViewChild(Content) private content: Content
  @ViewChild('scrollMe') private myScrollContainer: ElementRef

  constructor (public navCtrl: NavController
  ) {

  }

  ionViewDidEnter () {
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight
  }

  // OR

  ngAfterViewChecked () {
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight
  }

}
