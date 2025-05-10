<script lang="ts">
	import type { Film, ProgressEvent } from '$lib/letterboxd/types'

	/** @type {import('./$types').PageData} */
	export let data

	let username = ''
	let isSubmitting = false
	let films: Film[] = []
	let skippedFilms: string[] = []
	let error: string | null = null
	let lastEvent: ProgressEvent | undefined = undefined
	let eventSource: EventSource | undefined = undefined

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault()
		if (!username) {
			error = 'Please enter a username'
			return
		}
		importMovies()
	}

	function cancelImport() {
		if (eventSource) {
			eventSource.close()
			eventSource = undefined
			isSubmitting = false
			error = 'Import cancelled'
		}
	}

	async function importMovies() {
		isSubmitting = true
		error = null
		films = []
		skippedFilms = []

		try {
			eventSource = new EventSource(
				`/api/letterboxd/progress?username=${encodeURIComponent(username)}`
			)

			eventSource.onmessage = (event) => {
				lastEvent = JSON.parse(event.data) as ProgressEvent

				if (lastEvent.status === 'complete') {
					films = lastEvent.films
					eventSource?.close()
					eventSource = undefined
					isSubmitting = false
				} else if (lastEvent.status === 'error') {
					error = lastEvent.error
					if (lastEvent.lastProcessedFilm) {
						error += `\nLast processed film: ${lastEvent.lastProcessedFilm}`
					}
					eventSource?.close()
					eventSource = undefined
					isSubmitting = false
				} else if (lastEvent.status === 'fetching_details') {
					skippedFilms = lastEvent.skippedFilms
				}
			}

			eventSource.onerror = () => {
				error = 'Connection lost'
				eventSource?.close()
				eventSource = undefined
				isSubmitting = false
			}
		} catch (e) {
			error = e instanceof Error ? e.message : 'An error occurred'
			isSubmitting = false
		}
	}
</script>

<h1 class="text-3xl font-bold">Import Letterboxd Films</h1>

{#if error}
	<div class="mb-4 rounded-md bg-red-100 p-4 whitespace-pre-line text-red-700">
		{error}
	</div>
{/if}

{#if lastEvent}
	{#if lastEvent.status === 'fetching_films'}
		<div class="mb-4 rounded-md bg-blue-100 p-4 text-blue-700">
			<p>Fetching watched films...</p>
			<p>Page {lastEvent.page}</p>
			<p>Found {lastEvent.filmsFound} films so far</p>
		</div>
	{:else if lastEvent.status === 'fetching_details'}
		<div class="mb-4 rounded-md bg-blue-100 p-4 text-blue-700">
			<p>Fetching movie details...</p>
			<p>Processing: {lastEvent.film.title}</p>
			<p>Your rating: {lastEvent.film.rating ? lastEvent.film.rating + '/10' : '-'}</p>
			<p>TMDB ID: {lastEvent.tmdbId}</p>
			{#if skippedFilms.length > 0}
				<div class="flex gap-2">
					Skipped items: {skippedFilms.join(', ')}
				</div>
			{/if}
			<p>Progress: {lastEvent.filmsFound} of {lastEvent.totalFilms} films</p>
			<div class="h-2.5 w-full rounded-full bg-gray-200">
				<div
					class="h-2.5 rounded-full bg-blue-600 transition-all duration-300"
					style="width: {lastEvent.progress}%"
				></div>
			</div>
		</div>
	{/if}
{/if}

{#if films.length > 0}
	<div class="mb-4 rounded-md bg-green-100 p-4 text-green-700">
		Imported {films.length} of {films.length + skippedFilms.length} films

		{#if skippedFilms.length > 0}
			<div class="flex gap-2">
				Skipped films:
				<ul class="flex flex-wrap gap-2">
					{#each skippedFilms as film (film)}
						<li class="rounded-md bg-gray-100 px-2 py-1 text-sm">
							{film}
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
{/if}

<form class="mt-3 flex items-end gap-2" on:submit={handleSubmit}>
	<label for="username" class="flex flex-col items-start gap-1">
		<div class="text-sm">Username</div>
		<input type="text" name="username" id="username" bind:value={username} />
	</label>
	<button class="rounded-md bg-blue-500 p-2 text-white disabled:opacity-50" disabled={isSubmitting}>
		{#if isSubmitting}
			Importing...
		{:else}
			Import Movies
		{/if}
	</button>
	{#if isSubmitting}
		<button type="button" class="rounded-md bg-red-500 p-2 text-white" on:click={cancelImport}>
			Cancel
		</button>
	{/if}
</form>

{#if data.watchedMovies.length > 0}	
	<div class="mt-8">
		<h2 class="text-2xl font-bold mb-4">Your Watched Movies</h2>
		<p class="text-sm text-gray-500 mb-2">
			Total watched movies: {data.watchedMoviesCount}
		</p>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each data.watchedMovies as movie}
				<div class="rounded-lg border p-4">
					<div class="flex justify-between items-start">
						<div>
							<p class="font-medium">TMDB ID: {movie.tmdb_id}</p>
							{#if movie.user_rating}
								<p class="text-sm text-gray-600">Rating: {movie.user_rating}/10</p>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}
