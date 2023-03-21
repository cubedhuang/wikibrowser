<script lang="ts">
	import { wiki } from '$lib/wiki';

	export let title: string;

	let summary: ReturnType<typeof wiki.summary> | null = null;

	$: summary = wiki.summary(title);
</script>

<a
	href="/wiki/{title}"
	class="block p-4 bg-white border-2 rounded-xl
		border-gray-200 hover:border-gray-400 transition-colors"
>
	<h2 class="text-xl font-bold">{title}</h2>

	{#await summary}
		<p class="mt-2 text-gray-600">Loading...</p>
	{:then summary}
		{#if summary?.description}
			<p class="mt-2 text-gray-600">
				{summary.description}
			</p>
		{/if}
	{/await}
</a>
