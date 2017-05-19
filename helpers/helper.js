module.exports = {
  getPercent(ok,nope) {
    return `${Math.round((ok/nope)*100)}%`
  }
};
