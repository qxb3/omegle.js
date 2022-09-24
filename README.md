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

# Docs

## OmegleClient

### options

<ul>
  <li>
    defaultLang (String) <br>
     - The default language that the client will be using <br>
  </li>

  <li>
    debug (Boolean) <br>
     - Will print out the events if set to true
  </li>
</ul>

### properties

<ul>
  <li>
    connected <br>
     - If connected <br>
     Returns: Boolean
  </li>

  <li>
    messages <br>
     - The messages of the current session <br>
     Returns: Array&lt;String&gt;
  </li>

  <li>
    typing <br>
     - If the client is currently typing <br>
     Returns: Boolean
  </li>
</ul>


### methods

<ul>
  <li>
    connect(options) <br>
     - Connect the client <br>
     Options:
     <ul>
       <li>lang (String)</li>
       <li>topics (Array&lt;String&gt;)</li>
     </ul>
  </li>

  <li>
    disconnect() <br>
     - Disconnect the client
  </li>

  <li>
    sendMessage(message) <br>
     - Send a message to current session
  </li>

  <li>
    startTyping() <br>
     - Sends a typing indicator
  </li>

  <li>
    stopTyping() <br>
     - Stops a typing indicator
  </li>

  <li>
    on(event) <br>
     - Listen to a event
  </li>

</ul>

### events

<ul>
  <li>connected</li>
  <li>disconnected</li>
  <li>message (Params: message)</li>
  <li>typing</li>
  <li>stoppedtyping</li>
</ul>

And probably more but i forget :/

# Contributing

Feel free to make the library better by forking and making a pull request :>

# LICENSE

[MIT](https://github.com/qxb3/omegle.js/blob/main/LICENSE)
