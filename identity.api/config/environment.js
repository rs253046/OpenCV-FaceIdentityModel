const config = (env) => {
  const PORT = env.PORT || 3000;
  const config = {
    environment: 'development',
    port: PORT,
    microsoftFaceApi: {
      keys: {
        1: "1fd2c831ca0149069cd1b3244b1e336a",
        2: "430cd4dd27454ceabfbcb0788097dbd2"
      },
      subscriptionID: "1fd2c831ca0149069cd1b3244b1e336a",
      endpoint: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0"
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
