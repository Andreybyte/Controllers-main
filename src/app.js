import express from 'express';
import cors from 'cors';
import userRoutes from './routes/usersRoutes.js';
import busRotes from './routes/busRoutes.js';
import busDriversRoutes from './routes/busDriversRoutes.js';
import highSchoolRoutes from './routes/highSchoolRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/drivers', busDriversRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bus',busRotes);
app.use('/api/highschool',highSchoolRoutes);

app.use((req, res, next) => {
    console.log(`LOG: ${req.method} a la ruta ${req.url}`);
    next();
});

export default app;
