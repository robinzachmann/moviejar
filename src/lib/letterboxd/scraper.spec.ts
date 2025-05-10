import { describe, expect, it, vi } from 'vitest'
import { getTmdbId, importLetterboxdFilms } from './scraper.server'
import type { FilmWithoutTmdbId } from './types'

describe('letterboxd scraper', () => {
	describe('importLetterboxdFilms', () => {
		it('should fetch films from a user with ratings', async () => {
			const sendEvent = vi.fn()
			const films = await importLetterboxdFilms('athenos', sendEvent)

			expect(films).toBeInstanceOf(Array)
			expect(films.length).toBeGreaterThan(0)
			expect(films[0]).toMatchObject<FilmWithoutTmdbId>({
				title: expect.any(String),
				slug: expect.any(String),
				rating: expect.any(Number)
			})
			expect(sendEvent).toHaveBeenCalledWith(
				expect.objectContaining({
					status: 'fetching_films',
					page: expect.any(Number),
					filmsFound: expect.any(Number)
				})
			)
		})

		it('should throw an error for nonexistent users', async () => {
			const sendEvent = vi.fn()
			await expect(importLetterboxdFilms('nonexistentuser123456789', sendEvent)).rejects.toThrow(
				'User "nonexistentuser123456789" not found on Letterboxd'
			)
		})
	})

	describe('getTmdbId', () => {
		it('should fetch TMDB ID for a film', async () => {
			const tmdbId = await getTmdbId('inception')
			expect(tmdbId).toBe(27205)
		})
	})
})
