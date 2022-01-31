import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'gamik4lj',
  dataset: 'production',
  apiVersion: '2021-03-25',
  token:
    'skY5qI025WVIxPJfelb7xgCqCNMrkQZV2sZmYLkfy4J1b6MSXQa5wvAdhP5t1gtm2EqN582dIl5fbc9QGkwvZ6KSRKUBb64VJiasUqrJyc9UcMSrob6ac1kXXX8tx3Uok9Y61C2qVyWv8bvAqhJCUmdR1AY4lNeCQdHYxfsA1mvHjTSyigt5',
  useCdn: false,
})
