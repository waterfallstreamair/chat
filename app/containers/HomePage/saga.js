import { call, put, takeLatest, all, select } from 'redux-saga/effects';
import request from 'utils/request';

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSaga() {
  yield all([]);
}
