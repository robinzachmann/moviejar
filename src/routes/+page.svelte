<script lang="ts">
	import { enhance } from '$app/forms'
</script>

<h1 class="text-3xl font-bold">Welcome to SvelteKit</h1>

<form method="POST" use:enhance>
	<button type="submit" class="rounded-md bg-blue-500 p-2 text-white">Import Movies</button>
</form>
