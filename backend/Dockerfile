# Usa uma imagem base de Java 21
FROM openjdk:21-jdk-slim

# Define o diretório de trabalho dentro do contentor
WORKDIR /app

# Copia os ficheiros de configuração do Maven para aproveitar o cache do Docker
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn
# Baixa as dependências
RUN ./mvnw dependency:go-offline

# Copia o código fonte da sua aplicação
COPY src ./src

# Compila a aplicação e gera o ficheiro .jar
RUN ./mvnw clean package -DskipTests

# Expõe a porta que a sua aplicação usa
EXPOSE 8080

CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]