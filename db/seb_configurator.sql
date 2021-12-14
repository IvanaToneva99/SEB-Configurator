-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 21, 2021 at 11:32 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `seb_configurator`
--

-- --------------------------------------------------------

--
-- Table structure for table `template`
--

CREATE TABLE `template` (
  `name` varchar(50) NOT NULL,
  `show_taskbar` int(11) NOT NULL,
  `show_time` int(11) NOT NULL,
  `show_reload_button` int(11) NOT NULL,
  `show_keyboard_layout` int(11) NOT NULL,
  `enable_quitting` int(11) NOT NULL,
  `ask_quitting` int(11) NOT NULL,
  `mute_audio` int(11) NOT NULL,
  `audio_control` int(11) NOT NULL,
  `delete_cookies` int(11) NOT NULL,
  `preferences_window` int(11) NOT NULL,
  `spellcheker` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `template`
--

INSERT INTO `template` (`name`, `show_taskbar`, `show_time`, `show_reload_button`, `show_keyboard_layout`, `enable_quitting`, `ask_quitting`, `mute_audio`, `audio_control`, `delete_cookies`, `preferences_window`, `spellcheker`) VALUES
('ISE', 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0),
('SARS', 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0),
('XML_test', 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `password`) VALUES
(1, 'Kristina', 'Kirimova', 'kkirimova@uni-sofia.bg', 'krisi1234'),
(2, 'Ivana', 'Toneva', 'ibtoneva@uni-sofia.bg', '291199ivana'),
(7, 'Dimitar', 'Kolev', 'dimiturrk@uni-sofia.bg', 'dimitarkolev99');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `template`
--
ALTER TABLE `template`
  ADD PRIMARY KEY (`name`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
