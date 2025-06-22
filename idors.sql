-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 30, 2025 at 09:10 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `idor`
--

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

CREATE TABLE `friends` (
  `FriendshipID` int(11) DEFAULT NULL,
  `UserID1` varchar(50) DEFAULT NULL,
  `UserID2` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `friends`
--

INSERT INTO `friends` (`FriendshipID`, `UserID1`, `UserID2`) VALUES
(1, '9da586a5-06c8-4201-be29-c5aca6187523', '3d4da6cc-64eb-4b54-b979-40f0b5de4d4e'),
(2, '9da586a5-06c8-4201-be29-c5aca6187523', 'f5b3f205-169a-471d-8bb3-7ff20f5f725c'),
(3, '9da586a5-06c8-4201-be29-c5aca6187523', '2f684d22-d583-4c2b-921b-cee294f8bf2c');

-- --------------------------------------------------------

--
-- Table structure for table `msuser`
--

CREATE TABLE `msuser` (
  `UserID` varchar(50) NOT NULL,
  `Username` varchar(50) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Password` varchar(50) DEFAULT NULL,
  `Description` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `msuser`
--

INSERT INTO `msuser` (`UserID`, `Username`, `Email`, `Password`, `Description`) VALUES
('2f684d22-d583-4c2b-921b-cee294f8bf2c', 'John', 'john@gmail.com', 'JohnJohn123#', ''),
('3d4da6cc-64eb-4b54-b979-40f0b5de4d4e', 'Admin', 'admin@gmail.com', 'youcannotguessthiseasily123', 'CSC{i_keep_them_in_my_base64ment}'),
('9da586a5-06c8-4201-be29-c5aca6187523', 'hiro', 'hiro@gmail.com', 'ichiro123', ''),
('f5b3f205-169a-471d-8bb3-7ff20f5f725c', 'Jean', 'jean@gmail.com', 'jeanjean123#', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `friends`
--
ALTER TABLE `friends`
  ADD KEY `UserID1` (`UserID1`),
  ADD KEY `UserID2` (`UserID2`);

--
-- Indexes for table `msuser`
--
ALTER TABLE `msuser`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `unique_email` (`Email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `friends`
--
ALTER TABLE `friends`
  ADD CONSTRAINT `friends_ibfk_1` FOREIGN KEY (`UserID1`) REFERENCES `msuser` (`UserID`) ON DELETE CASCADE,
  ADD CONSTRAINT `friends_ibfk_2` FOREIGN KEY (`UserID2`) REFERENCES `msuser` (`UserID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
