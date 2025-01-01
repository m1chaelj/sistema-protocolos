-- Crear tablas base (que no dependen de otras tablas)

-- Tabla estado_protocolo
CREATE TABLE estado_protocolo (
    id_estado serial PRIMARY KEY,
    nombre varchar(50) NOT NULL
);

-- Tabla estado_alumno
CREATE TABLE estado_alumno (
    id_estado serial PRIMARY KEY,
    nombre varchar(20) NOT NULL
);

-- Tabla estado_secretario
CREATE TABLE estado_secretario (
    id_estado serial PRIMARY KEY,
    nombre varchar(20) NOT NULL
);

-- Tabla estado_sinodal
CREATE TABLE estado_sinodal (
    id_estado serial PRIMARY KEY,
    nombre varchar(20) NOT NULL
);

-- Tabla estado_verificacion
CREATE TABLE estado_verificacion (
    id_estado_verificacion serial PRIMARY KEY,
    nombre varchar(50) NOT NULL
);

-- Tabla alumno
CREATE TABLE alumno (
    id_alumno serial PRIMARY KEY,
    fk_id_estado int NOT NULL REFERENCES estado_alumno(id_estado),
    fk_id_estado_verificacion int NOT NULL REFERENCES estado_verificacion(id_estado_verificacion),
    nombre varchar(20) NOT NULL,
    apellido_paterno varchar(20) NOT NULL,
    apellido_materno varchar(20) NOT NULL,
    correo_electronico varchar(150) NOT NULL,
    contrasena varchar(255) NOT NULL,
    boleta int NOT NULL UNIQUE
);

-- Tabla sinodal
CREATE TABLE sinodal (
    id_sinodal serial PRIMARY KEY,
    fk_id_estado int NOT NULL REFERENCES estado_sinodal(id_estado),
    fk_id_estado_verificacion int NOT NULL REFERENCES estado_verificacion(id_estado_verificacion),
    nombre varchar(20) NOT NULL,
    apellido_paterno varchar(20) NOT NULL,
    apellido_materno varchar(20) NOT NULL,
    correo_electronico varchar(100) NOT NULL,
    contrasena varchar(255) NOT NULL,
    boleta int NOT NULL,
    academia varchar(5) NOT NULL
);

-- Tabla secretario_catt
CREATE TABLE secretario_catt (
    id_secretario_catt serial PRIMARY KEY,
    fk_id_estado int NOT NULL REFERENCES estado_secretario(id_estado),
    fk_id_estado_verificacion int NOT NULL REFERENCES estado_verificacion(id_estado_verificacion),
    nombre varchar(20) NOT NULL,
    apellido_paterno varchar(20) NOT NULL,
    apellido_materno varchar(20) NOT NULL,
    correo_electronico varchar(150) NOT NULL,
    contrasena varchar(255) NOT NULL,
    boleta int NOT NULL
);

-- Tabla protocolo
CREATE TABLE protocolo (
    id_protocolo serial PRIMARY KEY,
    fk_id_estado int NOT NULL REFERENCES estado_protocolo(id_estado),
    nombre varchar(255) NOT NULL,
    comentarios varchar(255),
    ruta_protocolo varchar(255),
    fecha_subida timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    nombre_primer_director varchar(255) NOT NULL,
    nombre_segundo_director varchar(255),
    registro varchar(10) NOT NULL
);

-- Tabla archivo
CREATE TABLE archivo (
    id_archivo serial PRIMARY KEY,
    nombre varchar(255),
    url varchar(255),
    archivo bytea
);

-- Tabla estado_final_protocolo
CREATE TABLE estado_final_protocolo (
    id_decision serial PRIMARY KEY,
    fk_id_protocolo int NOT NULL REFERENCES protocolo(id_protocolo),
    fk_id_sinodal int NOT NULL REFERENCES sinodal(id_sinodal),
    nombre_protocolo varchar(255),
    nombre_sinodal varchar(255),
    verificacion varchar(10),
    comentarios varchar(255)
);

-- Tabla integrantes
CREATE TABLE integrantes (
    id_integrante serial PRIMARY KEY,
    fk_id_protocolo int REFERENCES protocolo(id_protocolo) ON DELETE CASCADE,
    fk_id_alumno int REFERENCES alumno(id_alumno) ON DELETE CASCADE,
    nombre varchar(255) NOT NULL,
    boleta int NOT NULL UNIQUE,
    nombre_segundo_integrante varchar(255),
    boleta_segundo_integrante int,
    CONSTRAINT unique_alumno_protocolo UNIQUE (fk_id_alumno, fk_id_protocolo)
);

-- Tabla fk_protocolos_alumno
CREATE TABLE fk_protocolos_alumno (
    fk_id_protocolo int NOT NULL REFERENCES protocolo(id_protocolo),
    fk_id_alumno int NOT NULL REFERENCES alumno(id_alumno),
    PRIMARY KEY (fk_id_protocolo, fk_id_alumno)
);

-- Tabla fk_protocolos_secretario
CREATE TABLE fk_protocolos_secretario (
    fk_id_protocolo int NOT NULL REFERENCES protocolo(id_protocolo),
    fk_id_secretario int NOT NULL REFERENCES secretario_catt(id_secretario_catt),
    PRIMARY KEY (fk_id_protocolo, fk_id_secretario)
);

