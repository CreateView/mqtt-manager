const MqttService = require('./index.js')
const mqttconfig = require('./configA')

let mqttService = new MqttService()
mqttService.setup(mqttconfig)

function displayGreeting (msg, data, mqttService) {
  console.log(data)
  // can send other message
  mqttService.publish(0, 'Hello B')
}

function displayBye (msg, data, mqttService) {
  console.log(data)
  // can send other message
  mqttService.publish(1, 'bye bye B ')
}

let actions = [

]
actions.push({func: displayGreeting, range: [0, 0]})
actions.push({func: displayBye, range: [1, 1]})
mqttService.addActionsOnSubscribtion(actions)
