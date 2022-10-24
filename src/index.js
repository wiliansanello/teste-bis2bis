import express from 'express';
import * as dotenv from 'dotenv';

import { universitiesRouter } from './routes/universities.js'
import { indexRouter } from './routes/index.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/", indexRouter);
app.use("/universities",universitiesRouter);

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`); 
});


