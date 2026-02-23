
// Importera express
const express = require('express');

// .env
require("dotenv").config();

// skapa en express app
const app = express();

// Importera routes
const indexRoutes = require('./routes/index');
const taskRoutes = require('./routes/tasks')
const userRoutes = require('./routes/users')

// Middleware (för JSON body senare)
app.use(express.json());




// Använd index route
app.use('/', indexRoutes);

// Använd task route
app.use('/api', taskRoutes)

// Använd user route
app.use('/api', userRoutes)



// Starta servern på port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`StudyBuddy server running on http://localhost:${PORT}`);
});