/*
SQLyog Ultimate v12.4.3 (64 bit)
MySQL - 10.4.32-MariaDB : Database - arrive_on_time
*********************************************************************
*/

SET NAMES utf8mb4;
SET SQL_MODE = '';
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO';
SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0;

CREATE DATABASE IF NOT EXISTS `arrive_on_time` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `arrive_on_time`;

-- Primero creamos las tablas sin dependencias

DROP TABLE IF EXISTS `user_rol`;
CREATE TABLE `user_rol` (
  `rol_id` int(11) NOT NULL AUTO_INCREMENT,
  `rol_name` varchar(50) NOT NULL,
  PRIMARY KEY (`rol_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `tipo_asistencia`;
CREATE TABLE `tipo_asistencia` (
  `tipo_id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo_asistencia` varchar(200) NOT NULL,
  PRIMARY KEY (`tipo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Luego `users` que depende de `user_rol` y `empresas`
-- Pero primero `empresas` porque `users` depende de ella

DROP TABLE IF EXISTS `empresas`;
CREATE TABLE `empresas` (
  `empresa_id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_empresa` varchar(200) NOT NULL,
  `admin_id` int(11),
  PRIMARY KEY (`empresa_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `cedula` int(10) NOT NULL,
  `correo` varchar(200) NOT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `telefono` varchar(15) NOT NULL,
  `contraseña` varchar(250) NOT NULL,
  `empresa_id` int(11) NOT NULL,
  `rol_id` int(11) NOT NULL,
  `user_img_profile` varchar(255) DEFAULT NULL,
  `user_img_profile_blob` longblob DEFAULT NULL,
  `user_img_profile_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `fk_empresa_id` (`empresa_id`),
  KEY `fk_rol_id` (`rol_id`),
  CONSTRAINT `fk_empresa_id` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`empresa_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_rol_id` FOREIGN KEY (`rol_id`) REFERENCES `user_rol` (`rol_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Ahora que `users` existe, se puede añadir la FK en `empresas`

ALTER TABLE `empresas`
  ADD CONSTRAINT `fk_admin_id` FOREIGN KEY (`admin_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- Finalmente tabla `asistencia`, que depende de `users` y `tipo_asistencia`

DROP TABLE IF EXISTS `asistencia`;
CREATE TABLE `asistencia` (
  `asistencia_id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` varchar(100) NOT NULL,
  `hora` varchar(100) NOT NULL,
  `tipo_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`asistencia_id`),
  KEY `fk_tipo_asistencia` (`tipo_id`),
  KEY `fk_user` (`user_id`),
  CONSTRAINT `fk_tipo_asistencia` FOREIGN KEY (`tipo_id`) REFERENCES `tipo_asistencia` (`tipo_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ======================================
-- DATOS
-- ======================================

LOCK TABLES `user_rol` WRITE;
INSERT INTO `user_rol` (`rol_id`, `rol_name`) VALUES 
(1,'Administrador'), (2,'Empleado'), (8,'Estudiante'), (11,'Prueba');
UNLOCK TABLES;

LOCK TABLES `tipo_asistencia` WRITE;
INSERT INTO `tipo_asistencia` (`tipo_id`, `tipo_asistencia`) VALUES 
(1,'Entrada'), (2,'Salida'), (11,'Reunion');
UNLOCK TABLES;

LOCK TABLES `empresas` WRITE;
INSERT INTO `empresas` (`empresa_id`, `nombre_empresa`, `admin_id`) VALUES 
(3, 'Arrive On Time', 3);
UNLOCK TABLES;

LOCK TABLES `users` WRITE;
INSERT INTO `users` (`user_id`, `nombres`, `apellidos`, `fecha_nacimiento`, `cedula`, `correo`, `direccion`, `telefono`, `contraseña`, `empresa_id`, `rol_id`, `user_img_profile`, `user_img_profile_blob`, `user_img_profile_path`) VALUES
(3,'Juan Esteban','Cuellar Coral','2006-01-15',1120066810,'juanjkuellar24@gmail.com','Mocoa Putumayo','3204860520','$2b$10$ySf64Q/YM3JJaGPP5QtAl.ZgOlDZfo2M37jKbzGPZ.JUaSL/xvpyW',3,1,'http://res.cloudinary.com/deqobdpjv/image/upload/v1743629127/arrive_on_time/vcdxwi9ibnnyt3h2em4y.png',NULL,NULL),
(42,'Nicolas','Melo','2006-02-06',1120066820,'nicolasmelo@gmail.com','cra 7a #1-28','3204860510','$2b$10$eT/OnIXRd7BKkTvX.FjldeVwxSx7p0kP3CuZ3wdnhEB/v7mV8xsdu',3,8,'',NULL,'uploads/profile_42_1744670038417_DiseÃ±o sin tÃ­tulo.png'),
(43,'nicolas','mueses','2006-01-08',1120066830,'nicolasmueses@gmail.com','cra 7a #1-28','3204860500','$2b$10$UBDLeaYaTXGD5zRw5AZ75uSk3JxPCgSKbBSTsq8slkpR6l0/IBJLm',3,1,NULL,NULL,NULL);
UNLOCK TABLES;

LOCK TABLES `asistencia` WRITE;
INSERT INTO `asistencia` (`asistencia_id`, `fecha`, `hora`, `tipo_id`, `user_id`) VALUES 
(26,'7/12/2024','16:08:34',11,42),
(27,'7/12/2024','16:10:11',1,3),
(28,'18/2/2025','15:37:34',11,43),
(29,'18/2/2025','15:39:08',2,3),
(30,'26/2/2025','10:11:23',11,3),
(31,'26/2/2025','21:10:15',1,42),
(34,'7/5/2025','15:45:11',1,3),
(39,'7/5/2025','19:42:49',1,42),
(40,'7/5/2025','15:44:28',1,42);
UNLOCK TABLES;

-- Restaurar los valores previos
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
SET SQL_NOTES=@OLD_SQL_NOTES;
