var AWS = require('aws-sdk');
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: '',
  log: 'trace'
});

client.ping({
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }

  client.create({
    index: 'index',
    type: 'Plastic',
    body: {
      title: 'Elastic Plastic',
      published_at: '2013-01-01',
      counter: 1
    }
  }, function (error, response) {
    process.exit();
    // ...
  });
});
