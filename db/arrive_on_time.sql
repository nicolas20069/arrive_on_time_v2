/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: asistencia
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `asistencia` (
  `asistencia_id` int NOT NULL AUTO_INCREMENT,
  `fecha` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `hora` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `tipo_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`asistencia_id`),
  KEY `fk_tipo_asistencia` (`tipo_id`),
  KEY `fk_user` (`user_id`),
  CONSTRAINT `fk_tipo_asistencia` FOREIGN KEY (`tipo_id`) REFERENCES `tipo_asistencia` (`tipo_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 41 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: empresas
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `empresas` (
  `empresa_id` int NOT NULL AUTO_INCREMENT,
  `nombre_empresa` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `admin_id` int DEFAULT NULL,
  PRIMARY KEY (`empresa_id`),
  KEY `fk_admin_id` (`admin_id`),
  CONSTRAINT `fk_admin_id` FOREIGN KEY (`admin_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: tipo_asistencia
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `tipo_asistencia` (
  `tipo_id` int NOT NULL AUTO_INCREMENT,
  `tipo_asistencia` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`tipo_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: user_rol
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `user_rol` (
  `rol_id` int NOT NULL AUTO_INCREMENT,
  `rol_name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`rol_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# SCHEMA DUMP FOR TABLE: users
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `apellidos` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `cedula` int NOT NULL,
  `correo` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `direccion` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `telefono` varchar(15) COLLATE utf8mb4_general_ci NOT NULL,
  `contraseña` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `empresa_id` int NOT NULL,
  `rol_id` int NOT NULL,
  `user_img_profile` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_img_profile_blob` longblob,
  `user_img_profile_path` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `fk_empresa_id` (`empresa_id`),
  KEY `fk_rol_id` (`rol_id`),
  CONSTRAINT `fk_empresa_id` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`empresa_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_rol_id` FOREIGN KEY (`rol_id`) REFERENCES `user_rol` (`rol_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 45 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: asistencia
# ------------------------------------------------------------

INSERT INTO
  `asistencia` (
    `asistencia_id`,
    `fecha`,
    `hora`,
    `tipo_id`,
    `user_id`
  )
VALUES
  (26, '7/12/2024', '16:08:34', 11, 42);
INSERT INTO
  `asistencia` (
    `asistencia_id`,
    `fecha`,
    `hora`,
    `tipo_id`,
    `user_id`
  )
VALUES
  (27, '7/12/2024', '16:10:11', 1, 3);
INSERT INTO
  `asistencia` (
    `asistencia_id`,
    `fecha`,
    `hora`,
    `tipo_id`,
    `user_id`
  )
VALUES
  (28, '18/2/2025', '15:37:34', 11, 43);
INSERT INTO
  `asistencia` (
    `asistencia_id`,
    `fecha`,
    `hora`,
    `tipo_id`,
    `user_id`
  )
VALUES
  (29, '18/2/2025', '15:39:08', 2, 3);
INSERT INTO
  `asistencia` (
    `asistencia_id`,
    `fecha`,
    `hora`,
    `tipo_id`,
    `user_id`
  )
VALUES
  (30, '26/2/2025', '10:11:23', 11, 3);
INSERT INTO
  `asistencia` (
    `asistencia_id`,
    `fecha`,
    `hora`,
    `tipo_id`,
    `user_id`
  )
VALUES
  (31, '26/2/2025', '21:10:15', 1, 42);
INSERT INTO
  `asistencia` (
    `asistencia_id`,
    `fecha`,
    `hora`,
    `tipo_id`,
    `user_id`
  )
VALUES
  (34, '7/5/2025', '15:45:11', 1, 3);
INSERT INTO
  `asistencia` (
    `asistencia_id`,
    `fecha`,
    `hora`,
    `tipo_id`,
    `user_id`
  )
VALUES
  (39, '7/5/2025', '19:42:49', 1, 42);
INSERT INTO
  `asistencia` (
    `asistencia_id`,
    `fecha`,
    `hora`,
    `tipo_id`,
    `user_id`
  )
VALUES
  (40, '7/5/2025', '15:44:28', 1, 42);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: empresas
# ------------------------------------------------------------

INSERT INTO
  `empresas` (`empresa_id`, `nombre_empresa`, `admin_id`)
VALUES
  (3, 'Arrive On Time', 3);

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: tipo_asistencia
# ------------------------------------------------------------

INSERT INTO
  `tipo_asistencia` (`tipo_id`, `tipo_asistencia`)
VALUES
  (1, 'Entrada');
INSERT INTO
  `tipo_asistencia` (`tipo_id`, `tipo_asistencia`)
VALUES
  (2, 'Salida');
INSERT INTO
  `tipo_asistencia` (`tipo_id`, `tipo_asistencia`)
VALUES
  (11, 'Reunion');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: user_rol
# ------------------------------------------------------------

INSERT INTO
  `user_rol` (`rol_id`, `rol_name`)
VALUES
  (1, 'Administrador');
INSERT INTO
  `user_rol` (`rol_id`, `rol_name`)
VALUES
  (2, 'Empleado');
INSERT INTO
  `user_rol` (`rol_id`, `rol_name`)
VALUES
  (8, 'Estudiante');
INSERT INTO
  `user_rol` (`rol_id`, `rol_name`)
VALUES
  (11, 'Prueba');

# ------------------------------------------------------------
# DATA DUMP FOR TABLE: users
# ------------------------------------------------------------

INSERT INTO
  `users` (
    `user_id`,
    `nombres`,
    `apellidos`,
    `fecha_nacimiento`,
    `cedula`,
    `correo`,
    `direccion`,
    `telefono`,
    `contraseña`,
    `empresa_id`,
    `rol_id`,
    `user_img_profile`,
    `user_img_profile_blob`,
    `user_img_profile_path`
  )
VALUES
  (
    3,
    'Juan Esteban',
    'Cuellar Coral',
    '2006-01-15',
    1120066810,
    'juanjkuellar24@gmail.com',
    'Mocoa Putumayo',
    '3204860520',
    '$2b$10$ySf64Q/YM3JJaGPP5QtAl.ZgOlDZfo2M37jKbzGPZ.JUaSL/xvpyW',
    3,
    1,
    'http://res.cloudinary.com/deqobdpjv/image/upload/v1743629127/arrive_on_time/vcdxwi9ibnnyt3h2em4y.png',
    NULL,
    NULL
  );
INSERT INTO
  `users` (
    `user_id`,
    `nombres`,
    `apellidos`,
    `fecha_nacimiento`,
    `cedula`,
    `correo`,
    `direccion`,
    `telefono`,
    `contraseña`,
    `empresa_id`,
    `rol_id`,
    `user_img_profile`,
    `user_img_profile_blob`,
    `user_img_profile_path`
  )
VALUES
  (
    42,
    'Nicolas',
    'Melo',
    '2006-02-06',
    1120066820,
    'nicolasmelo@gmail.com',
    'cra 7a #1-28',
    '3204860510',
    '$2b$10$eT/OnIXRd7BKkTvX.FjldeVwxSx7p0kP3CuZ3wdnhEB/v7mV8xsdu',
    3,
    8,
    '',
    NULL,
    'uploads/profile_42_1744670038417_DiseÃ±o sin tÃ­tulo.png'
  );
INSERT INTO
  `users` (
    `user_id`,
    `nombres`,
    `apellidos`,
    `fecha_nacimiento`,
    `cedula`,
    `correo`,
    `direccion`,
    `telefono`,
    `contraseña`,
    `empresa_id`,
    `rol_id`,
    `user_img_profile`,
    `user_img_profile_blob`,
    `user_img_profile_path`
  )
VALUES
  (
    43,
    'nicolas',
    'mueses',
    '2006-01-08',
    1120066830,
    'nicolasmueses@gmail.com',
    'cra 7a #1-28',
    '3204860500',
    '$2b$10$UBDLeaYaTXGD5zRw5AZ75uSk3JxPCgSKbBSTsq8slkpR6l0/IBJLm',
    3,
    1,
    NULL,
    NULL,
    NULL
  );
INSERT INTO
  `users` (
    `user_id`,
    `nombres`,
    `apellidos`,
    `fecha_nacimiento`,
    `cedula`,
    `correo`,
    `direccion`,
    `telefono`,
    `contraseña`,
    `empresa_id`,
    `rol_id`,
    `user_img_profile`,
    `user_img_profile_blob`,
    `user_img_profile_path`
  )
VALUES
  (
    44,
    'Admin',
    'Arrive On Time',
    '2025-06-04',
    1111111111,
    'admin@arriveontime.com',
    'arrive_on_time',
    '1111111111',
    '$2b$10$pxGJpCi4pKzDmT55DtfQR.ioBnZobpolztFIF7PBtKnM8rxdqkhCu',
    3,
    1,
    NULL,
    NULL,
    NULL
  );

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
