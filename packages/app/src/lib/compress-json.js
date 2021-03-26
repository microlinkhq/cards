import createMsgpack from 'msgpack5'
import URLSafeBase64 from 'urlsafe-base64'

const msgpack = createMsgpack()

export const marshall = value => URLSafeBase64.encode(msgpack.encode(value))

export const unmarshall = value => msgpack.decode(URLSafeBase64.decode(value))
