-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: eco-asistente-proyecto-final.mysql.database.azure.com    Database: ecoasistente
-- ------------------------------------------------------
-- Server version	5.6.47.0

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
-- Table structure for table `tiposArticulo`
--

DROP TABLE IF EXISTS `tiposArticulo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tiposArticulo` (
  `idTipoArticulo` int(11) NOT NULL AUTO_INCREMENT,
  `stock` int(11) DEFAULT NULL,
  `margenGanancia` float DEFAULT NULL,
  `unidadMedida` varchar(60) CHARACTER SET latin1 DEFAULT NULL,
  `nombre` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `cProduccion` float DEFAULT NULL,
  `cMateriales` float DEFAULT NULL,
  `cTotal` float DEFAULT NULL,
  PRIMARY KEY (`idTipoArticulo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin2;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tiposArticulo`
--

LOCK TABLES `tiposArticulo` WRITE;
/*!40000 ALTER TABLE `tiposArticulo` DISABLE KEYS */;
/*!40000 ALTER TABLE `tiposArticulo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-02 16:11:17
