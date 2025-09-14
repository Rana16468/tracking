import express from 'express';
import cors from 'cors';
import notFound from './middleware/notFound';
import globalErrorHandelar from './middleware/globalErrorHandelar';
import router from './router';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//middlewere
//credentials:true
//https://shoes-client.vercel.app
app.use(cors());

app.get('/', (req, res) => {
  res.send({ status: true, message: 'Traking Server Is Running' });
});
//username:navyboy
//password:5aNjnODj1ecD2sSx
app.use('/api/v1', router);

app.use(notFound);
app.use(globalErrorHandelar);

export default app;
