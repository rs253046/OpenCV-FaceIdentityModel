const config = (env) => {
  const PORT = env.PORT || 3000;
  const config = {
    environment: 'development',
    port: PORT,
    microsoftFaceApi: {
      keys: {
        1: "4e2b1f76fb444f4fb6b35592a79f93e4",
        2: "8ccdaad68aff4e80a53a3168ad8112b0"
      },
      subscriptionID: "dc56d138-bd17-4b92-bd34-d2dd3fb04f97",
      endpoint: "https://eastus.api.cognitive.microsoft.com/face/v1.0"
    },
    webcamPort: 0,
    paths: {
      viewsDirectory: 'src/views',
      defaultLayoutDirectory: 'src/views/layouts'
    }
  };

  return config;
}
export default config(process.env);