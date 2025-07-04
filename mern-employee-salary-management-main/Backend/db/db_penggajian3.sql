-- MariaDB dump 10.19  Distrib 10.4.21-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: db_payroll3
-- ------------------------------------------------------

DROP TABLE IF EXISTS `position_data`;
CREATE TABLE `position_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_position` varchar(255) NOT NULL,
  `position_name` varchar(120) NOT NULL,
  `basic_salary` int(50) NOT NULL,
  `transport_allowance` int(50) NOT NULL,
  `meal_allowance` int(50) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `EmployeeDataId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `EmployeeDataId` (`EmployeeDataId`),
  CONSTRAINT `position_data_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `employee_data` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `position_data_ibfk_2` FOREIGN KEY (`EmployeeDataId`) REFERENCES `employee_data` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;


LOCK TABLES `position_data` WRITE;
INSERT INTO `position_data` VALUES (1,'ddfeaa41-b6d1-41e4-877a-26c0f6b32503','HRD',3000,2000,1000,1,'2023-06-06 13:47:52','2023-06-06 13:47:52',NULL),(2,'424fee23-3ef9-45a3-b28a-baa233343e86','Operator Produksi',2000,1000,500,1,'2023-06-06 13:49:08','2023-06-06 13:49:08',NULL);
UNLOCK TABLES;

--
-- Table structure for table `attendance_data`
--

DROP TABLE IF EXISTS `attendance_data`;
CREATE TABLE `attendance_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Month` varchar(15) NOT NULL,
  `nik` varchar(16) NOT NULL,
  `employee_name` varchar(100) NOT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `position_name` varchar(50) DEFAULT NULL,
  `present` int(11) DEFAULT NULL,
  `sickdays` int(11) DEFAULT NULL,
  `absences` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

LOCK TABLES `attendance_data` WRITE;
INSERT INTO `attendance_data` VALUES (1,'juni','112233','Aldi','Laki - Laki','HRD',9,2,1,'2023-06-06 13:47:58','2023-06-06 13:47:58');
UNLOCK TABLES;

--
-- Table structure for table `employee_data`
--

DROP TABLE IF EXISTS `employee_data`;
CREATE TABLE `employee_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_employ` varchar(255) NOT NULL,
  `nik` varchar(16) NOT NULL,
  `employee_name` varchar(100) NOT NULL,
  `username` varchar(120) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `gender` varchar(15) NOT NULL,
  `position` varchar(50) NOT NULL,
  `joining_date` varchar(255) NOT NULL,
  `status` varchar(50) NOT NULL,
  `photo` varchar(100) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `access_rights` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

LOCK TABLES `employee_data` WRITE;
INSERT INTO `employee_data` VALUES (1,'e6be1994-e5c9-471b-8c23-9b2ee6787d86','112233','Aldi','aldi','$argon2id$v=19$m=65536,t=3,p=4$lr7yjbGbEUUVriOfCRonEw$bEHjCI5GeAOBFuQli/GF2zIus0mGZAq3AcD3C2mcwwc','Male','HRD','01-02-23','Permanent employee','7f52d5fd1511704e51cbe30fdb1d8924.jpg','http://localhost:5000/images/7f52d5fd1511704e51cbe30fdb1d8924.jpg','admin','2023-06-06 13:46:29','2023-06-06 13:46:29'),(2,'98788064-fd08-4efa-af45-183db6cfb640','223344','Budi','budi','$argon2id$v=19$m=65536,t=3,p=4$CyodSZT68auVQ42ItRyVxA$zE2CWObkUAjlF6K9ED37aVXFDVyOB9b/V8MkK/dzpKY','Male','Operator Produksi','01-02-23','Permanent employee','7f52d5fd1511704e51cbe30fdb1d8924.jpg','http://localhost:5000/images/7f52d5fd1511704e51cbe30fdb1d8924.jpg','employ','2023-06-06 13:50:02','2023-06-06 13:50:02');
UNLOCK TABLES;

--
-- Table structure for table `salary_deduction`
--

DROP TABLE IF EXISTS `salary_deduction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salary_deduction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deduction` varchar(120) NOT NULL,
  `total_deduction` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salary_deduction`
--

LOCK TABLES `salary_deduction` WRITE;
UNLOCK TABLES;


DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `sessions` WRITE;
INSERT INTO `sessions` VALUES ('KlmCLd9MzrKyzvoXSmq29pFmH7GoFk_3','2023-06-07 13:50:02','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"}}','2023-06-06 13:46:30','2023-06-06 13:50:02'),('VJjZpyQPuOoc-XyZJSSEbghGzEUn-yf8','2023-06-07 13:49:09','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"userId\":\"e6be1994-e5c9-471b-8c23-9b2ee6787d86\"}','2023-06-06 13:43:48','2023-06-06 13:49:09');
UNLOCK TABLES;