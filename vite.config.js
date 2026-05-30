import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import Razorpay from 'razorpay';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  const mockNetlifyPlugin = () => ({
    name: 'mock-netlify-functions',
    configureServer(server) {
      server.middlewares.use('/.netlify/functions/create-order', handleCreateOrder);
    },
    configurePreviewServer(server) {
      server.middlewares.use('/.netlify/functions/create-order', handleCreateOrder);
    }
  });

  const handleCreateOrder = (req, res, next) => {
    if (req.method !== 'POST') return next();
    
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        
        const razorpay = new Razorpay({
          key_id: env.RAZORPAY_KEY_ID || env.VITE_RAZORPAY_KEY_ID,
          key_secret: env.RAZORPAY_KEY_SECRET,
        });

        const options = {
          amount: data.amount * 100,
          currency: "INR",
        };
        
        const order = await razorpay.orders.create(options);
        
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(order));
      } catch (error) {
        console.error("Razorpay Error:", error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: error.message }));
      }
    });
  };

  return {
    plugins: [react(), mockNetlifyPlugin()],
  };
});
