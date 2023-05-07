import express from 'express';
import router from './routes/index.js';

const app = express();

app.use(express.json());
app.use('/api/v1', router);

app.get('/', (_, res) => {
    res.status(200).json({msg: 'api de web scrapping HUAWEI'})
})

export default app;