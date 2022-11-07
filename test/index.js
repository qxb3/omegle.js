import OmegleClient from '../lib/OmegleClient.js'

const client = new OmegleClient()
let interval

client.on('connected', () => {
  console.log('Connected')
  client.sendMessage(`Hello! I will copy everything that you say!`)

  interval = setInterval(() => {
    console.log(client.messages)
  }, 1000)
})

client.on('message', (message) => {
  console.log(message)
  client.sendMessage(message)
})

client.on('disconnected', () => {
  console.log('Disconnected')
  client.connect({ topics: ['friend', 'friends'] })
  clearInterval(interval)
})

client.connect()
client.connect()
