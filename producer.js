
const kafka = require('kafka-node');
const config = require('./config');

try {
  const Producer = kafka.Producer;
  const client = new kafka.KafkaClient(config.kafka_server);
  const producer = new Producer(client);
  const kafka_topic = 'Topic';
  console.log(kafka_topic);
  let payloads = [
    {
      topic: kafka_topic,
      messages: "Hello Kafka" 
    }
  ];

  producer.on('ready', async function () {
    let push_status = producer.send(payloads, (err, data) => {
      if (err) {
        console.log('kafka-producer: ' + kafka_topic + ':  update failed');
      } else {
        console.log('kafka-producer: ' + kafka_topic + ':  update success');
      }
    });
  });

  producer.on('error', function (err) {
    console.log(err);
    console.log('kafka-producer: ' + kafka_topic + ': connection errored');
    throw err;
  });
}
catch (e) {
  console.log(e);
}