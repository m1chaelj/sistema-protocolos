-- Terminar sesiones activas y recrear la base de datos
SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname='backend-Escom';

DROP DATABASE IF EXISTS "backend-Escom";
CREATE DATABASE "backend-Escom";

-- Conectarse a la base de datos
\c backend-Escom

-- Crear la base de datos (este paso puede omitirse si ya existe la base de datos)
-- 1. Crear tablas básicas
CREATE TABLE Estado_alumno (
    id_estado SERIAL PRIMARY KEY,  -- Cambiado a SERIAL
    nombre VARCHAR(20) NOT NULL
);

CREATE TABLE Estado_verificacion (
    id_estado_verificacion SERIAL PRIMARY KEY,  -- Cambiado a SERIAL
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Estado_protocolo (
    id_estado SERIAL PRIMARY KEY,  -- Cambiado a SERIAL
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Estado_sinodal (
    id_estado SERIAL PRIMARY KEY,  -- Cambiado a SERIAL
    nombre VARCHAR(20) NOT NULL
);

CREATE TABLE Estado_secretario (
    id_estado SERIAL PRIMARY KEY,  -- Cambiado a SERIAL
    nombre VARCHAR(20) NOT NULL
);

-- 2. Crear tabla Alumno
CREATE TABLE Alumno (
    id_alumno SERIAL PRIMARY KEY,  -- Cambiado a SERIAL
    fk_id_estado INT NOT NULL,
    nombre VARCHAR(20) NOT NULL,
    apellido_paterno VARCHAR(20) NOT NULL,
    apellido_materno VARCHAR(20) NOT NULL,
    correo_electronico VARCHAR(150) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    fk_id_estado_verificacion INT NOT NULL,
    FOREIGN KEY (fk_id_estado) REFERENCES Estado_alumno (id_estado),
    FOREIGN KEY (fk_id_estado_verificacion) REFERENCES Estado_verificacion (id_estado_verificacion)
);

-- 3. Crear tabla Sinodal
CREATE TABLE Sinodal (
    id_sinodal SERIAL PRIMARY KEY,  -- Cambiado a SERIAL
    fk_id_estado INT NOT NULL,
    nombre VARCHAR(20) NOT NULL,
    apellido_paterno VARCHAR(20) NOT NULL,
    apellido_materno VARCHAR(20) NOT NULL,
    correo_electronico VARCHAR(100) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    fk_id_estado_verificacion INT NOT NULL,
    FOREIGN KEY (fk_id_estado) REFERENCES Estado_sinodal (id_estado),
    FOREIGN KEY (fk_id_estado_verificacion) REFERENCES Estado_verificacion (id_estado_verificacion)
);

-- 4. Crear tabla Secretario_CATT
CREATE TABLE Secretario_CATT (
    id_secretario_CATT SERIAL PRIMARY KEY,  -- Cambiado a SERIAL
    nombre VARCHAR(20) NOT NULL,
    apellido_paterno VARCHAR(20) NOT NULL,
    apellido_materno VARCHAR(20) NOT NULL,
    fk_id_estado INT NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    fk_id_estado_verificacion INT NOT NULL,
    FOREIGN KEY (fk_id_estado) REFERENCES Estado_secretario (id_estado),
    FOREIGN KEY (fk_id_estado_verificacion) REFERENCES Estado_verificacion (id_estado_verificacion)
);

-- 5. Crear tabla Protocolo
CREATE TABLE Protocolo (
    id_protocolo SERIAL PRIMARY KEY,  -- Cambiado a SERIAL
    nombre VARCHAR(255) NOT NULL,
    fk_id_estado INT NOT NULL,
    comentarios VARCHAR(255),
    ruta_protocolo VARCHAR(255),
    fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (fk_id_estado) REFERENCES Estado_protocolo (id_estado)
);

-- 6. Crear tabla compuesta fk_protocolos_alumno
CREATE TABLE fk_protocolos_alumno (
    fk_id_protocolo INT4 NOT NULL,  -- Usando INT4 (equivalente a INTEGER)
    fk_id_alumno INT4 NOT NULL,     -- Usando INT4 (equivalente a INTEGER)
    PRIMARY KEY (fk_id_protocolo, fk_id_alumno),
    FOREIGN KEY (fk_id_protocolo) REFERENCES Protocolo (id_protocolo),
    FOREIGN KEY (fk_id_alumno) REFERENCES Alumno (id_alumno)
);


-- 7. Crear tabla Estado_final_protocolo
CREATE TABLE Estado_final_protocolo (
    id_decision SERIAL PRIMARY KEY,  -- Cambiado a SERIAL
    fk_id_protocolo INT NOT NULL,
    fk_id_sinodal INT NOT NULL,
    nombre_protocolo VARCHAR(255),
    nombre_sinodal VARCHAR(255),
    verificacion VARCHAR(10),
    comentarios VARCHAR(255),
    FOREIGN KEY (fk_id_protocolo) REFERENCES Protocolo (id_protocolo),
    FOREIGN KEY (fk_id_sinodal) REFERENCES Sinodal (id_sinodal)
);

-- 8. Crear tabla compuesta fk_protocolos_secretario
CREATE TABLE fk_protocolos_secretario (
    fk_id_protocolo INT NOT NULL,
    fk_id_secretario INT NOT NULL,
    PRIMARY KEY (fk_id_protocolo, fk_id_secretario),
    FOREIGN KEY (fk_id_protocolo) REFERENCES Protocolo (id_protocolo),
    FOREIGN KEY (fk_id_secretario) REFERENCES Secretario_CATT (id_secretario_CATT)
);

-- 9. Insertar datos iniciales en las tablas de estados
INSERT INTO Estado_alumno (nombre) VALUES
('Registrado'),
('Activo'),
('Inactivo');

INSERT INTO Estado_verificacion (nombre) VALUES
('Verificado'),
('No Verificado');

INSERT INTO Estado_protocolo (nombre) VALUES
('En revisión'),
('Aprobado'),
('Rechazado');

INSERT INTO Estado_sinodal (nombre) VALUES
('Registrado'),
('Activo'),
('Inactivo');

INSERT INTO Estado_secretario (nombre) VALUES
('Registrado'),
('Activo'),
('Inactivo');

