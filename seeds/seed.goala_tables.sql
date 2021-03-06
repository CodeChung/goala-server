BEGIN;

TRUNCATE
  users
  RESTART IDENTITY CASCADE;

INSERT INTO users (username, name, password)
VALUES
  ('demo', 'demo', '$2a$12$umpQ/YEwyYulDYC/71.DY.3PI5ghhgQE7hD69o7iOVYj9Ms9Zd6fK'),
  ('jimbo', 'Jimothy Jones', '$2a$12$34aLVL3/JbUtOVKRAXuHEubOvd.3rG9vhFNLe5U2gIrRI.kLi8tHa'),
  ('martwart', 'Martha Stewart', '$2a$12$34aLVL3/JbUtOVKRAXuHEubOvd.3rG9vhFNLe5U2gIrRI.kLi8tHa');



-- Creating actions seeds
INSERT INTO actions (user_id, title)
VALUES
  (1, 'exercise'),
  (1, 'diet'),
  (1, 'skydiving'),
  (1, 'budgeting'),
  (2, 'knitting'),
  (2, 'karate');



-- Creating goals seeds
INSERT INTO goals (user_id, action_id, title, last_logged, schedule, countdown, block_sequence)
VALUES
  (1, 1, 'climbing', '2019-07-26', '{"schedule": "MWF"}', 32, '{1,2,3}'),
  (1, 1, 'swimming', '2019-07-26', null, null, '{4,5,6,7}'),
  (1, 2, 'eucalyptus', '2019-07-26', '{"schedule": "MTuWThF"}', null, '{8,9,10}');
  


-- Creating reminders seeds
INSERT INTO reminders(user_id, date, title, schedule, block_sequence)
VALUES
  (1, '2019-07-26', 'Groceries', '{"schedule": "Su"}', '{11, 12, 13, 14}'),
  (1, '2019-07-26', 'Go to DMV', '{"date": "Aug-22-2019"}', '{15, 16, 17, 18, 19}'),
  (1, '2019-09-16', 'Go to Zumba', '{"date": "Sep-16-2019"}', '{15, 16, 17, 18, 19}');



-- Creating block seeds
INSERT INTO blocks (user_id, goal_id, reminder_id, date, type, value, dimension)
VALUES
  (1, 1, null, '2019-07-26', 'weekly', '{"days": "MWF"}', 'col-6'),
  (1, 1, null, '2019-07-26', 'notes', '{"text": "Dont forget the climbing gear"}', 'col-3'),
  (1, 1, null, '2019-07-26', 'yesno', '{"yes": "true"}', 'col-2'),
  (1, 2, null, '2019-07-26', 'text', '{"text": "Swimming at the YMCA"}', 'col-12'),
  (1, 2, null, '2019-07-26', 'checklist', '{"checked": "false", "value": "10 freestyle laps"}', 'col-8'),
  (1, 2, null, '2019-07-26', 'checklist', '{"checked": "false", "value": "10 froggy laps"}', 'col-8'),
  (1, 2, null, '2019-07-26', 'checklist', '{"checked": "false", "value": "5 butterfly laps"}', 'col-8'),
  (1, 3, null, '2019-07-26', 'weekly', '{"days": "MTuWThF"}', 'col-8'),
  (1, 3, null, '2019-07-26', 'count', '{"den": 100, "units": "leaves"}', 'col-4'),
  (1, 3, null, '2019-07-26', 'clock', '{"time": 1439}', 'col-5'),
  (1, null, 1, '2019-07-26', 'weekly', '{"days": "Su"}', 'col-4'),
  (1, null, 1, '2019-07-26', 'checklist', '{"checked": "false", "value": "1000 eucalyptus leaves"}', 'col-7'),
  (1, null, 1, '2019-07-26', 'subtitle', '{"text": "get the good stuff from Sprouts"}', 'col-7'),
  (1, null, 1, '2019-07-26', 'checklist', '{"checked": "false", "value": "shampoo"}', 'col-7'),
  (1, null, 2, '2019-07-26', 'date', '{"date": "Aug-22-2019"}', 'col-6'),
  (1, null, 2, '2019-07-26', 'checklist', '{"checked": "false", "value": "get drivers license"}', 'col-7'),
  (1, null, 2, '2019-07-26', 'checklist', '{"checked": "false", "value": "bring 3 pieces of mail (proof of residence)"}', 'col-7'),
  (1, null, 2, '2019-07-26', 'checklist', '{"checked": "false", "value": "bring debit card, not credit card"}', 'col-7'),
  (1, null, 2, '2019-07-26', 'checklist', '{"checked": "false", "value": "bring passport"}', 'col-7');



INSERT INTO journal_entries(user_id, date, title, text, blocks, saved)
VALUES 
  (1, '2019-07-28', 'Yabba dabba doo', 'I watched we bought a zoo. Terrific film, Matt Damon truly gave the performance of his career. I couldnt help but to wonder what it would have felt like to be a part of that movie.', '{}', 'true'),
  (1, '2019-08-02', 'This little piggy stayed home', 'I had to go to the grocery store', '{}', 'false'),
  (1, '2019-09-14', 'Parking Lot Programming', 'Im coding in a parking lot', '{}', 'false'),
  (1, '2019-09-15', 'Working Hard to Hardly Work', 'Boss man grinding my gears real hard. After work.', '{}', 'true'),
  (1, '2019-09-16', 'Road Warrior', 'Took my chopper out to the canyons today. Really makes you feel alive, having the wind blowing in your face and the road racing away beneath you. It was a bright beautiful sky, the kind so clear it makes you go, whoa momma. Thats living at its finest.', '{}', 'false');


COMMIT;
