module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = './server/index.js'
    //config.resolve.modules = ['./test']
    return config
  }
}
