// use this file for gun configuration/connections
import Gun from 'gun'
// helper method for doing stuff like count,

Gun.chain.valMapEnd = function (cb, end) {
  var n     = function () {},
      count = 0,
      props = [],
      gun   = this
  cb        = cb || n
  end       = end || n

  gun.val(function (list) {
    var args = Array.prototype.slice.call(arguments)
    Gun.node.is(list, function (n, prop) {
      count += 1
      props.push(prop)
    })
    props.forEach(function (prop) {
      gun.path(prop).val(function (val, key) {
        count -= 1
        cb.apply(this, arguments)
        if (!count) {
          end.apply(this, args)
        }
      })
    })
  })
  return gun
}
Gun.chain.value     = function (cb, opt) {
  return this.val(function (val, field) {
    val = Gun.obj.copy(val)
    delete val._
    cb.call(this, val, field)
  }, opt)
}
// make sure local server is running (..$ node server.js)
export const gun    = Gun('http://localhost:8081/gun')
