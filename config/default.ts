export default {
    port: getEnv('PORT', '3000'),
    host: getEnv('HOST', 'localhost'),
    rewatch_token: getEnv('REWATCH_TOKEN', ''),
    rewatch_uri: getEnv('REWATCH_URI', '')
};