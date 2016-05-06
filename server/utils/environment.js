'use strict';
/**
 * Created by mobinni on 07/12/15.
 */
const env = process.env.NODE_ENV || 'DEVELOPMENT';
// set env variable
const hasSSREnabled = (process.env.SSR || process.argv[2] === 'ssr') || false;

export default {
  name: env,
  isProduction: env === 'PRODUCTION',
  isDevelopment: env === 'DEVELOPMENT',
  ssrEnabled: hasSSREnabled
};
