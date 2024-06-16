// sanity.config.js
import { defineConfig } from "sanity";
import schemas from './schemas/schema';
import { visionTool } from '@sanity/vision';
import {cloudinarySchemaPlugin} from 'sanity-plugin-cloudinary';
import {cloudinaryImageSource} from 'sanity-plugin-cloudinary';
import {cloudinaryAssetSourcePlugin} from 'sanity-plugin-cloudinary'
import {structureTool} from 'sanity/structure';
import {tags} from 'sanity-plugin-tags';
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy';

export default defineConfig({
  name: 'default',
  title: "storybites-cms",
    projectId: "rmu3z19b",
    dataset: "production",
  plugins: [cloudinarySchemaPlugin(),
  tags({}),
  visionTool(), vercelDeployTool(), structureTool(), cloudinaryAssetSourcePlugin()],
  
  tools: (prev) => {
    // 👇 Uses environment variables set by Vite in development mode
    if (import.meta.env.DEV) {
      return prev
    }
    return prev.filter((tool) => tool.name !== 'vision')
  },
  schema: {
    types: schemas,
  },
  form: {
    image: {
      assetSources: (previousAssetSources, context) => {
        if (context.currentUser?.roles.includes('cloudinaryAccess')) {
          // appends cloudinary as an asset source
          return [...previousAssetSources, cloudinaryImageSource]
        }
        if (context.currentUser?.roles.includes('onlyCloudinaryAccess')) {
          // only use cloudinary as an asset source
          return [cloudinaryImageSource]
        }
        // dont add cloudnary as an asset sources
        return previousAssetSources
      },
    },
  },
});