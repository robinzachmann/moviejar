<script lang="ts">
	let username = 'athenos'
	let isSubmitting = false
	let films: Array<{ slug: string; rating: number | undefined; tmdbId: number }> = []
	let error: string | null = null
	let progress = {
		status: 'idle',
		page: 0,
		filmsFound: 0,
		currentFilm: '',
		lastTmdbId: undefined as number | undefined
	}

	async function importMovies() {
		isSubmitting = true
		error = null
		films = []
		progress = {
			status: 'connecting',
			page: 0,
			filmsFound: 0,
			currentFilm: '',
			lastTmdbId: undefined
		}

		try {
			const eventSource = new EventSource(
				`/api/letterboxd/progress?username=${encodeURIComponent(username)}`
			)

			eventSource.onmessage = (event) => {
				const data = JSON.parse(event.data)

				if (data.status === 'complete') {
					films = data.films
					eventSource.close()
					isSubmitting = false
				} else if (data.status === 'error') {
					error = data.error
					if (data.lastProcessedFilm) {
						error += `\nLast processed film: ${data.lastProcessedFilm}`
					}
					eventSource.close()
					isSubmitting = false
				} else if (data.status === 'fetching') {
					progress = {
						status: 'fetching',
						page: data.page,
						filmsFound: data.filmsFound,
						currentFilm: data.currentFilm,
						lastTmdbId: data.lastTmdbId
					}
				}
			}

			eventSource.onerror = () => {
				error = 'Connection lost'
				eventSource.close()
				isSubmitting = false
			}
		} catch (e) {
			error = e instanceof Error ? e.message : 'An error occurred'
			isSubmitting = false
		}
	}
</script>

<h1 class="text-3xl font-bold">Welcome to SvelteKit</h1>

{#if films.length > 0}
	<div class="mb-4 rounded-md bg-green-100 p-4 text-green-700">
		Found {films.length} films
	</div>
{/if}

{#if error}
	<div class="mb-4 rounded-md bg-red-100 p-4 whitespace-pre-line text-red-700">
		{error}
	</div>
{/if}

{#if progress.status === 'fetching'}
	<div class="mb-4 rounded-md bg-blue-100 p-4 text-blue-700">
		<p>Fetching page {progress.page}...</p>
		<p>Found {progress.filmsFound} films so far</p>
		{#if progress.currentFilm}
			<p>Processing: {progress.currentFilm}</p>
			{#if progress.lastTmdbId}
				<p>TMDB ID: {progress.lastTmdbId}</p>
			{/if}
		{/if}
	</div>
{/if}

<div>
	<label for="username">Letterboxd Username</label>
	<input type="text" bind:value={username} />
	<button
		on:click={importMovies}
		class="rounded-md bg-blue-500 p-2 text-white disabled:opacity-50"
		disabled={isSubmitting}
	>
		{#if isSubmitting}
			Importing...
		{:else}
			Import Movies
		{/if}
	</button>
</div>
