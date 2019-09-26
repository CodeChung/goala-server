BEGIN;

TRUNCATE
  users
  RESTART IDENTITY CASCADE;

INSERT INTO users (username, name, password)
VALUES
  ('demo', 'demo', '$2a$12$umpQ/YEwyYulDYC/71.DY.3PI5ghhgQE7hD69o7iOVYj9Ms9Zd6fK'),
  ('jimbo', 'Jimothy Jones', '$2a$12$34aLVL3/JbUtOVKRAXuHEubOvd.3rG9vhFNLe5U2gIrRI.kLi8tHa'),
  ('martwart', 'Martha Stewart', '$2a$12$34aLVL3/JbUtOVKRAXuHEubOvd.3rG9vhFNLe5U2gIrRI.kLi8tHa');

INSERT INTO goals (title, last_logged, schedule, motivations, duration, user_id)
VALUES
  ('learn to drive', '2019-08-24 22:41:48.324556', '{"Fri": true, "Mon": true, "Sat": true, "Sun": true, "Thu": true, "Tue": true, "Wed": true}', null, 65, 1),
  ('work out', null, '{"Fri": true, "Mon": true, "Sat": false, "Sun": false, "Thu": true, "Tue": true, "Wed": true}', null, 42, 1),
  ('learn the piano', '2019-08-24 22:41:48.324556', '{"Fri": true, "Mon": false, "Sat": true, "Sun": true, "Thu": true, "Tue": true, "Wed": false}', null, 65, 2);

COMMIT;
