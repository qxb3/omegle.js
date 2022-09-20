import axios from 'axios'

import EventEmitter from 'events'
import { randomBytes } from 'crypto'

class Omegle extends EventEmitter {
  constructor(options) {
    super(options)

    this.baseURL = 'https://front45.omegle.com'
    this.connected = false
    this.typing = false
    this.messages = []
    this.defaultLang = 'en'
    this.debug = options?.debug || false
  }

  connect(options) {
    if (this.id) throw new Error('Already connected')

    axios.post(`${this.baseURL}/start?caps=recaptcha2,t&firstevents=1&lang=${options?.lang || this.defaultLang}&topics=[${options?.topics?.map(v => `"${v}"`).join(',') || ''}]`)
      .then(({ data }) => {
        this.id = data.clientID
        this.connected = true

        this.listenToEvents()
      })
  }

  disconnect() {
    this.connected = false
    this.id = null
    this.messages = []
  }

  sendMessage(message) {
    if (!message || typeof message !== 'string') throw new Error('Message cannot be empty')
    if (!this.id) throw new Error('You need to connect first')

    axios.post(`${this.baseURL}/send`, `msg=${message}&id=${this.id}`)
    this.messages.push(['you', message])
  }

  startTyping() {
    axios.post(`${this.baseURL}/typing`, `id=${this.id}`)
      .then(() => {
        this.typing = true
      })
  }

  stopTyping() {
    axios.post(`${this.baseURL}/stoppedtyping`, `id=${this.id}`)
      .then(() => {
        this.typing = false
      })
  }

  listenToEvents() {
    axios.post(`${this.baseURL}/events`, `id=${this.id}`)
      .then(({ data }) => {
        if (this.debug) console.log(data)

        data?.forEach((v) => {
          const event = v[0]
          const value = v[1]

          if (['statusInfo', null].includes(event)) return

          switch(event) {
            case 'connected':
              this.emit('connected')
              break
            case 'gotMessage':
              this.emit('message', value)
              this.messages.push(['stranger', value])
              break
            case 'strangerDisconnected':
              this.disconnect()
              this.emit('disconnected')
              break
          }
        })

        if (this.connected)
          this.listenToEvents()
      })
  }

  generateID() {
    return randomBytes(8).toString('base64url')
  }
}

export default Omegle
