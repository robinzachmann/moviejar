import { json } from '@sveltejs/kit'

export const actions = {
	default: async () => {
		return json({
			success: true
		})
	}
}
