FROM maven:3.6.3-jdk-8
copy src /home/app/src/
copy pom.xml /home/app
run mvn -f /home/app/pom.xml -DskipTests=true clean package

FROM openjdk:8-jdk-alpine
COPY --from=build /home/app/target/back_end_springboot-0.0.1-SNAPSHOT.jar /app/back_end_springboot.jar
COPY ./twsessl.cer /app/twsessl.cer
RUN keytool -importcert -file /app/twsessl.cer -keystore cacerts -alias server -noprompt -storepass changeit
WORKDIR /app
ENTRYPOINT ["java", "-jar", "back_end_springboot.jar"]
