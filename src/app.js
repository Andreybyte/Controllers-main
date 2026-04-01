import express from 'express';
import userRoutes from './routes/usersRoutes.js';
import busRotes from './routes/busRoutes.js'
const app = express();
app.use(express.json());
app.use((req, res, next) => {
    console.log(`LOG: ${req.method} a la ruta ${req.url}`);
    next();
});

app.use('/api/users', userRoutes);
app.use('/api/bus',busRotes);
app.use('/api/bus',highSchoolRoutes);
export default app;
