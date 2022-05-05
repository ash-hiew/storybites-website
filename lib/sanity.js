/* eslint-disable valid-jsdoc */
import {
  createPreviewSubscriptionHook,
  createCurrentUserHook,
} from 'next-sanity';

import createImageUrlBuilder from '@sanity/image-url';

import {
  PortableText as PortableTextComponent
} from '@portabletext/react';

import {
  config
} from './config';

import React from 'react';

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
export const urlFor = (source) => createImageUrlBuilder(config).image(source).auto('format');

// Set up the live preview subscription hook
export const usePreviewSubscription = createPreviewSubscriptionHook(config);

// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config);

export const PortableText = (props) => < PortableTextComponent components = {
  {}
} {
  ...props
}
/>