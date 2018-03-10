module.exports = (json, target, data) => {
  return JSON.parse(JSON.stringify(json).replace(target, data))
}
