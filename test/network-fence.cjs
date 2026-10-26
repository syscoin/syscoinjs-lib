'use strict'

// Tests use synthetic transaction data and must not access public networks.
const net = require('node:net')
const dns = require('node:dns')
const dgram = require('node:dgram')
const blocked = () => { throw new Error('Offline test network fence') }

net.Socket.prototype.connect = blocked
dgram.Socket.prototype.send = blocked
for (const name of Object.keys(dns)) {
  if (/^(lookup|resolve|reverse)/.test(name) && typeof dns[name] === 'function') {
    dns[name] = blocked
  }
}
for (const name of Object.keys(dns.promises)) {
  if (/^(lookup|resolve|reverse)/.test(name) && typeof dns.promises[name] === 'function') {
    dns.promises[name] = async () => blocked()
  }
}
