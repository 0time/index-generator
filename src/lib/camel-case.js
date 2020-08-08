const regex = /[-_ .]./g;

module.exports = str => str.replace(regex, m => m.toUpperCase().slice(1));
