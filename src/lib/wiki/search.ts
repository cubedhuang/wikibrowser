import { wiki } from '.';

export async function search(query: string, offset = 0) {
	const params = {
		action: 'query',
		list: 'search',
		srsearch: query,
		srlimit: '24',
		sroffset: offset.toString()
	};

	const data = await wiki<Search>(params);

	return data;
}

export interface Search {
	batchcomplete: string;
	continue?: Continue;
	query: Query;
}

export interface Continue {
	sroffset: number;
	continue: string;
}

export interface Query {
	searchinfo: Searchinfo;
	search: SearchElement[];
}

export interface SearchElement {
	ns: number;
	title: string;
	pageid: number;
	size: number;
	wordcount: number;
	snippet: string;
	timestamp: string;
}

export interface Searchinfo {
	totalhits: number;
}
