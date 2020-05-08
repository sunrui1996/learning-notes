class EventEmitter {
  constructor () {
    this.events = new Map()
  }

  addListener (type, callback, once = false) {
    const handler = this.events.get(type)
    if (!handler) {
      // 为 type 事件绑定回调
      this.events.set(type, { callback, once })
    } else if (handler && typeof handler.callback === 'function') {
      // 目前 type 事件只有一个回调
      this.events.set(type, [handler, { callback, once }])
    } else {
      // 目前 type 事件的回调数 >= 2
      handler.push({ callback, once })
    }
  }

  removeListener (type, listener) {
    const handler = this.events.get(type)
    if (!handler) return
    if (!Array.isArray(handler)) {
      if (handler.callback !== listener.callback) return
      this.events.delete(type)
    } else {
      let temp = handler.filter(item => item.callback !== listener.callback)
      if (temp.length === 1) temp = temp[0]
      this.events.set(type, temp)
    }
  }

  once (type, callback) {
    this.addListener(type, callback, true)
  }

  emit (type, ...args) {
    const handler = this.events.get(type)
    if (!handler) return
    if (!Array.isArray(handler)) {
      // 只有一个回调则直接进行
      handler.callback.apply(this, args)
    } else {
      // 有多个则遍历执行回调
      handler.forEach(item => {
        item.callback.apply(this, args)
        // 标记 once: true 的执行完回调后移除
        item.once && this.removeListener(type, item)
      })
    }
  }

  removeAllListener (type) {
    const handler = this.events.get(type)
    if (!handler) return
    this.events.delete(type)
  }
}

const event = new EventEmitter()
const f = () => console.log("type事件我只触发一次")

event.addListener('type', () => console.log("type事件触发！"))
event.addListener('type', () => console.log("WOW!type事件又触发了！"))
event.once('type', f)
event.emit('type')
event.emit('type')
event.removeAllListener('type')
event.emit('type')
