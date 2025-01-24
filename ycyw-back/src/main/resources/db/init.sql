CREATE SCHEMA ycyw AUTHORIZATION postgres;


CREATE TABLE ycyw."_user" (
	id uuid NOT NULL,
	email varchar(100) NOT NULL,
	"password" text NOT NULL,
	first_name varchar(50) NULL,
	last_name varchar(50) NULL,
	phone_number varchar(15) NULL,
	address varchar(100) NULL,
	"role" varchar(10) NOT NULL,
	created_at timestamp NULL,
	updated_at timestamp NULL,
	CONSTRAINT "_user_pk" PRIMARY KEY (id),
	CONSTRAINT "_user_unique" UNIQUE (email)
);


ALTER TABLE ycyw."_user" OWNER TO postgres;
GRANT ALL ON TABLE ycyw."_user" TO postgres;


CREATE TABLE ycyw.rental_agency (
	id uuid NOT NULL,
	"name" varchar(90) NOT NULL,
	CONSTRAINT rental_agency_pk PRIMARY KEY (id)
);


ALTER TABLE ycyw.rental_agency OWNER TO postgres;
GRANT ALL ON TABLE ycyw.rental_agency TO postgres;


CREATE TABLE ycyw.rental (
	id uuid NOT NULL,
	start_city varchar(50) NOT NULL,
	start_at timestamp NOT NULL,
	back_city varchar(50) NOT NULL,
	back_at timestamp NOT NULL,
	vehicle_category varchar(4) NOT NULL,
	price numeric(10, 2) NOT NULL,
	rental_agency_id uuid NOT NULL,
	CONSTRAINT rental_pk PRIMARY KEY (id),
	CONSTRAINT rental_rental_agency_fk FOREIGN KEY (rental_agency_id) REFERENCES ycyw.rental_agency(id)
);

ALTER TABLE ycyw.rental OWNER TO postgres;
GRANT ALL ON TABLE ycyw.rental TO postgres;


CREATE TABLE ycyw.reservation (
	id uuid NOT NULL,
	status varchar(15) NOT NULL,
	created_at timestamp NOT NULL,
	stripe_payment_intent_id int8 NOT NULL,
	user_id uuid NOT NULL,
	rental_id uuid NOT NULL,
	cancel_at timestamp NULL,
	updated_at timestamp NULL,
	CONSTRAINT reservation_pk PRIMARY KEY (id),
	CONSTRAINT reservation_unique UNIQUE (stripe_payment_intent_id),
	CONSTRAINT reservation_unique_1 UNIQUE (rental_id),
	CONSTRAINT reservation__user_fk FOREIGN KEY (user_id) REFERENCES ycyw."_user"(id),
	CONSTRAINT reservation_rental_fk FOREIGN KEY (rental_id) REFERENCES ycyw.rental(id)
);


ALTER TABLE ycyw.reservation OWNER TO postgres;
GRANT ALL ON TABLE ycyw.reservation TO postgres;

CREATE TABLE ycyw.support_request (
	id uuid NOT NULL,
	user_id uuid NOT NULL,
	CONSTRAINT support_request_pk PRIMARY KEY (id),
	CONSTRAINT support_request_unique UNIQUE (user_id),
	CONSTRAINT support_request__user_fk FOREIGN KEY (user_id) REFERENCES ycyw."_user"(id)
);


ALTER TABLE ycyw.support_request OWNER TO postgres;
GRANT ALL ON TABLE ycyw.support_request TO postgres;


CREATE TABLE ycyw.invoices (
	id uuid NOT NULL,
	reservation_id uuid NOT NULL,
	invoices_number int8 NOT NULL,
	total_amount numeric(10, 2) NOT NULL,
	currency varchar(3) NOT NULL,
	stripe_invoice_id int8 NOT NULL,
	created_at timestamp NOT NULL,
	updated_at timestamp NULL,
	CONSTRAINT invoices_pk PRIMARY KEY (id),
	CONSTRAINT invoices_unique UNIQUE (reservation_id),
	CONSTRAINT invoices_unique_1 UNIQUE (stripe_invoice_id),
	CONSTRAINT invoices_reservation_fk FOREIGN KEY (reservation_id) REFERENCES ycyw.reservation(id)
);


ALTER TABLE ycyw.invoices OWNER TO postgres;
GRANT ALL ON TABLE ycyw.invoices TO postgres;


CREATE TABLE ycyw.message (
	id uuid NOT NULL,
	"content" varchar(255) NOT NULL,
	support_request_id uuid NOT NULL,
	sender_id uuid NOT NULL,
	created_at timestamp NULL,
	CONSTRAINT messages_pk PRIMARY KEY (id),
	CONSTRAINT message_support_request_fk FOREIGN KEY (support_request_id) REFERENCES ycyw.support_request(id),
	CONSTRAINT messages__user_fk FOREIGN KEY (sender_id) REFERENCES ycyw."_user"(id)
);


ALTER TABLE ycyw.message OWNER TO postgres;
GRANT ALL ON TABLE ycyw.message TO postgres;


GRANT ALL ON SCHEMA ycyw TO postgres;