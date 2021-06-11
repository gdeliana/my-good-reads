import { bookResultsApi } from "../models/book-models";


const fetchBooksApi = async (q: string):Promise<bookResultsApi> => {
	const response = await fetch (`https://www.googleapis.com/books/v1/volumes?q=${q}`);

	if (response.ok) return await response.json();

	throw(new Error('no results'));

}

export default fetchBooksApi;