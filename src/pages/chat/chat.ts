import { Component } from '@angular/core'
import { IonicPage, NavController } from 'ionic-angular'
import * as io from 'socket.io-client'

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {
  socket: any
  mensagemAtual: string
  mensagens = []
  sala: string

  constructor (public navCtrl: NavController) {
    this.sala = 'sala1' + Math.floor(Math.random() * 2)
    this.mensagens = JSON.parse(localStorage.getItem(this.sala)) || []

    this.socket = io('http://192.168.1.112:8080')

    this.socket.emit('create', this.sala)

    this.socket.on('chat message', (msg) => {
      console.log('mensagem', msg)
      this.mensagens.push(msg)
      localStorage.setItem(this.sala, JSON.stringify(this.mensagens))
    })

  }

  envia () {
    if (this.mensagemAtual !== '') {
      this.socket.emit('chat message', this.sala, this.mensagemAtual)
    }
    this.mensagemAtual = ''
  }
}
