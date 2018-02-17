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
