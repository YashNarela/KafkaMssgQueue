` `1->docker run -d --name zookeeper -p 2181:2181 zookeeper

2-> docker run -d --name kafka -p 9092:9092 `

\>> -e KAFKA\_ZOOKEEPER\_CONNECT=host.docker.internal:2181 `

\>> -e KAFKA\_ADVERTISED\_LISTENERS=PLAINTEXT://localhost:9092 `

\>> -e KAFKA\_OFFSETS\_TOPIC\_REPLICATION\_FACTOR=1 `

\>> confluentinc/cp-kafka




\# Kafka and Zookeeper Docker Setup

This guide explains how to set up \*\*Zookeeper\*\* and \*\*Kafka\*\* using Docker containers. Kafka is a distributed event streaming platform, and Zookeeper is a service that Kafka uses for managing distributed coordination.

\## Requirements

\- Docker (version 20.10 or higher)

\- Docker Compose (optional, but recommended for multi-container setups)

\---

\## Steps to Setup Kafka with Zookeeper

\### 1. Running Zookeeper in Docker

First, let's start a Zookeeper container. Zookeeper is required by Kafka for managing cluster metadata.

\```bash

docker run -d --name zookeeper -p 2181:2181 zookeeper

2->

docker run -d --name kafka -p 9092:9092 `

\>> -e KAFKA\_ZOOKEEPER\_CONNECT=host.docker.internal:2181 `

\>> -e KAFKA\_ADVERTISED\_LISTENERS=PLAINTEXT://localhost:9092 `

\>> -e KAFKA\_OFFSETS\_TOPIC\_REPLICATION\_FACTOR=1 `

\>> confluentinc/cp-kafka



**Explanation of Kafka Container Configuration:**

- -d: Run the container in detached mode.
- --name kafka: Assigns the name kafka to the container.
- -p 9092:9092: Maps port 9092 on the host to port 9092 on the container (Kafka's default port).
- -e KAFKA\_ZOOKEEPER\_CONNECT=host.docker.internal:2181: Tells Kafka to connect to Zookeeper at host.docker.internal:2181 (host machine's Zookeeper).
- -e KAFKA\_ADVERTISED\_LISTENERS=PLAINTEXT://localhost:9092: Exposes Kafka on localhost:9092.
- -e KAFKA\_OFFSETS\_TOPIC\_REPLICATION\_FACTOR=1: Sets the replication factor of Kafka's internal offsets topic to 1 (single-node setup).

Kafka will now be running and accessible at localhost:9092.

3->

docker logs zookeeper

4-> docker logs kafka

5->  **Interacting with Kafka**

You can now interact with Kafka by using the Kafka CLI tools or by connecting to it programmatically using the Kafka client libraries.

Example to produce a message to a topic:

docker exec -it kafka kafka-console-producer --broker-list localhost:9092 --topic test-topic

6-> Example to consume a message from a topic:

docker exec -it kafka kafka-console-consumer --bootstrap-server localhost:9092 --topic test-topic --from-beginning


7-> **Stopping and Removing Containers**

To stop the containers:

docker stop kafka zookeeper

docker rm kafka zookeeper

8-> **Troubleshooting**

1. **Kafka not connecting to Zookeeper**:
   1. Ensure Zookeeper is running properly.
   1. Make sure the KAFKA\_ZOOKEEPER\_CONNECT environment variable points to the correct Zookeeper host.
1. **Network issues**:
   1. Make sure Docker's network settings allow the containers to communicate. If needed, use docker network commands to manage networking.

