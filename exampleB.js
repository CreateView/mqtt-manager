'use strict'
const MqttManager = require('./index.js')
const mqttconfig = require('./configB')
// define the functions to trig on messages
function displayGreeting (msg, data, mqttService) {
  console.log(data)
  // can send other message
  mqttService.publish(mqttconfig.publication['Bye A'], 'bye byeA ')
}

function displayBye (msg, data, mqttService) {
  console.log(data)
  // can send other message
  // mqttService.publish(mqttconfig.publication['Bye A'], 'bye byeA ')
}

let actions = [

]
// add actions on subscriptions
actions.push({topic: mqttconfig.subscription['Bye B'], func: displayBye})
actions.push({topic: mqttconfig.subscription['Greeting B'], func: displayGreeting})

// create a new Mqttmanager
let mqttManager = new MqttManager()

// Sett he config
mqttManager.setup(mqttconfig, actions)

// talk
mqttManager.publish(mqttconfig.publication['Greeting A'], 'Hello A')
