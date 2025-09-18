import 'dotenv/config';
import { createApp } from './app.js';

(async () => {
  try {
    await createApp();
    console.log('Servidor arrancó correctamente.');
  } catch (err) {

    
  console.error('ERROR al iniciar el servidor:');
  console.error(err.stack ?? err);
  process.exit(1);

  }
})();
