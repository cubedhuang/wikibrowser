<script lang="ts">
	import type { SearchElement } from '$lib/wiki';

	export let result: SearchElement;
</script>

<a
	href="/wiki/{result.title}"
	class="block p-4 bg-white border-2 rounded-xl
		border-gray-200 hover:border-gray-400 transition-colors"
>
	<h2 class="text-lg font-bold">{result.title}</h2>

	{@html result.snippet}
	<!-- {#await summary}
		<p class="mt-2 text-gray-600">Loading...</p>
	{:then summary}
		{#if summary?.description}
			<p class="mt-2 text-gray-600">
				{summary.description}
			</p>
		{/if}
	{/await} -->
</a>
