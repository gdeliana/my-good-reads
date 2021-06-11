import {combineReducers} from '@reduxjs/toolkit';
import {reducer as favouritesReducer} from './favourites-reducer';
import {reducer as searchReducer} from './search-reducer';

const rootReducer = combineReducers({
	favourites: favouritesReducer,
	search: searchReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>