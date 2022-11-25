CREATE TABLE "orders" (
  "id" serial NOT NULL,
  PRIMARY KEY ("id"),
  "state" character varying(20) NOT NULL,
  "products" json NOT NULL,
  "created_at" timestamp NOT NULL,
  "updated_at" timestamp NOT NULL
);


INSERT INTO "orders" ("state", "products", "created_at", "updated_at") VALUES 
('pending', '[{"id": 1, "quantity" : 1, "price" : 10,  "currency" : "CLP"}, {"id": 2, "quantity" : 2, "price" : 25,  "currency" : "CLP"}]', now(), now()),
('inTransit', '[{"id": 1, "quantity" : 1, "price" : 10,  "currency" : "CLP"}]', now(), now()),
('delivered', '[{"id": 1, "quantity" : 1, "price" : 10,  "currency" : "CLP"}]', now(), now()),
('cancelled', '[{"id": 1, "quantity" : 1, "price" : 10,  "currency" : "CLP"}]', now(), now()),
('packing', '[{"id": 1, "quantity" : 1, "price" : 10,  "currency" : "CLP"},{"id": 3, "quantity" : 4, "price" : 7,  "currency" : "CLP"}]', now(), now()),
('inTransit', '[{"id": 1, "quantity" : 1, "price" : 10,  "currency" : "CLP"}]', now(), now()),
('pending', '[{"id": 5, "quantity" : 1, "price" : 17,  "currency" : "CLP"}]', now(), now()),
('pending', '[{"id": 3, "quantity" : 1, "price" : 8,  "currency" : "CLP"}]', now(), now());
