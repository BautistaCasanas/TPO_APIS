# Dockerfile for Spring Boot Backend (Maven)
# Use an official Maven image to build the application
FROM maven:3.9.6-eclipse-temurin-21 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy Maven wrapper and pom.xml to leverage Docker cache for dependencies
COPY mvnw* pom.xml ./
COPY .mvn .mvn

# Download dependencies (this step will be cached unless pom.xml changes)
RUN ./mvnw dependency:go-offline

# Copy the rest of the source code
COPY src ./src

# Package the application (skip tests for faster build, change if needed)
RUN ./mvnw package -DskipTests

# Use a minimal JRE image for running the app
FROM eclipse-temurin:21-jre

# Set the working directory for the runtime image
WORKDIR /app

# Copy the packaged JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port your Spring Boot app runs on (default 8080)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
