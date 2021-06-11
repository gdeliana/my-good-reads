import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { bookResult } from '../../models/book-models';

export const initialState:{
	items: {
		[k: string] : bookResult
	}
} = {
	items: {}
}

const slice = createSlice({
	name: 'favourites',
	initialState,
	reducers: {
		add(state, action:PayloadAction<bookResult>) {
			if(!state.items[action.payload.id])
				state.items[action.payload.id] = action.payload;
		},
		remove(state, action:PayloadAction<string>) {
			delete state.items[action.payload];
		}
	}
});

export const {actions, reducer} = slice;