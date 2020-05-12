const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function MyPromise (executor) {
  this.status = PENDING
  this.value = null
  this.reason = null
  this.onFulfilledCallbacks = []
  this.onRejectedCallbacks = []

  const resolve = value => {
    if (this.status !== PENDING) return
    this.status = FULFILLED
    this.value = value
    this.onFulfilledCallbacks.forEach(cb => cb())
  }
  const reject = reason => {
    if (this.status !== PENDING) return
    this.status = REJECTED
    this.reason = reason
    this.onRejectedCallbacks.forEach(cb => cb())
  }

  try {
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled !== 'function') onFulfilled = value => value
  if (typeof onRejected !== 'function') onRejected = reason => { throw reason }
  
  const promise2 = new MyPromise((resolve, reject) => {
    if (this.status === PENDING) {
      this.onFulfilledCallbacks.push(() => {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
      this.onRejectedCallbacks.push(() => {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
    } else if (this.status === FULFILLED) {
      setTimeout(() => {
        try {
          const x = onFulfilled(this.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    } else if (this.status === REJECTED) {
      setTimeout(() => {
        try {
          const x = onRejected(this.reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    }
  })

  return promise2
}

const resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    reject(new TypeError('循环引用'))
  } else if (x && typeof x === 'object' || typeof x === 'function') {
    let used = false

    try {
      if (typeof x.then === 'function') {
        x.then(y => {
          if (used) return
          used = true
          resolvePromise(promise2, y, resolve, reject)
        }, r => {
          if (used) return
          used = true
          reject(r)
        })
      } else {
        if (used) return
        used = true
        resolve(x)
      }
    } catch (e) {
      if (used) return
      used = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}

module.exports = MyPromise
