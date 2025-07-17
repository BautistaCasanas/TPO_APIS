# Etapa de construcción
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

# Copiar los archivos de configuración de Maven
COPY mvnw* pom.xml ./
COPY .mvn .mvn

# Descargar dependencias
RUN ./mvnw dependency:go-offline

# Copiar el código fuente
COPY src ./src

# Construir la aplicación sin ejecutar los tests
RUN ./mvnw package -DskipTests

# Etapa de producción
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copiar el jar desde la etapa anterior
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]

