# omegle.js

Interact with omegle using node.js

![GitHub](https://img.shields.io/github/license/qxb3/omegle.js)
![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/qxb3/omegle.js?color=blue&filename=package.json)
![Github](https://img.shields.io/badge/language-javascript-yellow)
![Github](https://img.shields.io/badge/contribution-welcome-red)

# NOTE

Please dont use this to abuse omegle.
There is too much scam bots in omegle already, we dont need another one

# Installation

```bash
npm install omegle.js
# Or
yarn add omegle.js
```

# Example

```js
import OmegleClient from 'omegle.js'
// or const OmegleClient = require('omegle.js')

const client = new OmegleClient()

client.on('connected', () => {
  console.log('Connected')
})

client.on('message', (message) => {
  client.sendMessage(`[BOT] ${message}`)
})

client.connect({
  topics: ['friend', 'gaming']
})
```

# Docs

## OmegleClient

### options

* `debug` (boolean) <br>
\- Will print out the events if set to true <br>
Default: `false`

* `server` (string) <br>
\- Sets the server api the client will be using <br>
Default: `https://front10.omegle.com`

### properties

* `connected` <br>
\- Connection state will set to true if connected <br>
Returns: `boolean`

* `messages` <br>
\- The messages of the current session <br>
Returns: `Array<string>`

* `typing` <br>
\- If the client is currently typing <br>
Returns: `boolean`

### methods

* `connect(options)` <br>
\- Connect the client <br>
Options:
  * `lang` (string) <br>
    Default: `en`

  * `topics` (Array&lt;String&gt;) <br>
    Default: `[]`

* `disconnect()` <br>
\- Disconnect the client

* `sendMessage(message: string)` <br>
\- Send a message

* `startTyping()` <br>
\- Send a typing indicator

* `stopTyping()` <br>
\- Stop a typing indicator

* `on(event: string, callback: function)` <br>
\- Listen to a event

### events

* `connected` <br>
\- Fires when the client is connected <br>
  * Params:
    `(commonLikes?: Array<string>)`

* `disconnected` <br>
\- Fires when the client is disconnected <br>

* `message` <br>
\- Fires when the stranger send a message <br>
  * Params:
    `(message: string)`

* `typing` <br>
\- Fires when the stranger is typing

* `stoppedTyping` <br>
\- Fires when the stranger stopped typing

# Contributing

Feel free to make the library better by forking and making a pull request :>

# LICENSE

[MIT](https://github.com/qxb3/omegle.js/blob/main/LICENSE)
