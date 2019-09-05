import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import Axios from 'axios';

// worker Saga: will be fired on "FETCH_ITEMS" actions
function* fetchItems() {
    axios.get('/api/shelf')
}

function* itemsSaga() {
    yield takeEvery('FETCH_ITEMS', fetchItems);
}

export default itemsSaga;