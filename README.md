# omegle.js

A nodejs omegle library

# NOTE

Please dont use this to abuse omegle.
There is too much scam bots in omegle already, we dont need another one

# Installation

```
npm install omegle.js
# Or
yarn add omegle.js
```

# Example

```js
import OmegleClient from 'omegle.js'

const client = new OmegleClient()

client.on('connected', () => {
  console.log('Connected')
})

client.on('message', (message) => {
  message.sendMessage(`[BOT] ${message}`)
})

client.connect({
  topics: ['friend', 'gaming']
})
```

# Contributing

Feel free to make the library better by forking and making a pull request :>

# LICENSE

[MIT](https://github.com/qxb3/omegle.js/blob/main/LICENSE)
