# mqtt-service
Npm package to configure mqtt in easy way  without need for duplication code

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/CreateView/mqtt-service.svg?branch=master)](https://travis-ci.org/CreateView/mqtt-service)
[![stability-experimental](https://img.shields.io/badge/stability-experimental-orange.svg)](https://github.com/dominictarr/stability)


## stability

Expect the unexpected. Please provide feedback on api and your use-case

## Installation

  `npm install mqtt-servicer`

## Usage

// lets make a json config file like this :
```json
{
  "connection": "mqtt://127.0.0.1'",
  "publication": [
    "TALK_TO_B"
  ] ,
  "subscription":["LISTEN_FROM_B"]

}
```

Here is a way of using it. You can also try `npm run testA` and `npm run testB` is this order

```javascript
function displayGreeting (msg,data,mqttService){
  console.log(data)
  // can send other message
  mqttService.publish(1,'bye bye A ')
}

function displayBye (msg,data,mqttService){
  console.log(data)
  // can send other message
}

let actions = [

]


actions.push({func: displayGreeting, range: [0, 0]})
actions.push({func: displayBye, range: [1, 1]})

mqttService.addActionsOnSubscribtion(actions)


mqttService.publish(0,'Hello A, how are you doing ?')
```

## Tests

`npm test`

## Contributing

arn-the-long-beard