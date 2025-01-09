const express = require('express');
const userRoutes = require('./routes/userRoutes');
const policyRoutes = require('./routes/policyRoutes');
const claimRoutes = require('./routes/claimRoutes');
const loggerMiddleware = require('./middlewares/loggerMiddleware');
const authRoutes = require('./routes/authRoute');
const assignPolicyRoute = require('./routes/assignPolicyRoute');
const createPoliciesTable = require('./config/policy');
const createAssignPolicyTable = require('./config/assignPolicy')
const connectDB = require('./config/db');

// Initialize Express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Logger Middleware to log all incoming requests
app.use(loggerMiddleware);

// Routes (Controllers)
app.use('/users', userRoutes);
app.use('/policies', policyRoutes);
app.use('/claims', claimRoutes);
app.use('/login', authRoutes);
app.use('/assign-policy', assignPolicyRoute);

// Database Connection and Table Creation
const initializeApp = async () => {
  try {
    // Test the database connection
    await connectDB();
    //console.log('Database connected successfully!');

    // Create the Policies table if not exists
    createPoliciesTable();
   // console.log('Policies table created or already exists.');

    // create assignpolicy table
    createAssignPolicyTable();
   // console.log('Assignpolicy table created');
    
    // Start the Express server
    app.listen(2000, () => {
      console.log('Insurance Management System running on port 2000');
    });
  } catch (error) {
    console.error('Error initializing the app:', error);
  }
};

// Initialize the app
initializeApp();
