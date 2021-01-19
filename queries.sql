-- get categories list (id, label)
SELECT id, label FROM categories;

-- get categories (id, label) with more than one offer
SELECT categories.id, categories.label FROM categories 
INNER JOIN offer_categories ON offer_categories.category_id = categories.id
INNER JOIN offers ON offers.id = offer_categories.offer_id
GROUP BY categories.id
HAVING count(categories.id) > 0;

-- get categories with offers count (id, label, offers count)
SELECT categories.id, categories.label, count(categories.id) as "offers count" FROM categories 
INNER JOIN offer_categories ON offer_categories.category_id = categories.id
INNER JOIN offers ON offers.id = offer_categories.offer_id
GROUP BY categories.id
ORDER BY count(categories.id) DESC;

-- get offers list with categories names (id, title, sum, type, description, date, author first name, author last name, author email, comments count, categories names)
SELECT 
  offers.id, 
  offers.title, 
  offers.sum, 
  types.label as "type", 
  offers.description, 
  offers.created_at, 
  users.first_name as "user first name", 
  users.last_name as "user last name", 
  users.email as "user email",
  count(comments.id) as "comments count" 
  FROM offers
INNER JOIN types ON offers.type_id = types.id
INNER JOIN user_offers ON offers.id = user_offers.offer_id
INNER JOIN users ON users.id = user_offers.user_id
  INNER JOIN comments ON comments.offer_id = offers.id
  GROUP BY offers.id, types.label, users.id
ORDER BY offers.created_at DESC;

-- get info for selected offer (id, title, sum, type, description, date, author first name, author last name, author email, comments count, categories names)
SELECT 
  offers.id, 
  offers.title, 
  offers.sum, 
  types.label as "type", 
  offers.description, 
  offers.created_at, 
  users.first_name as "user first name", 
  users.last_name as "user last name", 
  users.email as "user email",
  count(comments.id) as "comments count" 
  FROM offers
INNER JOIN types ON offers.type_id = types.id
INNER JOIN user_offers ON offers.id = user_offers.offer_id
INNER JOIN users ON users.id = user_offers.user_id
  INNER JOIN comments ON comments.offer_id = offers.id
  GROUP BY offers.id, types.label, users.id
HAVING offers.id = 1;

-- get 5 newest comments (id, offer id, user first name, user last name, text)
SELECT 
  comments.id,
  comments.offer_id,
  users.first_name as "user first name",
  users.last_name as "user last name",
  comments.text
FROM comments
INNER JOIN user_comments ON user_comments.comment_id = comments.id
INNER JOIN users ON user_comments.user_id = users.id
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
INNER JOIN user_comments ON user_comments.comment_id = comments.id
INNER JOIN users ON user_comments.user_id = users.id
INNER JOIN offers ON comments.offer_id = offers.id
GROUP BY comments.id, users.id, offers.id
HAVING offers.id = 1
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