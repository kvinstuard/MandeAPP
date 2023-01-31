CREATE TABLE person(
  name VARCHAR(90) NOT NULL,
  last_name VARCHAR(90) NOT NULL,
  id VARCHAR(20) PRIMARY KEY UNIQUE NOT NULL,
  address VARCHAR(90) NOT NULL,
  email VARCHAR(90) NOT NULL,
  password VARCHAR(20) NOT NULL,
  coordinates VARCHAR(20) NOT NULL
);

CREATE TABLE usuario(
	utility_bills BYTEA, 
	phone_number VARCHAR(30) UNIQUE NOT NULL,
	PRIMARY KEY (id, phone_number, email) 
) inherits (person);

CREATE TABLE specialist(
	bank_account VARCHAR(90) UNIQUE NOT NULL,
	phone_number VARCHAR(30) UNIQUE NOT NULL,
	rate DECIMAL,
	id_image BYTEA,
	PRIMARY KEY(id, phone_number, email,bank_account)
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
	cvv INTEGER,
	PRIMARY KEY(card_number, cvv),
	phone_number VARCHAR(30) REFERENCES usuario (phone_number) ON DELETE RESTRICT	
);


CREATE TABLE services(
	service_id VARCHAR(30) PRIMARY KEY NOT NULL,
	bank_account VARCHAR(90) REFERENCES specialist(bank_account)
	ON DELETE RESTRICT,
	card_number_client VARCHAR(90) REFERENCES payment_method(card_number)
	ON DELETE RESTRICT
);



