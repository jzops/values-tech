// Fails the build on data defects that would otherwise silently hide records.
// See src/lib/data-integrity.ts for why each check exists.
import { createJiti } from 'jiti'

const jiti = createJiti(import.meta.url, { interopDefault: true })
const { reportDataIntegrity } = await jiti.import('../src/lib/data-integrity.ts')

if (!reportDataIntegrity()) {
  console.error('\ndata-integrity: FAILED — refusing to build.')
  process.exit(1)
}
