CREATE DATABASE  IF NOT EXISTS `university` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `university`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: university
-- ------------------------------------------------------
-- Server version	8.2.0

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
-- Table structure for table `course_enrollments`
--

DROP TABLE IF EXISTS `course_enrollments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_enrollments` (
  `idcourse_enrollments` int NOT NULL AUTO_INCREMENT,
  `id_course_offering` int DEFAULT NULL,
  `student_username` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idcourse_enrollments`),
  UNIQUE KEY `student_username_UNIQUE` (`student_username`),
  KEY `offering_enrollments_idx` (`id_course_offering`),
  CONSTRAINT `offering_enrollments` FOREIGN KEY (`id_course_offering`) REFERENCES `course_offering` (`idcourse_offering`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `student_enrollments` FOREIGN KEY (`student_username`) REFERENCES `users` (`username`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_enrollments`
--

LOCK TABLES `course_enrollments` WRITE;
/*!40000 ALTER TABLE `course_enrollments` DISABLE KEYS */;
INSERT INTO `course_enrollments` VALUES (1,1,'user01'),(3,1,'user03'),(4,1,'user05');
/*!40000 ALTER TABLE `course_enrollments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_offering`
--

DROP TABLE IF EXISTS `course_offering`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_offering` (
  `idcourse_offering` int NOT NULL,
  `course_code` char(5) DEFAULT NULL,
  `teacher_username` varchar(20) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `enrollment_ends` date DEFAULT NULL,
  PRIMARY KEY (`idcourse_offering`),
  KEY `course_offering_idx` (`course_code`),
  KEY `users_offering_idx` (`teacher_username`),
  CONSTRAINT `course_offering` FOREIGN KEY (`course_code`) REFERENCES `courses` (`course_code`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `users_offering` FOREIGN KEY (`teacher_username`) REFERENCES `users` (`username`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_offering`
--

LOCK TABLES `course_offering` WRITE;
/*!40000 ALTER TABLE `course_offering` DISABLE KEYS */;
INSERT INTO `course_offering` VALUES (1,'ICT03','user11','2026-03-09','2026-04-30','2026-03-08');
/*!40000 ALTER TABLE `course_offering` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `course_code` char(5) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `credit_points` smallint DEFAULT NULL,
  PRIMARY KEY (`course_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES ('CIV01','Basic of Architecture',4),('ICT01','Databases',5),('ICT02','Basic of JavaScript',5),('ICT03','JavaScript II',7),('ICT04','Basic of C++',5);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grades`
--

DROP TABLE IF EXISTS `grades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grades` (
  `id_grades` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  `course_code` char(5) DEFAULT NULL,
  `grade` smallint DEFAULT NULL,
  `grade_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_grades`),
  KEY `username` (`username`),
  KEY `course_code` (`course_code`),
  CONSTRAINT `grades_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `grades_ibfk_2` FOREIGN KEY (`course_code`) REFERENCES `courses` (`course_code`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grades`
--

LOCK TABLES `grades` WRITE;
/*!40000 ALTER TABLE `grades` DISABLE KEYS */;
INSERT INTO `grades` VALUES (2,'user03','ICT01',4,'2026-01-16 12:51:00'),(3,'user03','ICT02',5,'2026-01-16 12:49:00'),(4,'user03','ICT02',5,'2026-01-16 12:49:00'),(6,'user05','ICT02',5,'2026-01-16 12:49:00'),(7,'user05','ICT03',5,'2026-01-16 12:49:00');
/*!40000 ALTER TABLE `grades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `username` varchar(20) NOT NULL,
  `fname` varchar(30) DEFAULT NULL,
  `lname` varchar(30) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `role` varchar(10) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('user01','Lisa','Jones','ann.jones@gmail.com','student','$2b$12$uFL65kKxj40jFCnK0opT/.ei8gJAB/0TnHKE4McDc3y2PZZax6HrW'),('user02','Ann','Jones','ann.jones@gmail.com','admin','$2b$12$sGzlIOF8OEjTQ5sq8w2R5uiwBSVYoaGCGcKQ2PQwxwezjlRuDFRAu'),('user03','Tim','Jones','tim.jones@gmail.com','student','$2b$12$MEhp/oO282CKDiVJmLWmo.MLdct2TVRiEFYGv4/6LYQ.Ii9V6clXC'),('user05','Tim','Daniels','tim@gmail.com','student','$2b$12$8KieAXpRSUWdb.Gyh24zMOKQL8mfNDaFWNANsT/7AxrTGTzMWMoIe'),('user11','Tim','Daniels','tim@gmail.com','teacher','$2b$12$TdouGOelwhuIqoatpNuqYu23teKJj7uYIlQPy3n.5Ho4wBY5vkW9u');
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

-- Dump completed on 2026-02-20 11:21:44
