export default {
  environment: 'staging',
  baseURL: '/admin',
  hosts: {
    identityServer: 'http://172.16.16.153:5013',
    user: 'http://172.16.16.153:5011',
    performance: 'http://172.16.16.153:5012'
  },
  namespace: 'api/v1',
  client_id: 'MyGoal.Client',
  client_secret: 'MyGoalSecret1',
  crypto_secret: 'MyGoalSecret'
};
