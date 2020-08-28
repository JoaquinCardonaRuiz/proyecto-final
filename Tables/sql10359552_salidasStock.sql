-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: sql10.freemysqlhosting.net    Database: sql10359552
-- ------------------------------------------------------
-- Server version	5.5.62-0ubuntu0.14.04.1

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
-- Table structure for table `salidasStock`
--

DROP TABLE IF EXISTS `salidasStock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salidasStock` (
  `idSalida` int(11) NOT NULL AUTO_INCREMENT,
  `idTipoArticulo` int(11) NOT NULL,
  `idEntidad` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `cantidadSalida` float NOT NULL,
  PRIMARY KEY (`idSalida`,`idTipoArticulo`,`idEntidad`,`fecha`,`cantidadSalida`),
  KEY `idTipoArticuloST_idx` (`idTipoArticulo`),
  KEY `idEntidadST_idx` (`idEntidad`),
  CONSTRAINT `idTipoArticuloST` FOREIGN KEY (`idTipoArticulo`) REFERENCES `tiposArticulo` (`idTipoArticulo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idEntidadST` FOREIGN KEY (`idEntidad`) REFERENCES `entidadesDestino` (`idEntidad`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salidasStock`
--

LOCK TABLES `salidasStock` WRITE;
/*!40000 ALTER TABLE `salidasStock` DISABLE KEYS */;
/*!40000 ALTER TABLE `salidasStock` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-28 16:06:43
