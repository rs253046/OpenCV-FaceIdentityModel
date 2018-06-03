export default {
  environment: 'testing',
  baseURL: '/admin',
  hosts: {
    identityServer: 'http://172.16.16.153:8013',
    user: 'http://172.16.16.153:8011',
    performance: 'http://172.16.16.153:8012'
  },
  namespace: 'api/v1',
  client_id: 'MyGoal.Client',
  client_secret: 'MyGoalSecret1',
  crypto_secret: 'MyGoalSecret'
};
