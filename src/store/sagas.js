import { all, fork } from 'redux-saga/effects'

const req = require.context('.', true, /\.\/.+\/sagas\.js$/)

const sagasLists = req.keys().map(key => req(key).default)
const sagas = [].concat(...sagasLists)

export default function* () {
  yield all(sagas.map(fork))
}
