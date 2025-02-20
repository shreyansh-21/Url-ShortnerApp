import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/dbConfig';
import shortUrl from './routes/shortUrl';

dotenv.config();// To fetch the environment variables
connectDB();// To connect to the database 
const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors( 
   {origin: '*'} ));

app.use("/api/",shortUrl)

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});