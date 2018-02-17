'use strict'

const mqtt = require('mqtt')

/**
 *
 * @param message
 * @returns {any}
 * @constructor
 */
const BuildJsObjectFromMqtt = message => {
  return JSON.parse(message.toString())
}

class MqttManager {
  constructor () {
    this._connection = ''
    this._publication = {}
    this._subscription = []
  }

  /**
   *
   * @param config
   * @param actions
   */
  setup (config, actions) {
    if (config) {
      this._connection = config.connection
      this._publication = config.publication
      this._subscription = actions
      this._object = null
      this.connect()
      this.init()
    }
  }
  /**
   *
   * @returns {Array|*}
   */
  get subscription () {
    return this._subscription
  }

  /**
   *
   * @returns {{}|*}
   */
  get publication () {
    return this._publication
  }
  /**
   *
   */
  connect () {
    this._client = mqtt.connect(this._connection)
  }

  /**
   *
   */
  init () {
    this._client.on('connect', () => {
      this._subscription.forEach((sub) => {
        this._client.subscribe(sub.topic)
      })
    })
    this._client.on('message', (topic, message) => {
      try {
        let sub = this.findTopic(topic)
        if (sub) {
          let data = BuildJsObjectFromMqtt(message)
          if (sub) {
            if (sub.func) {
              sub.func(sub.topic, data, this)
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
   * @param key
   * @param data
   */
  publish (key, data) {
    this._client.publish(this._publication[key], JSON.stringify(data))
  }

  /**
   *
   * @param updatedobj
   */
  set object (updatedobj) {
    this._object = updatedobj
  }

  /**
   *
   * @returns {null|*}
   */
  get object () {
    return this._object
  }

  /**
   *
   * @param string
   * @returns {*}
   */
  findTopic (string) {
    for (let i = 0; i < this.subscription.length; i++) {
      if (this.subscription[i].topic === string) {
        return this.subscription[i]
      }
    }
  }
}

/**
 *
 * @type {MqttManager}
 */
module.exports = MqttManager
