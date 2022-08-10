FROM openjdk:8-jdk-alpine
COPY ./target/dockerTest.jar /app/dockerTest.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "dockerTest.jar"]