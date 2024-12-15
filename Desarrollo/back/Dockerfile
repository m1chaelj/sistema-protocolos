# Base image con Java 11
FROM openjdk:11 as build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /work

# Copia el JAR generado al contenedor
COPY target/backend_Api_Escom_TT-v0.0.1-runner.jar /work/app.jar

# Define el comando de inicio
ENTRYPOINT ["java", "-jar", "/work/app.jar"]
