import express from 'express';
import userRoutes from './routes/usersRoutes.js';
const app = express();
app.use(express.json());
app.use((req, res, next) => {
    console.log(`LOG: ${req.method} a la ruta ${req.url}`);
    next();
});

app.use('/api/users', userRoutes);
export default app;
