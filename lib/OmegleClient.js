import axios from 'axios'
import EventEmitter from 'events'

class OmegleClient extends EventEmitter {

  /**
   * @typedef {Object} OmegleClientOptions
   * @property {string=https://front10.omegle.com} server
   * @property {boolean=false} debug
   *
   * @param {...OmegleClientOptions=} options
   */
  constructor(options = {}) {
    super(options)

    this.server = options.server ?? 'https://front10.omegle.com'
    this.connected = false
    this.tryingToConnect = false
    this.typing = false
    this.messages = []
    this.defaultLang = 'en'
    this.debug = options?.debug || false
  }

  /**
   * @typedef {Object} ConnectOptions
   * @property {string=en} lang - The language the instance will connect to
   * @property {string[]=[]} topics
   *
   * Connect this instance
   *
   * @param {...ConnectOptions=} options
   */
  connect(options = { lang: this.defaultLang, topics: [] }) {
    if (this.connected) throw new Error('Instance is already connected')
    if (this.tryingToConnect) throw new Error('The instance is already trying to connect')

    this.tryingToConnect = true
    axios.post(`${this.server}/start?caps=recaptcha2,t2&firstevents=1&lang=${options.lang}&topics=[${options.topics.map(v => `"${v}"`).join(',') || ''}]`)
      .then(({ data }) => {
        this.id = data.clientID
        this.connected = true
        this.tryingToConnect = false

        if (options.topics.length <= 0)
          this.emit('connected')

        this._listenToEvents()
      })
  }

  /**
   * Disconnect the client
   */
  disconnect() {
    if (!this.connected) throw new Error('Needs to be connected to disconnect')

    axios.post(`${this.server}/disconnect`, `id=${this.id}`)
      .then(() => {
        this._reset()
        this.emit('disconnected')
      })
  }

  /**
   * Send a message
   */
  sendMessage(message) {
    if (!message || typeof message !== 'string') throw new Error('Message cannot be empty')
    if (!this.connected) throw new Error('You need to connect first')

    axios.post(`${this.server}/send`, `msg=${message}&id=${this.id}`)
      .then(() => {
        this.messages.push(['you', message])
      })
  }

  /**
   * Start a tyoing indicator
   */
  startTyping() {
    axios.post(`${this.server}/typing`, `id=${this.id}`)
      .then(() => {
        this.typing = true
      })
  }

  /**
   * Stop a tyoing indicator
   */
  stopTyping() {
    axios.post(`${this.server}/stoppedtyping`, `id=${this.id}`)
      .then(() => {
        this.typing = false
      })
  }

  _listenToEvents() {
    axios.post(`${this.server}/events`, `id=${this.id}`)
      .then(({ data }) => {
        if (this.debug) console.log(data)

        data?.forEach((v, i) => {
          const event = v[0]
          const value = v[1]

          if (['statusInfo', null].includes(event)) return

          switch(event) {
            case 'connected':
              this.emit('connected', data[i + 1][1])
              break
            case 'gotMessage':
              this.emit('message', value)
              this.messages.push(['stranger', value])
              break
            case 'typing':
              this.emit('typing')
              break
            case 'stoppedtyping':
              this.emit('stoppedtyping')
              break
            case 'strangerDisconnected':
              this._reset()
              this.emit('disconnected')
              break
          }
        })

        if (this.connected)
          this._listenToEvents()
      })
  }

  _reset() {
    this.connected = false
    this.id = null
    this.messages = []
  }
}

export default OmegleClient
