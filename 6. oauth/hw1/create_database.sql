CREATE TABLE EMPLOYEE (
    ID BIGINT auto_increment NOT null UNIQUE,
    FIRSTNAME varchar(100) NOT null,
    LASTNAME varchar(100) NOT null,
    `POSITION` varchar(100) NOT null,
    TEL varchar(100) NOT null UNIQUE,
    EMAIL varchar(100) NOT null UNIQUE,
    CONSTRAINT EMPLOYEE_pk PRIMARY KEY (ID)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;