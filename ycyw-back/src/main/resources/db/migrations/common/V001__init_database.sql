CREATE SCHEMA ycyw AUTHORIZATION postgres;

CREATE TABLE "_user" (
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


CREATE TABLE support_request (
	id uuid NOT NULL,
	user_id uuid NOT NULL,
	CONSTRAINT support_request_pk PRIMARY KEY (id),
	CONSTRAINT support_request_unique UNIQUE (user_id),
	CONSTRAINT support_request__user_fk FOREIGN KEY (user_id) REFERENCES "_user"(id)
);

CREATE TABLE message (
	id uuid NOT NULL,
	"content" varchar(255) NOT NULL,
	support_request_id uuid NOT NULL,
	sender_id uuid NOT NULL,
	created_at timestamp NULL,
	CONSTRAINT messages_pk PRIMARY KEY (id),
	CONSTRAINT message_support_request_fk FOREIGN KEY (support_request_id) REFERENCES support_request(id),
	CONSTRAINT messages__user_fk FOREIGN KEY (sender_id) REFERENCES "_user"(id)
);

INSERT INTO "_user" (id, email, "password", first_name, last_name, phone_number, address, "role", created_at, updated_at) VALUES('3b590698-dbe8-43d0-8933-9e93443829e4'::uuid, 'admin@test.com', '$2a$10$hW43eJcL1vfiDaZUPqhrGOFc61pCxpD3U.2IYrGai5FP5HpdlW63W', NULL, NULL, NULL, NULL, 'ADMIN', '2025-01-19 01:08:12.392', NULL);