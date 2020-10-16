CREATE DATABASE database_links;

USE database_links;

CREATE TABLE users(
 
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);
    


ALTER TABLE users
    
    MODIFY ID INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;


-- TABLA DE LINKS--
CREATE TABLE links(
    id int(11) NOT NULL,
    title varchar (150) NOT NULL ,
    url varchar (255) NOT NULL ,
    description TEXT,
    user_id int (11),
    created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);    

ALTER TABLE links
    ADD PRIMARY KEY(id);


ALTER TABLE links
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;    
DESCRIBE links;    
show databases;
show tables;






