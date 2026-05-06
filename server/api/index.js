import { app } from '../src/app.js';
import connectDb from '../src/db/index.js';

await connectDb();

export default app;
