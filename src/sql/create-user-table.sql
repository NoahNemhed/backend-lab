USE studybuddy;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,

  username VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,

  password_hash VARCHAR(255) NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO users (username, email, password_hash)
VALUES
(
  'doe',
  'doe@example.com',
  '$2b$10$wH8Q0sZc8v6sE3rG3F1Y7u8TgFzV9p3bK7OeHcM3q7F2H4qXzYy1K'
),
(
  'admin',
  'admin@example.com',
  '$2b$10$wH8Q0sZc8v6sE3rG3F1Y7u8TgFzV9p3bK7OeHcM3q7F2H4qXzYy1K'
);