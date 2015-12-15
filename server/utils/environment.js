'use strict';
/**
 * Created by mobinni on 07/12/15.
 */
const env =  process.env.NODE_ENV || 'DEVELOPMENT';
export default {
    name: env,
    isProduction: env === 'PRODUCTION',
    isDevelopment: env === 'DEVELOPMENT'
};
