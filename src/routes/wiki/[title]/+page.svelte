<script lang="ts">
	import { page } from '$app/stores';
	import { wiki } from '$lib/wiki';

	let pageData: Promise<string> | null = null;

	$: pageData = wiki.page($page.params.title).then(data => data.html());
</script>

{#await pageData}
	<p>Loading...</p>
{:then pageData}
	{#if pageData}
		<p class="whitespace-pre-wrap">{@html pageData}</p>
	{/if}
{/await}
