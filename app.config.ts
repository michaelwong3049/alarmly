import { ExpoConfig, ConfigContext } from '@expo/config';
import * as dotenv from 'dotenv';

// initialize dotenv
dotenv.config();

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: 'my-app',
  name: 'My App',
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.croon',
    config: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    },
  },
});