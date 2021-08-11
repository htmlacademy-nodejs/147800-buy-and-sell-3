DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS offer_categories;
DROP TABLE IF EXISTS offers;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    label character varying(50) NOT NULL,
    picture character varying(50)
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    avatar character varying(50) NOT NULL,
    password character varying(200)
);

CREATE TABLE offers (
    id SERIAL PRIMARY KEY,
    description text NOT NULL,
    picture character varying(50),
    title character varying(50) NOT NULL,
    sum integer NOT NULL,
    type character varying(50) NOT NULL,
    created_at timestamp(0) without time zone NOT NULL,
    user_id integer NOT NULL,
    CONSTRAINT offers_fk FOREIGN KEY (user_id) REFERENCES users(id) 
        ON UPDATE CASCADE 
        ON DELETE RESTRICT
);

CREATE TABLE offer_categories (
    offer_id integer NOT NULL,
    category_id integer NOT NULL,
    CONSTRAINT offer_categories_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(id) 
        ON UPDATE SET NULL 
        ON DELETE RESTRICT,
    CONSTRAINT offer_categories_offer_id_fkey FOREIGN KEY (offer_id) REFERENCES offers(id) 
        ON UPDATE SET NULL 
        ON DELETE CASCADE
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    offer_id integer NOT NULL,
    text text NOT NULL,
    created_at timestamp(0) without time zone NOT NULL,
    user_id integer NOT NULL,
    CONSTRAINT comments_fk FOREIGN KEY (user_id) REFERENCES users(id) 
        ON UPDATE CASCADE 
        ON DELETE RESTRICT,
    CONSTRAINT comments_fk_1 FOREIGN KEY (offer_id) REFERENCES offers(id) 
        ON UPDATE CASCADE 
        ON DELETE CASCADE
);
