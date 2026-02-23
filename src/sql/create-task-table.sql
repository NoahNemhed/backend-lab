USE studybuddy;

CREATE TABLE tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status ENUM('todo','doing','done') NOT NULL DEFAULT 'todo',
  priority TINYINT NOT NULL CHECK (priority BETWEEN 1 AND 3),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);