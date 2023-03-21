export type WikiParams = {
	action: string;
	[key: string]: string;
};

export async function wiki<T extends object>(params: WikiParams) {
	const url = new URL('https://en.wikipedia.org/w/api.php');

	url.searchParams.set('origin', '*');
	url.searchParams.set('format', 'json');

	for (const [key, value] of Object.entries(params)) {
		url.searchParams.set(key, value);
	}

	const response = await fetch(url).catch(error => {
		throw new Error(`Failed to fetch ${url}: ${error}`);
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch ${url}`);
	}

	const data = await response.json().catch(error => {
		throw new Error(`Failed to parse JSON from ${url}: ${error}`);
	});

	if (data.error) {
		throw new Error(`Failed to fetch ${url}: ${data.error.info}`);
	}

	return data as T;
}

export * from './search';
