import OmegleClient from '../lib/OmegleClient.js'

const client = new OmegleClient({
  debug: true
})

client.on('connected', (s) => {
  console.log('Connected', s)
})

client.on('typing', () => {
  client.startTyping()
  console.log('Typing')
})

client.on('stoppedTyping', () => {
  console.log('Stopped Typing')
})

client.on('message', (message) => {
  client.stopTyping()
  console.log(message)
})

client.on('disconnected', () => {
  console.log('Disconnected')
  client.connect({ topics: ['friend', 'friends'] })
})

client.connect({ topics: ['friend', 'gaming'] })
