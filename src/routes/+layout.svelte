<script>
	import '../app.postcss';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link
		rel="preconnect"
		href="https://fonts.gstatic.com"
		crossorigin="anonymous"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="flex flex-col min-h-screen max-w-screen-lg mx-auto px-4">
	<nav class="mt-16 mb-12 flex flex-wrap items-baseline gap-x-16 gap-y-2">
		<a
			href="/"
			class="mr-auto text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500
				hover:brightness-[1.1] transition duration-300"
		>
			wikibrowser
		</a>

		<div class="flex flex-wrap gap-8">
			<a
				href="/about"
				class="text-xl font-semibold text-gray-600 transition-colors hover:text-gray-900"
			>
				about
			</a>

			<a
				href="/random"
				class="text-xl font-semibold text-gray-600 transition-colors hover:text-gray-900"
			>
				random
			</a>

			<a
				href="/search"
				class="text-xl font-semibold text-gray-600 transition-colors hover:text-gray-900"
			>
				search
			</a>
		</div>
	</nav>

	<main class="mb-20">
		<slot />
	</main>
</div>
