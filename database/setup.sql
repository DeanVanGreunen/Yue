use test;

CREATE TABLE users (
    id int Primary Key NOT NULL AUTO_INCREMENT,
    email longtext,
    password_hash longtext,
    api_key longtext,
    credits int
);

CREATE TABLE questions (
    id int Primary Key NOT NULL AUTO_INCREMENT,
    title longtext,
    description longtext,
    user_id int
);

CREATE TABLE answers (
    id int Primary Key NOT NULL AUTO_INCREMENT,
    text longtext,
    user_id int,
    answer_selected int
);