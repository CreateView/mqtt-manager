# mqtt-manager
Npm package to configure mqtt in easy way  without need for duplication code

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/CreateView/mqtt-manager.svg?branch=master)](https://travis-ci.org/CreateView/mqtt-manager)
[![stability-experimental](https://img.shields.io/badge/stability-experimental-orange.svg)](https://github.com/dominictarr/stability)
[![NSP Status](https://nodesecurity.io/orgs/createview/projects/9a685f47-82f6-41dc-bc8b-e8b4753b29d7/badge)](https://nodesecurity.io/orgs/createview/projects/9a685f47-82f6-41dc-bc8b-e8b4753b29d7)

## Stability

Expect the unexpected. Please provide feedback on api and your use-case

## Installation

  `npm install @createview/mqtt-manager

## Usage

// lets make a json config file like this :
```json
{
  "connection": "mqtt://127.0.0.1'",
  "publication": {
    "Greeting B" :  "Greeting B",
    "Bye B" :  "Bye B"
  },
  "subscription":{
    "Greeting A" : "Greeting A",
    "Bye A" :   "Bye A"
  }
}
```

Here is a way of using it. You can also try `npm run testA` and `npm run testB` is this order

```javascript
'use strict'
const MqttManager = require('./index.js')
const mqttconfig = require('./configA')
// define the functions to trig on messages
function displayGreeting (msg, data, mqttService) {
  console.log(data)
  // can send other message
  mqttService.publish(mqttconfig.publication['Greeting B'], 'Hello B')
}

function displayBye (msg, data, mqttService) {
  console.log(data)
  // can send other message
  mqttService.publish(mqttconfig.publication['Bye B'], 'bye byeB ')
}

let actions = [

]
// add actions on subscriptions
actions.push({topic: mqttconfig.subscription['Bye A'], func: displayBye})
actions.push({topic: mqttconfig.subscription['Greeting A'], func: displayGreeting})

// create a new Mqttmanager
let mqttService = new MqttManager()

// Sett he config
mqttService.setup(mqttconfig, actions)

```

## Tests

`npm test`

## Comments


PS : the packages was previously named @createview/mqtt-service I am very sorry for the desagrement caused by the remove of this package from Npm. I prefered to delete it after 24 h to put a good name on it :)

The package needs improvement

## Contributing

arn-the-long-beard
