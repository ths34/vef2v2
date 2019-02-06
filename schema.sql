CREATE TABLE applications (
  id serial primary key,
  name varchar(255) not null unique,
  email varchar(255) not null,
  phonenumber int,
  text text, 
  job varchar(100),
  processed boolean default false,
  created timestamp with time zone not null default current_timestamp,
  updated timestamp with time zone not null default current_timestamp
);

