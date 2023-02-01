CREATE TABLE person(
  name VARCHAR(90) NOT NULL,
  last_name VARCHAR(90) NOT NULL,
  address VARCHAR(90) NOT NULL,
  password VARCHAR(20) NOT NULL,
  coordinates VARCHAR(20)
);

CREATE TABLE usuario(
	utility_bills TEXT, 
	phone_number VARCHAR(30) UNIQUE NOT NULL,
	email VARCHAR(90) UNIQUE NOT NULL,
	id VARCHAR(20) PRIMARY KEY NOT NULL
) inherits (person);

CREATE TABLE specialist(
	bank_account VARCHAR(90) UNIQUE,
	phone_number VARCHAR(30) UNIQUE NOT NULL,
	email VARCHAR(90) UNIQUE NOT NULL,
	id VARCHAR(20) PRIMARY KEY NOT NULL,
	rate DECIMAL,
	id_image TEXT
) inherits (person);

CREATE TABLE task(
	work_id SERIAL,  
	hour_cost INTEGER NOT NULL,
	name VARCHAR(90) NOT NULL,
	bank_accountLB VARCHAR(90) REFERENCES specialist(bank_account)
	ON DELETE RESTRICT
);

CREATE TABLE payment_method(
	type_card VARCHAR(30) NOT NULL,
	card_number VARCHAR(90) UNIQUE NOT NULL,
	expiration_date DATE NOT NULL,
	cvv INTEGER NOT NULL,
	PRIMARY KEY(card_number, cvv),
	phone_number VARCHAR(30) NOT NULL
);


CREATE TABLE services(
	service_id VARCHAR(30) PRIMARY KEY NOT NULL,
	bank_account VARCHAR(90) REFERENCES specialist(bank_account)
	ON DELETE RESTRICT,
	card_number_client VARCHAR(90) REFERENCES payment_method(card_number)
	ON DELETE RESTRICT
);




