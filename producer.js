const { Kafka } = require("kafkajs");

kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

async function init() {
  const producer = kafka.producer();

  console.log("Connecting Producer");
  await producer.connect();
  console.log("Producer Connected Successfully");

    await producer.send({
      topic: "rider-updates",
      messages: [
        {
          partition: 0,
          key: "location-update",
          value: JSON.stringify({ name: "yash", location:"bhopal" }),
        },
      ],
    });

    await producer.disconnect();
    console.log("Producer Disconnected Successfully");
}

init();