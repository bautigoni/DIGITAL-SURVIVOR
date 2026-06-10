import 'dotenv/config';
import { createApp } from './config/app.js';

const port = Number(process.env.PORT ?? 4000);
const app = createApp();

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`[digital-survivor-api] listening on http://localhost:${port}`);
});
