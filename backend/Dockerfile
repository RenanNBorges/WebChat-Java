FROM eclipse-temurin:21-jdk-trixie as builder
WORKDIR /app
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN ./mvnw dependency:go-offline
COPY src ./src
RUN ./mvnw clean install -DskipTests

# Estágio 2: Run (usando apenas JRE, imagem menor)
FROM eclipse-temurin:21-jre-trixie
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]