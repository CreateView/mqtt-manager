'use strict'

const mqtt = require('mqtt')

const BuildJsObjectFromMqtt = message => {
  return JSON.parse(message.toString())
}

class MqttService {
  constructor () {
    this.connection = ''
    this.publication = []
    this.subscription = []
  }

  /**
   *
   * @param stringArray
   * @returns {Array}
   */
  buildSubscription (stringArray) {
    let subscriptions = []
    stringArray.forEach((string) => {
      subscriptions.push({msg: string, action: function () {}})
    })
    return subscriptions
  }

  /**
   *
   * @param config
   */
  setup (config) {
    if (config) {
      this.connection = config.connection
      this.publication = config.publication
      this.subscription = this.buildSubscription(config.subscription)
      this.object = null
      this.connect()
      this.init()
    }
  }

  connect () {
    this.client = mqtt.connect(this.connection)
  }

  init () {
    this.client.on('connect', () => {
      if (this.subscription) {
        this.subscription.forEach((sub) => {
          this.client.subscribe(sub.msg)
        })
      }
    })
    this.client.on('message', (topic, message) => {
      try {
        if (this.subscription.indexOf(topic)) {
          let data = BuildJsObjectFromMqtt(message)
          let sub = this.findTopic(topic)
          if (sub) {
            if (sub.action) {
              sub.action(sub.action.msg, data, this)
            }
          }
        }
      } catch (e) {
        console.error(e)
      }
    })
  }

  /**
   *
   * @param int
   * @param data
   */
  publish (int, data) {
    this.client.publish(this.publication[int], JSON.stringify(data))
  }
  updateObj (updatedobj) {
    this.object = updatedobj
  }
  /**
   *
   * @param actions
   */
  addActionsOnSubscribtion (actions) {
    let i = 0
    this.subscription.forEach((sub) => {
      actions.forEach((action) => {
        if (action.range[0] <= i && action.range[1] >= i) {
          sub.action = action.func
        }
      })
      i++
    })
  }

  /**
   *
   * @param string
   * @returns {*}
   */
  findTopic (string) {
    for (let i = 0; i < this.subscription.length; i++) {
      if (this.subscription[i].msg === string) {
        return this.subscription[i]
      }
    }
  }
}

/**
 *
 * @type {MqttService}
 */
module.exports = MqttService
