<script lang="ts">
	import { enhance } from '$app/forms'
	import type { ActionData } from './$types'

	export let form: ActionData
</script>

<h1 class="text-3xl font-bold">Welcome to SvelteKit</h1>

{#if form?.success}
	<div class="mb-4 rounded-md bg-green-100 p-4 text-green-700">
		{JSON.stringify(form)}
	</div>
{/if}

<form method="POST" use:enhance>
	<button type="submit" class="rounded-md bg-blue-500 p-2 text-white">Import Movies</button>
</form>
