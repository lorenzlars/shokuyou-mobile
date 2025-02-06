import {defineConfig, defaultPlugins} from '@hey-api/openapi-ts'

export default defineConfig({
  input: 'http://localhost:3000/docs-yaml',
  output: 'src/api',
  plugins: [
    ...defaultPlugins,
    {
      name: '@hey-api/client-axios',
    },
    {
      name: '@hey-api/typescript',
    },
    {
      name: '@hey-api/sdk',
      asClass: true,
    },
  ],
})
