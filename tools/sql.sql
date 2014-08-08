 CREATE TABLE `users` (
  `deviceid` varchar(255) NOT NULL DEFAULT '',
  `dob` date DEFAULT NULL,
  `zodiac` varchar(15) DEFAULT NULL,
  `timezone` integer,
  PRIMARY KEY (`deviceid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `submissions` (
  sdate Date,
  deviceid varchar(255),
  predictionid integer,
  response boolean,
  PRIMARY KEY (`deviceid`, sdate)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;