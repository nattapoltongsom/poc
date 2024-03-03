CREATE TABLE users (  
  id uuid NOT NULL PRIMARY KEY,
  username text,
  password text,
  firstname text,
  lastname text,
  branch text,
  created_date timestamp NOT NULL,
  updated_date timestamp NOT NULL,
  roles text [] 
);

INSERT INTO public.users (id,username,"password",firstname,lastname,branch,created_date,updated_date,roles) VALUES ('4717317b-010a-47e2-a2fa-3e222782742e','kongdev','$2a$10$UBIunraGK78VQ5uuhfdgyOnCC3LCzegDEg9/PrdKAYnJ1BbBkVrUu','kong','dev','siam',now() at time zone ('utc'),now() at time zone ('utc'),'{admin}');
