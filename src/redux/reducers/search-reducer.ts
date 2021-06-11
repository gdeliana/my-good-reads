import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchBooksApi from "../../API/fetchBooksApi";
import { bookResult } from "../../models/book-models";

export const fetchBooksByType = createAsyncThunk(
	"search/fetchBooksByType",
	async (q: string, thunkAPI) => {
		try {
			if (q.trim() === "") return [];
			let items: bookResult[] = [];
			const res = await fetchBooksApi(q);

			res.items?.forEach((book_data) => {

				const [id, title, authors, description, publisher, published, image] = [
					book_data.id,
					book_data?.volumeInfo?.title,
					book_data?.volumeInfo?.authors,
					book_data?.volumeInfo?.description,
					book_data?.volumeInfo?.publisher,
					book_data?.volumeInfo?.publishedDate,
					book_data?.volumeInfo?.imageLinks?.thumbnail,
				];

				if (title) {
					items.push({
						id,
						title,
						authors,
						description,
						publisher,
						published,
						image,
					});
				}
			});

			return items;
		} catch (e) {
			thunkAPI.rejectWithValue(e);
		}
	}
);

const initialState: {
	results: bookResult[];
	loading: boolean;
} = {
	results: [],
	loading: false,
};

const slice = createSlice({
	name: "search",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchBooksByType.pending, (state, action) => {
			state.loading = true;
		});

		builder.addCase(fetchBooksByType.fulfilled, (state, { payload }) => {
			state.loading = false;
			if (payload) state.results = payload;
		});

		builder.addCase(fetchBooksByType.rejected, (state, action) => {
			state.loading = false;
			state.results = [];
		});
	},
});

export const { actions, reducer } = slice;
