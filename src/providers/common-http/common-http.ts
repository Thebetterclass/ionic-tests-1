import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpEventType } from '@angular/common/http'
import { Injectable } from '@angular/core'

/*
  Generated class for the CommonHttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonHttpProvider {

  BASE_URL: string = 'http://localhost:8080/'

  constructor (private http: HttpClient) { }

  // HTTP original
  get (url) {
    return new Promise(resolve => {
      this.http.get(url).subscribe(
        data => resolve(data),
        err => resolve(err)
      )
    })
  }

  post (url, dados, options) {
    return new Promise(resolve => {
      this.http.post(url, dados, options).subscribe(
        data => resolve(data),
        err => resolve(err)
      )
    })
  }

  patch (url, dados, options) {
    return new Promise(resolve => {
      this.http.patch(url, dados, options).subscribe(
        data => resolve(data)
        , err => resolve(err)
      )
    })
  }

  delete (url) {
    return new Promise(resolve => {
      this.http.delete(url).subscribe(
        data => resolve(data),
        err => resolve(err)
      )
    })
  }

  // HTTP adaptada

  obterDados (url) {
    return new Promise((resolve, reject) => {
      url = this.BASE_URL + url

      this.get(url)
        .then((result: any) => {
          if (!result) return resolve(false)
          if (result.erro === false) return resolve(result.resultado)
          //
          let erro = result.error.mensagem || result.mensagem || result || 'Erro Não identificado'
          console.error(erro)
          resolve(false)
        })
        .catch((err: any) => {
          let erro = err.error.mensagem || err.mensagem || err || 'Erro Não identificado'
          console.error(erro)
          reject(erro)
        })
    })

  }

  enviarDados (url, dados, options?) {
    return new Promise((resolve, reject) => {

      url = this.BASE_URL + url

      let header = new HttpHeaders()
      let post = dados
      let headers = header.append('Content-Type', 'application/json')

      if (options) headers = options

      this.post(url, post, headers)
        .then((result: any) => {
          if (result) console.log('Status', result)
          if (result.erro === false) return resolve(result.resultado)

          let erro = result.error.mensagem || result.mensagem || result || 'Erro Não identificado'
          console.error(erro)

          if (result.status === 500) console.log('Sem conexão - result.status: ', result.status)
          if (result.status === 0) console.log('Sem conexão com o servidor - result.status: ', result.status)

          resolve(false)
        }).catch((err: any) => {

          let erro = err.error.mensagem || err.mensagem || err
          console.error(erro)
          reject(erro)
        })
    })
  }

  alterarDados (url, dados) {
    return new Promise((resolve, reject) => {
      url = this.BASE_URL + url
      let header = new HttpHeaders()
      let headers = header.append('Content-Type', 'application/json')
      let patch = { dados: dados }

      this.patch(url, patch, headers)
        .then((result: any) => {
          if (result.erro === false) return resolve(result.resultado)
          let erro = result.error.mensagem || result.message || result || 'Erro Não identificado'

          console.error('Erro da request: ', erro)

          if (result.status === 500) console.log('Sem conexão - result.status: ', result.status)
          if (result.status === 0) console.log('Sem conexão com o servidor - result.status: ', result.status)

          resolve(false)
        }).catch((err: any) => {

          let erro = err.error.mensagem || err.mensagem || err || 'Erro Não identificado'
          console.error(erro)
          reject(erro)

        })
    })
  }

  deletarDados (url) {
    return new Promise((resolve, reject) => {
      url = this.BASE_URL + url
      this.delete(url)
        .then((result: any) => {
          if (result.erro === false) return resolve(result.resultado.mensagem)
          let erro = result.error.mensagem || result.message || result || 'Erro Não identificado'

          console.error('Erro da request: ', erro)

          if (result.status === 500) console.log('Sem conexão - result.status: ', result.status)
          if (result.status === 0) console.log('Sem conexão com o servidor - result.status: ', result.status)

          resolve(false)
        }).catch((err: any) => {

          let erro = err.error.mensagem || err.mensagem || err || 'Erro Não identificado'
          console.error(erro)
          reject(erro)

        })
    })
  }

  upload (arquivos: any, url: string) {
    console.log('upload()')
    return new Promise((resolve, reject) => {
      let options = {}
      let body = new FormData()

      for (let index in arquivos) {
        body.append('document' + index, arquivos[index])
      }

      body.append('desc', 'upload dos dados do pacote')

      this.enviarDados(url, body, options)
        .then((result) => {
          if (result) {
            resolve(result)
          }
          resolve(false)
        }).catch((error) => {
          reject(error)
        })
    })
  }

}
