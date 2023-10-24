-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: project-nodejs
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `manager` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_departments_employees1_idx` (`manager`),
  CONSTRAINT `fk_departments_employees1` FOREIGN KEY (`manager`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'Sales',1,'2023-10-22 13:52:16','2023-10-22 13:55:38'),(5,'Customers',4,'2023-10-23 11:17:02','2023-10-23 11:17:02');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `start_work_year` int NOT NULL,
  `department_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `department_id_idx` (`department_id`),
  CONSTRAINT `department_id` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'orel','twito',2023,1,'2023-10-22 13:54:34','2023-10-22 13:55:28'),(4,'barak','twito',2021,1,'2023-10-22 13:56:52','2023-10-22 13:56:52'),(7,'itay','twito',2020,5,'2023-10-23 11:17:49','2023-10-23 11:17:49');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shifts`
--

DROP TABLE IF EXISTS `shifts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shifts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `starting_hour` int DEFAULT NULL,
  `ending_hour` int DEFAULT NULL,
  `employees_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_shifts_employees1_idx` (`employees_id`),
  CONSTRAINT `fk_shifts_employees1` FOREIGN KEY (`employees_id`) REFERENCES `employees` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shifts`
--

LOCK TABLES `shifts` WRITE;
/*!40000 ALTER TABLE `shifts` DISABLE KEYS */;
INSERT INTO `shifts` VALUES (1,'2023-10-22 16:54:34',12,15,1,'2023-10-22 14:29:25','2023-10-22 14:29:25'),(2,'2023-10-22 16:54:34',17,18,1,'2023-10-23 14:29:25','2023-10-24 13:07:47'),(4,'2023-10-23 14:54:34',15,18,1,'2023-10-23 10:44:07','2023-10-24 13:07:47'),(5,'2023-10-23 14:54:34',15,18,4,'2023-10-23 10:44:07','2023-10-23 10:44:07'),(6,'2023-10-23 14:54:34',15,18,4,'2023-10-23 10:44:07','2023-10-23 10:44:07'),(7,'2023-10-23 14:54:34',15,18,4,'2023-10-23 10:44:07','2023-10-23 10:44:07'),(8,'2023-10-23 14:54:34',15,18,7,'2023-10-23 10:44:07','2023-10-23 10:44:07');
/*!40000 ALTER TABLE `shifts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `username` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `max_actions` int DEFAULT '5',
  `num_of_actions` int NOT NULL DEFAULT '5',
  `blockActions` tinyint DEFAULT '0',
  `blockedAt` timestamp NULL DEFAULT NULL,
  `jwt_ac_token` varchar(255) DEFAULT NULL,
  `jwt_rf_token` varchar(255) DEFAULT NULL,
  `last_connected` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Leanne Graham','Sincere@april.biz','Bret','1-770-736-8031 x56442',5,4,0,NULL,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiaWF0IjoxNjk4MTUyMjM0LCJleHAiOjE2OTgxNzAyMzR9.omyjpPBk66RuGhd9b2QkucszrPdhb2W8cImLOgO4rGk','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiaWF0IjoxNjk4MTUyMjM0LCJleHAiOjE2OTg3NTcwMzR9.9moSbXGfnwGLl8Tnp1npJ646z_BMBeD50DjtF3HIzOQ','2023-10-24 12:57:15','2023-10-10 15:40:19','2023-10-24 12:57:14'),(2,'Ervin Howell','Shanna@melissa.tv','Antonette','010-692-6593 x09125',5,5,0,NULL,NULL,NULL,'2023-10-22 12:52:12','2023-10-10 15:40:19','2023-10-22 15:00:00'),(3,'Clementine Bauch','Nathan@yesenia.net','Samantha','1-463-123-4447',5,5,0,NULL,NULL,NULL,NULL,'2023-10-10 15:40:19','2023-10-10 15:40:19'),(4,'Patricia Lebsack','Julianne.OConner@kory.org','Karianne','493-170-9623 x156',5,5,0,NULL,NULL,NULL,NULL,'2023-10-10 15:40:19','2023-10-10 15:40:19'),(5,'Chelsey Dietrich','Lucio_Hettinger@annie.ca','Kamren','(254)954-1289',5,5,0,NULL,NULL,NULL,NULL,'2023-10-10 15:40:19','2023-10-10 15:40:19'),(6,'Mrs. Dennis Schulist','Karley_Dach@jasper.info','Leopoldo_Corkery','1-477-935-8478 x6430',5,5,0,NULL,NULL,NULL,NULL,'2023-10-10 15:40:19','2023-10-10 15:40:19'),(7,'Kurtis Weissnat','Telly.Hoeger@billy.biz','Elwyn.Skiles','210.067.6132',5,5,0,NULL,NULL,NULL,NULL,'2023-10-10 15:40:19','2023-10-10 15:40:19'),(8,'Nicholas Runolfsdottir V','Sherwood@rosamond.me','Maxime_Nienow','586.493.6943 x140',5,5,0,NULL,NULL,NULL,NULL,'2023-10-10 15:40:19','2023-10-10 15:40:19'),(9,'Glenna Reichert','Chaim_McDermott@dana.io','Delphine','(775)976-6794 x41206',5,5,0,NULL,NULL,NULL,NULL,'2023-10-10 15:40:19','2023-10-10 15:40:19'),(10,'Clementina DuBuque','Rey.Padberg@karina.biz','Moriah.Stanton','024-648-3804',5,5,0,NULL,NULL,NULL,NULL,'2023-10-10 15:40:19','2023-10-10 15:40:19');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-24 16:45:52
