CREATE DATABASE usuario;

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) ,
  apellido VARCHAR(50) ,
  correo VARCHAR(100) ,
  telefono VARCHAR(20) ,
  direccion VARCHAR(255) 
);

 INSERT INTO usuarios (nombre,apellido,correo,telefono,direccion) VALUES('Camilo','agrace', 'txamssk@gmail.com', '316383844','cra 33');