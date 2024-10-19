/*
SQLyog Ultimate v12.4.3 (64 bit)
MySQL - 10.4.32-MariaDB : Database - arrive_on_time
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Data for the table `asistencia` */

LOCK TABLES `asistencia` WRITE;

insert  into `asistencia`(`asistencia_id`,`fecha`,`hora`,`tipo_id`,`user_id`) values 
(2,'2024-10-12','06:20:00',1,22),
(4,'2024-10-12','06:27:00',2,22),
(5,'0000-00-00','07:29:00',1,22),
(6,'2024-10-12','07:30:00',2,22);

UNLOCK TABLES;

/*Data for the table `empresas` */

LOCK TABLES `empresas` WRITE;

insert  into `empresas`(`empresa_id`,`nombre_empresa`,`admin_id`) values 
(3,'Arrive On Time',3),
(4,'Example Company',3);

UNLOCK TABLES;

/*Data for the table `tipo_asistencia` */

LOCK TABLES `tipo_asistencia` WRITE;

insert  into `tipo_asistencia`(`tipo_id`,`tipo_asistencia`) values 
(1,'Entrada'),
(2,'Salida'),
(3,'Receso');

UNLOCK TABLES;

/*Data for the table `user_rol` */

LOCK TABLES `user_rol` WRITE;

insert  into `user_rol`(`rol_id`,`rol_name`) values 
(1,'administrador'),
(2,'empleado'),
(4,'Admin Aux');

UNLOCK TABLES;

/*Data for the table `users` */

LOCK TABLES `users` WRITE;

insert  into `users`(`user_id`,`nombres`,`apellidos`,`edad`,`cedula`,`correo`,`direccion`,`telefono`,`contraseña`,`empresa_id`,`rol_id`) values 
(3,'Juan Esteban','Cuellar Coral',18,1120066810,'juanjkuellar24@gmail.com','Mocoa Putumayo','3204860520','$2b$10$ySf64Q/YM3JJaGPP5QtAl.ZgOlDZfo2M37jKbzGPZ.JUaSL/xvpyW',3,1),
(22,'Nicolas','Melo',18,1120322410,'nicolasmelo@gmail.com','mocoa','3204860520','$2b$10$LsgOAKBGlXhfjXmTlXb01uJSMr.qFcOmTWlhuxK4/MmPPEpx4/nLW',3,2);

UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
