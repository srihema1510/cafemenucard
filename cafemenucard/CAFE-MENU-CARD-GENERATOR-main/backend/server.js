const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const logger = require('./src/utils/logger');
const { errorHandler } = require('./src/middleware/errorHandler');
const { initDB } = require('./src/config/seed');

const authRoutes = require('./src/routes/auth');
const cafeRoutes = require('./src/routes/cafe');
const categoriesRoutes = require('./src/routes/categories');
const menuRoutes = require('./src/routes/menu');
const exportRoutes = require('./src/routes/export');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: function (origin, callback) {
    callback(null, true);
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger);

// Initialize DB and seed
initDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/cafe', cafeRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/menu-items', menuRoutes);
app.use('/api/export', exportRoutes);

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
