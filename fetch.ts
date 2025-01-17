import { promises as fs } from 'fs'
import { mkdir } from 'fs/promises'
import path from 'path'
import { getStravaData } from './getStravaData.js'
import { weekNumber } from './lib/getWeek.js'

getStravaData()
	.then(async (data) => {
		const stravaDir = path.join(
			process.cwd(),
			'data',
			`week-${weekNumber.toString().padStart(2, '0')}`,
		)
		try {
			await mkdir(stravaDir)
		} catch {
			// directory exists
		}
		await fs.writeFile(
			path.join(stravaDir, `data-${new Date().toISOString()}.json`),
			JSON.stringify(data, null, 2),
			'utf-8',
		)
	})
	.catch((error) => {
		console.error('Failed to write to shadow')
		console.error(error)
	})
