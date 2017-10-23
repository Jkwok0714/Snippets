var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: INPUT_HERE,
  log: 'trace'
});

client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 1000
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }

  client.create({
    index: 'index',
    type: 'Plastic',
    id: '1',
    body: {
      title: 'Elastic Plastic',
      published_at: '2013-01-01',
      counter: 1
    }
  }, function (error, response) {
    console.log(response);
    process.exit();
    // ...
  });
});
