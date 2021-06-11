export interface bookResult {
	title: string;
	image?: string;
	authors?: string[];
	publisher?: string;
	description?: string;
	published?: string;
	id:string;
}

export interface bookResultApi {
	volumeInfo: {
		title: string,
		authors?: string[],
		description?: string,
		publisher?: string,
		publishedDate?: string,
		imageLinks?: {
			thumbnail?: string,
		},
	},
	id: string
}

export interface bookResultsApi {
	items: bookResultApi[]
}