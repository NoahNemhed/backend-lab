USE studybuddy;

CREATE TABLE tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status ENUM('todo','doing','done') NOT NULL DEFAULT 'todo',
  priority TINYINT NOT NULL CHECK (priority BETWEEN 1 AND 3),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tasks (title, description, status, priority)
VALUES
('Setup project', 'Initialize Express MVC structure', 'done', 1),

('Connect database', 'Create MariaDB connection pool', 'doing', 2),

('Build REST API', 'Implement CRUD endpoints', 'todo', 3),

('Add authentication', 'Prepare JWT login system', 'todo', 2),

('Write documentation', 'Explain API endpoints', 'doing', 1);