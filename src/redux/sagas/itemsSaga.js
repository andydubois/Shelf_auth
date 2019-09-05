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

function* addItem(action){
    try {
        yield axios.post('/api/shelf', action.payload);
        console.log('in item POST: ', action.payload);
        yield put({
            type: 'FETCH_ITEMS'
        })
    } catch (err) {
        console.log('error in ITEM POST:', err)
    }
}

function* itemsSaga() {
    yield takeEvery('FETCH_ITEMS', fetchItems);
    yield takeEvery('ADD_ITEM', addItem);
    yield takeEvery('DELETE_ITEM', deleteItem)
}

function* deleteItem(action) {
    try {
        yield axios.delete(`/api/shelf/${action.payload}`);
        console.log('item DELETE route', action.payload);
        yield put ({
            type: 'FETCH_ITEMS'
        })
    } catch (error) {
        console.log('error in client side DELETE', error)
    }
}

export default itemsSaga;