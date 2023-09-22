import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import schemas from '@/src/sanity/shemas';

const config = defineConfig({
  projectId: 'w6c56ibm',
  dataset: 'production',
  title: 'website',
  apiVersion: '2023-06-27',
  basePath: '/admin',
  plugins: [deskTool()],
  schema: { types: schemas },
  useCdn: true
});

export default config;
