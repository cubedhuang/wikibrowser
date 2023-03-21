<script lang="ts">
	import { wiki } from '$lib/wiki';
	import Result from './Result.svelte';

	let query = '';
	let data: ReturnType<typeof wiki.search> | null = null;

	let last: number;

	function debounce(fn: () => void, delay: number) {
		clearTimeout(last);
		last = setTimeout(fn, delay);
	}

	$: if (query.length) {
		debounce(() => {
			data = wiki.search(query, { limit: 20 });
		}, 200);
	}
</script>

<input
	type="text"
	placeholder="Search..."
	bind:value={query}
	class="w-full px-6 py-4 text-xl rounded-xl border-2 border-gray-200
		focus:outline-none focus:border-gray-400 transition-colors"
/>

{#await data}
	{#if query.length > 2}
		<p class="mt-8 text-xl text-gray-600">Loading...</p>
	{/if}
{:then data}
	{#if data?.results?.length}
		<h2 class="mt-8 text-2xl font-bold">Results</h2>

		<div class="mt-4 grid grid-cols-3 gap-4">
			{#each data.results as result}
				<Result title={result.title} />
			{/each}
		</div>
	{:else}
		<p class="mt-8 text-xl text-gray-600">No results.</p>
	{/if}
{/await}
