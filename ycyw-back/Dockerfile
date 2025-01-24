FROM gradle:jdk23 AS builder
WORKDIR /app
COPY build.gradle.kts .
COPY src ./src
RUN gradle build -x test

FROM eclipse-temurin:23-jre
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]


#DEBUG

#EXPOSE 5005
#ENTRYPOINT ["java", "-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005", "-jar", "app.jar"]