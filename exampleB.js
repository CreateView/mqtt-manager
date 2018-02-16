const MqttService = require('./index.js')
const mqttconfig = require('./configB')

let mqttService = new MqttService()
mqttService.setup(mqttconfig)

function displayGreeting (msg, data, mqttService) {
  console.log(data)
  // can send other message
  mqttService.publish(1, 'bye bye A ')
}

function displayBye (msg, data) {
  console.log(data)
  // can send other message
}

let actions = [

]

actions.push({func: displayGreeting, range: [0, 0]})
actions.push({func: displayBye, range: [1, 1]})

mqttService.addActionsOnSubscribtion(actions)

mqttService.publish(0, 'Hello A, how are you doing ?')
