export default {
  environment: 'production',
  baseURL: '/admin',
  hosts: {
    identityServer: 'http://172.16.16.153:7013',
    user: 'http://172.16.16.153:7011',
    performance: 'http://172.16.16.153:7012'
  },
  namespace: 'api/v1',
  client_id: 'MyGoal.Client',
  client_secret: 'MyGoalSecret1',
  crypto_secret: 'MyGoalSecret'
};
