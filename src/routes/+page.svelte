<script lang="ts">
	import type { Film, ProgressEvent } from '$lib/letterboxd/types'

	type Progress = {
		status: ProgressEvent['status']
		page: number
		filmsFound: number
		totalFilms: number
		currentFilm: string
		lastTmdbId: number | undefined
		progress: number
	}

	let username = 'athenos'
	let isSubmitting = false
	let films: Film[] = []
	let error: string | null = null
	let progress: Progress = {
		status: 'idle' as ProgressEvent['status'],
		page: 0,
		filmsFound: 0,
		totalFilms: 0,
		currentFilm: '',
		lastTmdbId: undefined as number | undefined,
		progress: 0
	}

	async function importMovies() {
		isSubmitting = true
		error = null
		films = []
		progress = {
			status: 'fetching_films',
			page: 0,
			filmsFound: 0,
			totalFilms: 0,
			currentFilm: '',
			lastTmdbId: undefined,
			progress: 0
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
				} else {
					progress = {
						status: data.status,
						page: data.page || 0,
						filmsFound: data.filmsFound || 0,
						totalFilms: data.totalFilms || 0,
						currentFilm: data.currentFilm || '',
						lastTmdbId: data.lastTmdbId,
						progress: data.progress || 0
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

{#if progress.status === 'fetching_films'}
	<div class="mb-4 rounded-md bg-blue-100 p-4 text-blue-700">
		<p>Fetching watched films...</p>
		<p>Page {progress.page}</p>
		<p>Found {progress.filmsFound} films so far</p>
	</div>
{/if}

{#if progress.status === 'fetching_details'}
	<div class="mb-4 rounded-md bg-blue-100 p-4 text-blue-700">
		<p>Fetching movie details...</p>
		<p>Processing: {progress.currentFilm}</p>
		{#if progress.lastTmdbId}
			<p>TMDB ID: {progress.lastTmdbId}</p>
		{/if}
		<p>Progress: {progress.filmsFound} of {progress.totalFilms} films</p>
		<div class="h-2.5 w-full rounded-full bg-gray-200">
			<div
				class="h-2.5 rounded-full bg-blue-600 transition-all duration-300"
				style="width: {progress.progress}%"
			></div>
		</div>
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
