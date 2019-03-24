const logger = console
module.exports = {
  log: message => {
    logger.log.apply(null, [`[${new Date().toLocaleString()}]:`, message]);
  },
  error: message => {
    logger.error.apply(null, [`[${new Date().toLocaleString()}]:`, message]);
  }
}
