-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: sql10.freemysqlhosting.net    Database: sql10385459
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
-- Table structure for table `datosEcoPuntos`
--

DROP TABLE IF EXISTS `datosEcoPuntos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `datosEcoPuntos` (
  `idValorVenc` int(11) NOT NULL AUTO_INCREMENT,
  `tiempoVigencia` int(11) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `valor` float DEFAULT NULL,
  `porc_rec_EP` float DEFAULT NULL,
  PRIMARY KEY (`idValorVenc`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datosEcoPuntos`
--

LOCK TABLES `datosEcoPuntos` WRITE;
/*!40000 ALTER TABLE `datosEcoPuntos` DISABLE KEYS */;
INSERT INTO `datosEcoPuntos` VALUES (1,2,'2020-11-09 00:00:00',3,0.5),(2,2,'2020-10-09 00:00:00',7,0.3);
/*!40000 ALTER TABLE `datosEcoPuntos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `depositos`
--

DROP TABLE IF EXISTS `depositos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `depositos` (
  `idDeposito` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(100) DEFAULT NULL,
  `cant` float DEFAULT NULL,
  `fechaReg` datetime DEFAULT NULL,
  `fechaDep` datetime DEFAULT NULL,
  `idMaterial` int(11) NOT NULL,
  `idUsuario` int(11) DEFAULT NULL,
  `idPunto` int(11) NOT NULL,
  `idEcoPuntos` int(11) DEFAULT NULL,
  PRIMARY KEY (`idDeposito`),
  KEY `idMaterial_idx` (`idMaterial`),
  KEY `idUsuario_idx` (`idUsuario`),
  KEY `idEcoPuntos_idx` (`idEcoPuntos`),
  KEY `idPunto_idx` (`idPunto`),
  CONSTRAINT `idEcoPuntos` FOREIGN KEY (`idEcoPuntos`) REFERENCES `ecoPuntos` (`idEcoPuntos`) ON DELETE SET NULL ON UPDATE NO ACTION,
  CONSTRAINT `idMaterial` FOREIGN KEY (`idMaterial`) REFERENCES `materiales` (`idMaterial`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idPunto` FOREIGN KEY (`idPunto`) REFERENCES `puntosDeposito` (`idPunto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `depositos`
--

LOCK TABLES `depositos` WRITE;
/*!40000 ALTER TABLE `depositos` DISABLE KEYS */;
INSERT INTO `depositos` VALUES (1,'384d282d0a32b20f',2,NULL,'2021-03-02 12:18:32',18,5,33,51),(2,'5c1e37df4e330666',4,NULL,'2021-03-02 12:20:48',18,5,33,52);
/*!40000 ALTER TABLE `depositos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direcciones`
--

DROP TABLE IF EXISTS `direcciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `direcciones` (
  `idDireccion` int(11) NOT NULL AUTO_INCREMENT,
  `calle` varchar(60) DEFAULT NULL,
  `altura` int(11) DEFAULT NULL,
  `ciudad` varchar(45) DEFAULT NULL,
  `provincia` varchar(45) DEFAULT NULL,
  `pais` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idDireccion`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direcciones`
--

LOCK TABLES `direcciones` WRITE;
/*!40000 ALTER TABLE `direcciones` DISABLE KEYS */;
INSERT INTO `direcciones` VALUES (33,'San Juan',723,'Rosario','Santa Fe','Argentina'),(34,'Lennox',2345,'Funes','Santa Fe','Argentina'),(37,'Callao',1255,'Rosario','Santa Fe','Argentina'),(42,'Moreno',2047,'Rosario','Santa Fe','Argentina'),(43,'9 de Julio',1000,'Carcarañá','Santa Fe','Argentina'),(44,'Oroño',1300,'Rosario','Santa Fe','Argentina');
/*!40000 ALTER TABLE `direcciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecoPuntos`
--

DROP TABLE IF EXISTS `ecoPuntos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ecoPuntos` (
  `idEcoPuntos` int(11) NOT NULL AUTO_INCREMENT,
  `fechaVencimiento` date NOT NULL,
  `cantidad` float NOT NULL,
  `cantidadRestante` float NOT NULL,
  PRIMARY KEY (`idEcoPuntos`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecoPuntos`
--

LOCK TABLES `ecoPuntos` WRITE;
/*!40000 ALTER TABLE `ecoPuntos` DISABLE KEYS */;
INSERT INTO `ecoPuntos` VALUES (51,'2021-03-04',450,0),(52,'2021-03-04',900,168);
/*!40000 ALTER TABLE `ecoPuntos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entidadesDestino`
--

DROP TABLE IF EXISTS `entidadesDestino`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entidadesDestino` (
  `idEntidad` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `estado` varchar(45) NOT NULL,
  PRIMARY KEY (`idEntidad`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entidadesDestino`
--

LOCK TABLES `entidadesDestino` WRITE;
/*!40000 ALTER TABLE `entidadesDestino` DISABLE KEYS */;
INSERT INTO `entidadesDestino` VALUES (3,'IMACO SRL','disponible'),(4,'Amoplast','disponible');
/*!40000 ALTER TABLE `entidadesDestino` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entradasMat`
--

DROP TABLE IF EXISTS `entradasMat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entradasMat` (
  `idEntradaMat` int(11) NOT NULL AUTO_INCREMENT,
  `idMaterial` int(11) NOT NULL,
  `cant` float DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`idEntradaMat`),
  KEY `idMaterial-EM_idx` (`idMaterial`),
  CONSTRAINT `idMaterial-EM` FOREIGN KEY (`idMaterial`) REFERENCES `materiales` (`idMaterial`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entradasMat`
--

LOCK TABLES `entradasMat` WRITE;
/*!40000 ALTER TABLE `entradasMat` DISABLE KEYS */;
/*!40000 ALTER TABLE `entradasMat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estimaciones`
--

DROP TABLE IF EXISTS `estimaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estimaciones` (
  `idEstimacion` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `estimacion` float DEFAULT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idEstimacion`),
  KEY `idUsuarioEst_idx` (`idUsuario`),
  CONSTRAINT `idUsuarioEst` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estimaciones`
--

LOCK TABLES `estimaciones` WRITE;
/*!40000 ALTER TABLE `estimaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `estimaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horariosPD`
--

DROP TABLE IF EXISTS `horariosPD`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horariosPD` (
  `idHorario` int(11) NOT NULL AUTO_INCREMENT,
  `idPunto` int(11) NOT NULL,
  `horaDesde` time DEFAULT NULL,
  `horaHasta` time DEFAULT NULL,
  `dia` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`idHorario`,`idPunto`),
  KEY `idPuntoDeposito_idx` (`idPunto`),
  CONSTRAINT `idPuntoDeposito` FOREIGN KEY (`idPunto`) REFERENCES `puntosDeposito` (`idPunto`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=204 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horariosPD`
--

LOCK TABLES `horariosPD` WRITE;
/*!40000 ALTER TABLE `horariosPD` DISABLE KEYS */;
INSERT INTO `horariosPD` VALUES (134,33,'08:00:00','20:00:00','Lunes'),(135,33,NULL,NULL,'Martes'),(136,33,'09:00:00','20:00:00','Miércoles'),(137,33,NULL,NULL,'Jueves'),(138,33,'08:00:00','20:00:00','Viernes'),(139,33,'08:00:00','20:00:00','Sábado'),(140,33,'08:00:00','20:00:00','Domingo'),(141,34,'08:00:00','20:00:00','Lunes'),(142,34,'08:00:00','20:00:00','Martes'),(143,34,'08:00:00','20:00:00','Miércoles'),(144,34,'08:00:00','20:00:00','Jueves'),(145,34,'08:00:00','20:00:00','Viernes'),(146,34,'08:00:00','20:00:00','Sábado'),(147,34,'08:00:00','20:00:00','Domingo'),(162,37,'08:00:00','20:00:00','Lunes'),(163,37,'08:00:00','20:00:00','Martes'),(164,37,'08:00:00','20:00:00','Miércoles'),(165,37,'08:00:00','20:00:00','Jueves'),(166,37,'08:00:00','20:00:00','Viernes'),(167,37,'08:00:00','20:00:00','Sábado'),(168,37,'08:00:00','20:00:00','Domingo'),(197,42,'08:00:00','20:00:00','Lunes'),(198,42,'08:00:00','20:00:00','Martes'),(199,42,'08:00:00','20:00:00','Miércoles'),(200,42,'08:00:00','20:00:00','Jueves'),(201,42,'08:00:00','20:00:00','Viernes'),(202,42,'08:00:00','20:00:00','Sábado'),(203,42,'08:00:00','20:00:00','Domingo');
/*!40000 ALTER TABLE `horariosPD` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horariosPR`
--

DROP TABLE IF EXISTS `horariosPR`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horariosPR` (
  `idHorario` int(11) NOT NULL AUTO_INCREMENT,
  `idPunto` int(11) NOT NULL,
  `horaDesde` time DEFAULT NULL,
  `horaHasta` time DEFAULT NULL,
  `dia` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`idHorario`,`idPunto`),
  KEY `idPuntoRetiro_idx` (`idPunto`),
  CONSTRAINT `idPuntoRetiro` FOREIGN KEY (`idPunto`) REFERENCES `puntosRetiro` (`idPunto`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horariosPR`
--

LOCK TABLES `horariosPR` WRITE;
/*!40000 ALTER TABLE `horariosPR` DISABLE KEYS */;
/*!40000 ALTER TABLE `horariosPR` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `insumos`
--

DROP TABLE IF EXISTS `insumos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `insumos` (
  `idInsumo` int(11) NOT NULL AUTO_INCREMENT,
  `stock` float DEFAULT NULL,
  `unidadMedida` varchar(60) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `cProduccion` float DEFAULT NULL,
  `cMateriales` float DEFAULT NULL,
  `cTotal` float DEFAULT NULL,
  `otrosCostos` float DEFAULT NULL,
  `estado` varchar(45) DEFAULT 'disponible',
  `color` varchar(45) DEFAULT '#444444',
  PRIMARY KEY (`idInsumo`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `insumos`
--

LOCK TABLES `insumos` WRITE;
/*!40000 ALTER TABLE `insumos` DISABLE KEYS */;
INSERT INTO `insumos` VALUES (1,0,'Kg','Plastico Reciclado',100,125,347,122,'eliminado','#ff7a75'),(2,0,'Kg','Vidrio Reciclado',75,150,245,20,'eliminado','#5fa8d1'),(3,0,'Tonelada','Tierra Reciclada, ponele',10,895,930,25,'eliminado','#464d84'),(4,0,'ba','ab',14,23,277,240,'eliminado','#a55d8f'),(5,0,'Unidad','Panel Lampara',150,70,245,25,'eliminado','#4cb041'),(6,0,'m2','Cartón Procesado',20,234,274,20,'eliminado','#db3d78'),(7,0,'Kg','Granzas PET',201,400,621,20,'disponible','#70775d'),(8,0,'Kg','Granzas HDPE',200,750,970,20,'disponible','#c1965a'),(9,0,'Kg','Grazas LDPE',100,900,1020,20,'disponible','#070b28'),(10,0,'Kg','Lingote de Aluminio',50,400,472,22,'disponible','#e3155c');
/*!40000 ALTER TABLE `insumos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mat_ins`
--

DROP TABLE IF EXISTS `mat_ins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mat_ins` (
  `idMaterial` int(11) NOT NULL,
  `idInsumo` int(11) NOT NULL,
  `cantidad` float DEFAULT NULL,
  `estado` varchar(45) DEFAULT 'disponible',
  PRIMARY KEY (`idMaterial`,`idInsumo`),
  KEY `fk_mat_ins_2_idx` (`idInsumo`),
  CONSTRAINT `fk_mat_ins_1` FOREIGN KEY (`idMaterial`) REFERENCES `materiales` (`idMaterial`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_mat_ins_2` FOREIGN KEY (`idInsumo`) REFERENCES `insumos` (`idInsumo`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mat_ins`
--

LOCK TABLES `mat_ins` WRITE;
/*!40000 ALTER TABLE `mat_ins` DISABLE KEYS */;
INSERT INTO `mat_ins` VALUES (1,1,200,'deshabilitado'),(1,5,1,'deshabilitado'),(2,2,150,'deshabilitado'),(2,3,32,'deshabilitado'),(3,3,19,'deshabilitado'),(4,5,2,'deshabilitado'),(5,6,1,'deshabilitado'),(8,6,1,'deshabilitado'),(13,6,1,'deshabilitado'),(17,7,4,'disponible'),(18,8,5,'disponible'),(19,9,6,'disponible'),(21,10,2,'disponible');
/*!40000 ALTER TABLE `mat_ins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materiales`
--

DROP TABLE IF EXISTS `materiales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materiales` (
  `idMaterial` int(11) NOT NULL AUTO_INCREMENT,
  `stock` float DEFAULT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `unidadMedida` varchar(60) DEFAULT NULL,
  `costoRecoleccion` float DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT 'disponible',
  PRIMARY KEY (`idMaterial`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materiales`
--

LOCK TABLES `materiales` WRITE;
/*!40000 ALTER TABLE `materiales` DISABLE KEYS */;
INSERT INTO `materiales` VALUES (1,200,'Plástico','kg',10,'#1D7874','eliminado'),(2,100,'Madera','m2',25,'#679289','eliminado'),(3,1000,'Tierra','kg',5,'#F4C095','eliminado'),(4,4000,'Vidrio','kg',30,'#713F64','eliminado'),(5,0,'Arena','Tonelada',104,'#f589c9','eliminado'),(6,0,'Material Test','Kg',200,'#b1ac06','eliminado'),(7,0,'Aluminio','Kg',300,'#63491A','eliminado'),(8,200,'Tela','m2',120,'#2491AA','eliminado'),(12,0,'Concreto','Tonelada',660,'#6a24f4','eliminado'),(13,0,'Bolsas','Unidad',10,'#92e739','eliminado'),(15,0,'TestHab','?',20,'#0dd7cf','eliminado'),(16,0,'TestSus','24',24,'#207e34','eliminado'),(17,0,'Botellas Plastico Transparentes','Kg',100,'#8562e1','habilitado'),(18,0,'Botellas Plastico Productos Limpieza','Kilogramos',150,'#44dc85','habilitado'),(19,0,'Bolsas de Nylon','Kgs',150,'#09794a','suspendido'),(20,0,'Material Test','Unidad',200,'#a4b993','eliminado'),(21,0,'Latas de Aluminio','Kg',200,'#f25563','habilitado');
/*!40000 ALTER TABLE `materiales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modulos`
--

DROP TABLE IF EXISTS `modulos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modulos` (
  `idModulo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idModulo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modulos`
--

LOCK TABLES `modulos` WRITE;
/*!40000 ALTER TABLE `modulos` DISABLE KEYS */;
/*!40000 ALTER TABLE `modulos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movStock`
--

DROP TABLE IF EXISTS `movStock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movStock` (
  `idMov` int(11) NOT NULL AUTO_INCREMENT,
  `idOrigen` int(11) NOT NULL,
  `idDestino` int(11) NOT NULL,
  `idTipoArt` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `cantidad` float DEFAULT NULL,
  PRIMARY KEY (`idMov`),
  KEY `idOrigen-MS_idx` (`idOrigen`),
  KEY `idDestino-MS_idx` (`idDestino`),
  KEY `idTipoArt-MS_idx` (`idTipoArt`),
  CONSTRAINT `idDestino-MS` FOREIGN KEY (`idDestino`) REFERENCES `puntosRetiro` (`idPunto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idOrigen-MS` FOREIGN KEY (`idOrigen`) REFERENCES `puntosRetiro` (`idPunto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idTipoArt-MS` FOREIGN KEY (`idTipoArt`) REFERENCES `tiposArticulo` (`idTipoArticulo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movStock`
--

LOCK TABLES `movStock` WRITE;
/*!40000 ALTER TABLE `movStock` DISABLE KEYS */;
/*!40000 ALTER TABLE `movStock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movStockPrincipal`
--

DROP TABLE IF EXISTS `movStockPrincipal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movStockPrincipal` (
  `idMov` int(11) NOT NULL AUTO_INCREMENT,
  `idDestino` int(11) DEFAULT NULL,
  `idOrgien` int(11) DEFAULT NULL,
  `idTipoArt` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `cantidad` float DEFAULT NULL,
  PRIMARY KEY (`idMov`),
  KEY `idDestino_idx` (`idDestino`),
  KEY `idOrigen_idx` (`idOrgien`),
  KEY `idTipoArt-MSP_idx` (`idTipoArt`),
  CONSTRAINT `idDestino-MSP` FOREIGN KEY (`idDestino`) REFERENCES `puntosRetiro` (`idPunto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idOrigen-MSP` FOREIGN KEY (`idOrgien`) REFERENCES `puntosRetiro` (`idPunto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idTipoArt-MSP` FOREIGN KEY (`idTipoArt`) REFERENCES `tiposArticulo` (`idTipoArticulo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movStockPrincipal`
--

LOCK TABLES `movStockPrincipal` WRITE;
/*!40000 ALTER TABLE `movStockPrincipal` DISABLE KEYS */;
/*!40000 ALTER TABLE `movStockPrincipal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `niveles`
--

DROP TABLE IF EXISTS `niveles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `niveles` (
  `idNivel` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` int(11) DEFAULT NULL,
  `minEcoPuntos` float DEFAULT NULL,
  `maxEcoPuntos` float DEFAULT NULL,
  `descuento` float DEFAULT NULL,
  PRIMARY KEY (`idNivel`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `niveles`
--

LOCK TABLES `niveles` WRITE;
/*!40000 ALTER TABLE `niveles` DISABLE KEYS */;
INSERT INTO `niveles` VALUES (1,1,0,1000,2.5),(11,2,1001,2000,5),(12,3,2001,3000,7.5),(14,4,3001,4000,10),(15,5,4001,5000,12.5),(16,6,5001,6000,15);
/*!40000 ALTER TABLE `niveles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `idPedido` int(11) NOT NULL AUTO_INCREMENT,
  `fechaEnc` datetime DEFAULT NULL,
  `fechaRet` datetime DEFAULT NULL,
  `totalEP` float DEFAULT NULL,
  `totalARS` float DEFAULT NULL,
  `estado` varchar(100) DEFAULT 'disponible',
  `idPunto` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  PRIMARY KEY (`idPedido`),
  KEY `idUsuario_idx` (`idUsuario`),
  KEY `idPuntoPedido_idx` (`idPunto`),
  CONSTRAINT `idPuntoPedido` FOREIGN KEY (`idPunto`) REFERENCES `puntosRetiro` (`idPunto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idUsuarioPedido` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permisosAcceso`
--

DROP TABLE IF EXISTS `permisosAcceso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permisosAcceso` (
  `idTipoUsuario` int(11) NOT NULL,
  `idModulo` int(11) NOT NULL,
  KEY `idModulo_idx` (`idModulo`),
  KEY `idTipoUsuarioPA_idx` (`idTipoUsuario`),
  CONSTRAINT `idModulo` FOREIGN KEY (`idModulo`) REFERENCES `modulos` (`idModulo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idTipoUsuarioPA` FOREIGN KEY (`idTipoUsuario`) REFERENCES `tiposUsuario` (`idTipoUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permisosAcceso`
--

LOCK TABLES `permisosAcceso` WRITE;
/*!40000 ALTER TABLE `permisosAcceso` DISABLE KEYS */;
/*!40000 ALTER TABLE `permisosAcceso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plantas`
--

DROP TABLE IF EXISTS `plantas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plantas` (
  `idPlanta` int(11) NOT NULL AUTO_INCREMENT,
  `puntajeRiego` int(11) NOT NULL,
  `puntajeSol` int(11) NOT NULL,
  `puntajeTemp` int(11) NOT NULL,
  PRIMARY KEY (`idPlanta`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plantas`
--

LOCK TABLES `plantas` WRITE;
/*!40000 ALTER TABLE `plantas` DISABLE KEYS */;
/*!40000 ALTER TABLE `plantas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prodInsumos`
--

DROP TABLE IF EXISTS `prodInsumos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prodInsumos` (
  `idprodInsumo` int(11) NOT NULL AUTO_INCREMENT,
  `idInusmo` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `cantidad` float DEFAULT NULL,
  PRIMARY KEY (`idprodInsumo`),
  KEY `idIns_idx` (`idInusmo`),
  CONSTRAINT `idIns` FOREIGN KEY (`idInusmo`) REFERENCES `insumos` (`idInsumo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prodInsumos`
--

LOCK TABLES `prodInsumos` WRITE;
/*!40000 ALTER TABLE `prodInsumos` DISABLE KEYS */;
/*!40000 ALTER TABLE `prodInsumos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prodTipArt`
--

DROP TABLE IF EXISTS `prodTipArt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prodTipArt` (
  `idProdTipArt` int(11) NOT NULL AUTO_INCREMENT,
  `idTipoArticulo` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `cantidad` float DEFAULT NULL,
  PRIMARY KEY (`idProdTipArt`),
  KEY `idTipArt_idx` (`idTipoArticulo`),
  CONSTRAINT `idTipArt` FOREIGN KEY (`idTipoArticulo`) REFERENCES `tiposArticulo` (`idTipoArticulo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prodTipArt`
--

LOCK TABLES `prodTipArt` WRITE;
/*!40000 ALTER TABLE `prodTipArt` DISABLE KEYS */;
/*!40000 ALTER TABLE `prodTipArt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `puntosDep_mat`
--

DROP TABLE IF EXISTS `puntosDep_mat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `puntosDep_mat` (
  `idDepMat` int(11) NOT NULL AUTO_INCREMENT,
  `idMaterial` int(11) NOT NULL,
  `idPunto` int(11) NOT NULL,
  `estado` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idDepMat`,`idMaterial`,`idPunto`),
  KEY `idPuntoDM_idx` (`idPunto`),
  KEY `idMaterialDM` (`idMaterial`),
  CONSTRAINT `idMaterialDM` FOREIGN KEY (`idMaterial`) REFERENCES `materiales` (`idMaterial`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idPuntoDM` FOREIGN KEY (`idPunto`) REFERENCES `puntosDeposito` (`idPunto`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `puntosDep_mat`
--

LOCK TABLES `puntosDep_mat` WRITE;
/*!40000 ALTER TABLE `puntosDep_mat` DISABLE KEYS */;
INSERT INTO `puntosDep_mat` VALUES (48,1,32,'eliminado'),(49,4,32,'eliminado'),(50,8,32,'eliminado'),(51,13,32,'eliminado'),(52,13,32,'eliminado'),(53,13,32,'eliminado'),(54,1,33,'eliminado'),(55,1,33,'eliminado'),(56,8,32,'eliminado'),(57,1,32,'eliminado'),(58,8,32,'eliminado'),(59,13,32,'eliminado'),(60,4,34,'eliminado'),(61,1,34,'eliminado'),(62,8,34,'eliminado'),(63,1,32,'eliminado'),(64,13,33,'disponible'),(65,1,32,'eliminado'),(66,13,32,'eliminado'),(67,1,34,'eliminado'),(68,13,34,'eliminado'),(69,12,34,'eliminado'),(70,12,33,'disponible'),(71,4,33,'disponible'),(72,1,33,'disponible'),(73,5,33,'disponible'),(74,8,33,'disponible'),(75,8,37,'disponible'),(76,4,37,'disponible'),(77,1,34,'disponible'),(78,13,34,'disponible'),(79,13,42,'eliminado'),(80,5,42,'eliminado'),(81,17,37,'disponible'),(82,19,37,'disponible'),(83,18,42,'disponible'),(84,19,42,'disponible'),(85,17,33,'disponible'),(86,18,33,'disponible');
/*!40000 ALTER TABLE `puntosDep_mat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `puntosDeposito`
--

DROP TABLE IF EXISTS `puntosDeposito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `puntosDeposito` (
  `idPunto` int(11) NOT NULL AUTO_INCREMENT,
  `estado` tinyint(4) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `estadoEliminacion` varchar(45) DEFAULT NULL,
  `idDireccion` int(11) DEFAULT NULL,
  PRIMARY KEY (`idPunto`),
  KEY `idDireccionPD_idx` (`idDireccion`),
  CONSTRAINT `idDireccionPD` FOREIGN KEY (`idDireccion`) REFERENCES `direcciones` (`idDireccion`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `puntosDeposito`
--

LOCK TABLES `puntosDeposito` WRITE;
/*!40000 ALTER TABLE `puntosDeposito` DISABLE KEYS */;
INSERT INTO `puntosDeposito` VALUES (32,1,'Barrio Lourdes','eliminado',NULL),(33,1,'Roldán','disponible',33),(34,1,'Funes','disponible',34),(35,1,'Barrio Lourdes','eliminado',NULL),(36,1,'a','eliminado',NULL),(37,1,'Barrio Lourdes','disponible',37),(38,1,'SinMateriales','eliminado',NULL),(39,1,'SinMateriales','eliminado',NULL),(40,1,'SinMats','eliminado',NULL),(41,1,'NombreTest','eliminado',NULL),(42,1,'Carcarañá','disponible',43);
/*!40000 ALTER TABLE `puntosDeposito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `puntosRetiro`
--

DROP TABLE IF EXISTS `puntosRetiro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `puntosRetiro` (
  `idPunto` int(11) NOT NULL AUTO_INCREMENT,
  `estado` varchar(100) DEFAULT NULL,
  `demoraFija` int(11) DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `idDireccion` int(11) DEFAULT NULL,
  PRIMARY KEY (`idPunto`),
  KEY `idDireccionPR_idx` (`idDireccion`),
  CONSTRAINT `idDireccionPR` FOREIGN KEY (`idDireccion`) REFERENCES `direcciones` (`idDireccion`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `puntosRetiro`
--

LOCK TABLES `puntosRetiro` WRITE;
/*!40000 ALTER TABLE `puntosRetiro` DISABLE KEYS */;
INSERT INTO `puntosRetiro` VALUES (1,'habilitado',5,'Zona Centro',37),(2,'habilitado',4,'Funes',37),(3,'habilitado',4,'Fisherton',37),(4,'habilitado',2,'Zona Sur',37);
/*!40000 ALTER TABLE `puntosRetiro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recomendaciones`
--

DROP TABLE IF EXISTS `recomendaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recomendaciones` (
  `idRecomendacion` int(11) NOT NULL AUTO_INCREMENT,
  `idPlanta` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `puntajeRiego` int(11) DEFAULT NULL,
  `puntajeSol` int(11) DEFAULT NULL,
  `puntajetemp` int(11) DEFAULT NULL,
  PRIMARY KEY (`idRecomendacion`,`idPlanta`,`idUsuario`),
  KEY `idPlanta_idx` (`idPlanta`),
  KEY `idUsuarioRec_idx` (`idUsuario`),
  CONSTRAINT `idPlanta` FOREIGN KEY (`idPlanta`) REFERENCES `plantas` (`idPlanta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idUsuarioRec` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recomendaciones`
--

LOCK TABLES `recomendaciones` WRITE;
/*!40000 ALTER TABLE `recomendaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `recomendaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salidasMun`
--

DROP TABLE IF EXISTS `salidasMun`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salidasMun` (
  `idSalidaMun` int(11) NOT NULL AUTO_INCREMENT,
  `idTipoArticulo` int(11) NOT NULL,
  `cantSalida` float DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`idSalidaMun`),
  KEY `idTipoArt-SM_idx` (`idTipoArticulo`),
  CONSTRAINT `idTipoArt-SM` FOREIGN KEY (`idTipoArticulo`) REFERENCES `tiposArticulo` (`idTipoArticulo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salidasMun`
--

LOCK TABLES `salidasMun` WRITE;
/*!40000 ALTER TABLE `salidasMun` DISABLE KEYS */;
/*!40000 ALTER TABLE `salidasMun` ENABLE KEYS */;
UNLOCK TABLES;

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
  `valorTotal` float NOT NULL,
  PRIMARY KEY (`idSalida`,`idTipoArticulo`,`idEntidad`),
  KEY `idEntidadST_idx` (`idEntidad`),
  KEY `idTipoArticuloST_idx` (`idTipoArticulo`),
  CONSTRAINT `idTipoArticuloST` FOREIGN KEY (`idTipoArticulo`) REFERENCES `tiposArticulo` (`idTipoArticulo`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salidasStock`
--

LOCK TABLES `salidasStock` WRITE;
/*!40000 ALTER TABLE `salidasStock` DISABLE KEYS */;
/*!40000 ALTER TABLE `salidasStock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stockPuntosRetiro`
--

DROP TABLE IF EXISTS `stockPuntosRetiro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stockPuntosRetiro` (
  `idPunto` int(11) NOT NULL,
  `idTipoArticulo` int(11) NOT NULL,
  `stock` float NOT NULL,
  KEY `idPuntoSPR_idx` (`idPunto`),
  KEY `idTipoArticuloSPR_idx` (`idTipoArticulo`),
  CONSTRAINT `idPuntoSPR` FOREIGN KEY (`idPunto`) REFERENCES `puntosRetiro` (`idPunto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idTipoArticuloSPR` FOREIGN KEY (`idTipoArticulo`) REFERENCES `tiposArticulo` (`idTipoArticulo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stockPuntosRetiro`
--

LOCK TABLES `stockPuntosRetiro` WRITE;
/*!40000 ALTER TABLE `stockPuntosRetiro` DISABLE KEYS */;
/*!40000 ALTER TABLE `stockPuntosRetiro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tiposArt_ins`
--

DROP TABLE IF EXISTS `tiposArt_ins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tiposArt_ins` (
  `idTipoArticulo` int(11) NOT NULL,
  `idInsumo` int(11) NOT NULL,
  `cantidad` float DEFAULT NULL,
  `estado` varchar(45) DEFAULT 'disponible',
  PRIMARY KEY (`idTipoArticulo`,`idInsumo`),
  KEY `idInsumo_idx` (`idInsumo`),
  CONSTRAINT `idInsumo` FOREIGN KEY (`idInsumo`) REFERENCES `insumos` (`idInsumo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idTipoArt` FOREIGN KEY (`idTipoArticulo`) REFERENCES `tiposArticulo` (`idTipoArticulo`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tiposArt_ins`
--

LOCK TABLES `tiposArt_ins` WRITE;
/*!40000 ALTER TABLE `tiposArt_ins` DISABLE KEYS */;
INSERT INTO `tiposArt_ins` VALUES (28,8,2,'disponible');
/*!40000 ALTER TABLE `tiposArt_ins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tiposArt_pedidos`
--

DROP TABLE IF EXISTS `tiposArt_pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tiposArt_pedidos` (
  `idTipoArticulo` int(11) NOT NULL,
  `idPedido` int(11) NOT NULL,
  `cantidad` float DEFAULT NULL,
  PRIMARY KEY (`idTipoArticulo`,`idPedido`),
  KEY `idPedidoPed_idx` (`idPedido`),
  CONSTRAINT `idPedidoPed` FOREIGN KEY (`idPedido`) REFERENCES `pedidos` (`idPedido`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idTipoArtPed` FOREIGN KEY (`idTipoArticulo`) REFERENCES `tiposArticulo` (`idTipoArticulo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tiposArt_pedidos`
--

LOCK TABLES `tiposArt_pedidos` WRITE;
/*!40000 ALTER TABLE `tiposArt_pedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `tiposArt_pedidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tiposArticulo`
--

DROP TABLE IF EXISTS `tiposArticulo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tiposArticulo` (
  `idTipoArticulo` int(11) NOT NULL AUTO_INCREMENT,
  `stock` float DEFAULT NULL,
  `margenGanancia` float DEFAULT NULL,
  `unidadMedida` varchar(60) CHARACTER SET latin1 DEFAULT NULL,
  `nombre` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `cProduccion` float DEFAULT NULL,
  `cInsumos` float DEFAULT NULL,
  `cTotal` float DEFAULT NULL,
  `cObtencionAlt` float DEFAULT NULL,
  `otrosCostos` float DEFAULT NULL,
  `img` varchar(1000) DEFAULT NULL,
  `vUsuario` tinyint(4) DEFAULT NULL,
  `estado` varchar(45) DEFAULT 'disponible',
  `descripcion` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`idTipoArticulo`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin2;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tiposArticulo`
--

LOCK TABLES `tiposArticulo` WRITE;
/*!40000 ALTER TABLE `tiposArticulo` DISABLE KEYS */;
INSERT INTO `tiposArticulo` VALUES (28,200,0.1,'Unidades','Ladrillos de Plastico',100,1940,2060,2300,20,'https://cdn.lavoz.com.ar/sites/default/files/styles/width_1072/public/nota_periodistica/Ladrillos_plasticos_1.jpg',1,'disponible',NULL);
/*!40000 ALTER TABLE `tiposArticulo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tiposDocumento`
--

DROP TABLE IF EXISTS `tiposDocumento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tiposDocumento` (
  `idTipoDoc` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idTipoDoc`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tiposDocumento`
--

LOCK TABLES `tiposDocumento` WRITE;
/*!40000 ALTER TABLE `tiposDocumento` DISABLE KEYS */;
INSERT INTO `tiposDocumento` VALUES (1,'DNI','habilitado'),(2,'LC','habilitado'),(3,'LE','habilitado'),(4,'CI','habilitado');
/*!40000 ALTER TABLE `tiposDocumento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tiposUsuario`
--

DROP TABLE IF EXISTS `tiposUsuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tiposUsuario` (
  `idTipoUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idTipoUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COMMENT='	';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tiposUsuario`
--

LOCK TABLES `tiposUsuario` WRITE;
/*!40000 ALTER TABLE `tiposUsuario` DISABLE KEYS */;
INSERT INTO `tiposUsuario` VALUES (1,'Ciudadano'),(2,'Administrador Total');
/*!40000 ALTER TABLE `tiposUsuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `nroDoc` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `nombre` varchar(150) DEFAULT NULL,
  `apellido` varchar(150) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `idTipoUsuario` int(11) NOT NULL,
  `idTipoDoc` int(11) NOT NULL,
  `idDireccion` int(11) NOT NULL,
  `idNivel` int(11) NOT NULL,
  PRIMARY KEY (`idUsuario`),
  KEY `idTipoDoc_idx` (`idTipoDoc`),
  KEY `idTipoUsuario_idx` (`idTipoUsuario`),
  KEY `idDireccion_idx` (`idDireccion`),
  KEY `idNivelUsuario_idx` (`idNivel`),
  CONSTRAINT `idDireccion` FOREIGN KEY (`idDireccion`) REFERENCES `direcciones` (`idDireccion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idNivelUsuario` FOREIGN KEY (`idNivel`) REFERENCES `niveles` (`idNivel`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idTipoDoc` FOREIGN KEY (`idTipoDoc`) REFERENCES `tiposDocumento` (`idTipoDoc`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idTipoUsuario` FOREIGN KEY (`idTipoUsuario`) REFERENCES `tiposUsuario` (`idTipoUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (5,'41028971','proyectoFinal1','Juan','Garcia','proyecto@final.com',2,1,44,1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `valoresTipArt`
--

DROP TABLE IF EXISTS `valoresTipArt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `valoresTipArt` (
  `idValor` int(11) NOT NULL AUTO_INCREMENT,
  `idTipoArticulo` int(11) NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `valor` float DEFAULT NULL,
  PRIMARY KEY (`idValor`,`idTipoArticulo`),
  KEY `idTipoArticulo_idx` (`idTipoArticulo`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `valoresTipArt`
--

LOCK TABLES `valoresTipArt` WRITE;
/*!40000 ALTER TABLE `valoresTipArt` DISABLE KEYS */;
INSERT INTO `valoresTipArt` VALUES (1,15,'2021-02-04 22:07:05',425.5),(2,16,'2021-02-04 22:07:42',750),(5,15,'2021-02-04 22:23:46',460),(6,17,'2021-02-08 16:01:08',888),(7,15,'2021-02-09 22:10:36',414.8),(8,20,'2021-02-19 21:12:43',780),(9,21,'2021-02-19 21:15:12',936),(10,22,'2021-02-19 21:17:57',1008.28),(11,23,'2021-02-26 11:36:35',376.2),(12,24,'2021-02-26 11:39:07',195.5),(13,25,'2021-02-26 11:42:17',693),(14,26,'2021-02-26 11:43:31',517.5),(15,27,'2021-03-03 17:00:29',2224.8),(16,28,'2021-03-03 17:15:24',2266),(17,28,'2021-03-03 23:21:52',2307.2),(18,28,'2021-03-03 23:22:51',2266);
/*!40000 ALTER TABLE `valoresTipArt` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-05 10:09:39
