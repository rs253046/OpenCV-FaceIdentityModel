module.exports = {
  apps : [{
    name: "identity.api",
    script: "./bin/server.js",
    // instances: "max",
    interpreter: 'babel-node',
    output: './.tmps/logs/out.log',
    error: './.tmps/logs/error.log',
    log: './.tmps/logs/combined.outerr.log',
    merge_logs: true,
    log_type: 'json',
    watch: './src',
    args: ""
  }]
}

