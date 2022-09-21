import OmegleClient from '../lib/OmegleClient.js'

const client = new OmegleClient()

client.on('connected', () => {
  console.log('Connected')
  client.sendMessage(`Hello! I will copy everything that you say!`)
})

client.on('message', (message) => {
  console.log(message)

  setTimeout(() => {
    client.startTyping()
    client.sendMessage(`[BOT] - ${message}`)
    client.stopTyping()

    console.log(client.messages)
  }, 3000)
})

client.on('disconnected', () => {
  console.log('Disconnected')
  client.connect({ topics: ['friend', 'friends'] })
})

client.connect({ topics: ['friend', 'friends'] })
