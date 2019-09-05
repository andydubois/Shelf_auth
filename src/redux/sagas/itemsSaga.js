import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_ITEMS" actions
function* fetchItems() {
    try {
        let itemResponse = yield axios.get('/api/shelf')
        console.log('saga response!', itemResponse.data);
        yield put({
            type: 'SET_ITEMS',
            payload: itemResponse.data
        })
    } catch (err) {
        console.log('error in ITEM GET:', err); 
    } 
}

function* itemsSaga() {
    yield takeEvery('FETCH_ITEMS', fetchItems);
}

export default itemsSaga;