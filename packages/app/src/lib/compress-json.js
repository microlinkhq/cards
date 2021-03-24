import Msgpack from 'msgpack5'
import base64url from 'base64-url'

const msgpack = new Msgpack()

export const marshall = value => base64url.encode(msgpack.encode(value))

export const unmarshall = value => msgpack.decode(base64url.decode(value))
