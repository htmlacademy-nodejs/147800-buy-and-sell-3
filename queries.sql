-- get categories list (id, label)
SELECT id, label FROM categories;

-- get categories (id, label) with more or equal one offer
SELECT categories.id, categories.label FROM categories 
INNER JOIN offer_categories ON offer_categories.category_id = categories.id
GROUP BY categories.id;

-- get categories with offers count (id, label, offers count)
SELECT categories.id, categories.label, count(categories.id) as offers_count FROM categories 
INNER JOIN offer_categories ON offer_categories.category_id = categories.id
GROUP BY categories.id
ORDER BY count(categories.id) DESC;

-- get offers list with categories names (id, title, sum, type, description, date, author first name, author last name, author email, comments count, categories list)
SELECT 
  offers.id, 
  offers.title, 
  offers.sum, 
  types.label as type, 
  offers.description, 
  offers.created_at, 
  users.first_name as user_first_name, 
  users.last_name as user_last_name, 
  users.email as user_email,
  count(comments.id) as comments_count,
  STRING_AGG(DISTINCT categories.label, ', ') AS categories_list
  FROM offers
INNER JOIN offer_categories ON offer_categories.offer_id = offers.id
INNER JOIN categories ON categories.id = offer_categories.category_id
LEFT JOIN comments ON comments.offer_id = offers.id
INNER JOIN types ON offers.type_id = types.id
INNER JOIN users ON users.id = offers.user_id
GROUP BY offers.id, types.id, users.id
ORDER BY offers.created_at DESC;

-- get info for selected offer (id, title, sum, type, description, date, author first name, author last name, author email, comments count, categories list)
SELECT 
  offers.id, 
  offers.title, 
  offers.sum, 
  types.label as type, 
  offers.description, 
  offers.created_at, 
  users.first_name as user_first_name, 
  users.last_name as user_last_name, 
  users.email as user_email,
  count(comments.id) as comments_count,
  STRING_AGG(DISTINCT categories.label, ', ') AS categories_list
  FROM offers
INNER JOIN offer_categories ON offer_categories.offer_id = offers.id
INNER JOIN categories ON categories.id = offer_categories.category_id
LEFT JOIN comments ON comments.offer_id = offers.id
INNER JOIN types ON offers.type_id = types.id
INNER JOIN users ON users.id = offers.user_id
WHERE offers.id = 1
GROUP BY offers.id, types.id, users.id;

-- get 5 newest comments (id, offer id, user first name, user last name, text)
SELECT 
  comments.id,
  comments.offer_id,
  users.first_name as "user first name",
  users.last_name as "user last name",
  comments.text
FROM comments
INNER JOIN users ON comments.user_id = users.id
ORDER BY comments.created_at DESC
LIMIT 5;

-- get comments for selected offer (id, offer id, user first name, user last name, text)
SELECT 
  comments.id,
  comments.offer_id,
  users.first_name as "user first name",
  users.last_name as "user last name",
  comments.text
FROM comments
INNER JOIN users ON comments.user_id = users.id
GROUP BY comments.id, users.id
HAVING comments.offer_id = 1
ORDER BY comments.created_at DESC;

-- get 2 offers with "Куплю" type
SELECT 
  offers.*
FROM offers 
INNER JOIN types ON offers.type_id = types.id
WHERE types.label = 'Куплю'
LIMIT 2;

-- update title for selected offer
UPDATE offers
SET title = 'Уникальное предложение!'
WHERE id = 1;