# omegle.js

Interact with omegle using node.js

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
    debug (boolean) <br>
     - Will print out the events if set to true
    `Default: false`
  </li>

  <li>
    server (string) <br>
    - Sets the server api the client will be using
    `Default: https://front10.omegle.com`
  </li>
</ul>

### properties

<ul>
  <li>
    connected <br>
     - Connection state will set to true if connected <br>
     `Returns: Boolean`
  </li>

  <li>
    messages <br>
     - The messages of the current session <br>
     `Returns: Array&lt;String&gt;`
  </li>

  <li>
    typing <br>
     - If the client is currently typing <br>
     `Returns: Boolean`
  </li>
</ul>


### methods

<ul>
  <li>
    connect(options) <br>
     - Connect the client <br>
     Options:
     <ul>
       <li>
        lang (String) <br>
        `Default: 'en'`
       </li>

       <li>
          topics (Array&lt;String&gt;)
          `Default: []`
        </li>
     </ul>
  </li>

  <li>
    disconnect() <br>
     - Disconnect the client
  </li>

  <li>
    sendMessage(message: string) <br>
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
    on(event: string, callback: function) <br>
     - Listen to a event
  </li>

</ul>

### events

<ul>
  <li>
    connected <br>
    `Params:` <br>
    (commonLikes?: Array&lt;String&gt;)
  </li>

  <li>disconnected</li>

  <li>
    message <br>
    `Params:` <br>
    (message: string)
  </li>

  <li>typing</li>

  <li>stoppedTyping</li>
</ul>

And probably more but i forget :/

# Contributing

Feel free to make the library better by forking and making a pull request :>

# LICENSE

[MIT](https://github.com/qxb3/omegle.js/blob/main/LICENSE)
