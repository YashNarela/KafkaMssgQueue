const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

async function init() {
  const consumer = kafka.consumer({ groupId: "user-1" });

  console.log("Connecting Consumer...");
  await consumer.connect();
  console.log("Consumer Connected Successfully");

  // Subscribe to the topic and consume messages from the beginning
  await consumer.subscribe({ topics: ["rider-updates"], fromBeginning: true });

  // Start consuming messages
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        `Received message: ${message.value.toString()} on topic: ${topic}`
      );
    },
  });

  // This part ensures the consumer runs indefinitely
  console.log("Consumer Running...");
}

// Run the consumer
init().catch(console.error);
