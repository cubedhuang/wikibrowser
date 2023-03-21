<script lang="ts">
	import { browser } from '$app/environment';
	import {
		type Continue,
		search,
		type Search,
		type SearchElement
	} from '$lib/wiki';
	import Result from './Result.svelte';

	let loading = false;

	let query = '';
	let results: SearchElement[] | null = null;

	let offset: number | null = null;

	let last: number;
	function debounce(fn: () => void, delay: number) {
		clearTimeout(last);
		last = setTimeout(fn, delay);
	}

	$: if (query.length) {
		debounce(async () => {
			loading = true;

			const response = await search(query);

			results = response.query.search;
			offset = response?.continue?.sroffset ?? null;

			loading = false;
		}, 200);
	} else {
		results = null;
	}

	let scrollY: number;
	let innerHeight: number;

	$: if (
		browser &&
		offset &&
		scrollY + innerHeight >= document.body.scrollHeight - 32
	) {
		debounce(async () => {
			if (!offset || !results || !query) return;

			loading = true;

			const response = await search(query, offset);

			results = [...results, ...response.query.search];
			offset = response?.continue?.sroffset ?? null;

			loading = false;
		}, 200);
	}
</script>

<svelte:window bind:scrollY bind:innerHeight />

<input
	type="text"
	placeholder="Search..."
	bind:value={query}
	class="w-full px-6 py-4 text-xl rounded-xl border-2 border-gray-200
		focus:outline-none focus:border-gray-400 transition-colors"
/>

{#if results?.length}
	<h2 class="mt-8 text-2xl font-bold">Results</h2>

	<div class="mt-4 grid grid-cols-3 gap-4">
		{#each results as result}
			<Result {result} />
		{/each}
	</div>
{/if}

{#if loading}
	<p class="mt-8 text-xl text-gray-600">Loading...</p>
{:else if !results?.length}
	<p class="mt-8 text-xl text-gray-600">No results.</p>
{/if}
