const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Configura el servidor proxy para escuchar en un puerto específico
app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});

app.use('/', (req, res, next) => {
    // Agrega los encabezados CORS necesarios a la respuesta
    //res.append('Access-Control-Allow-Origin', ['*']);
    //res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    //res.append('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
})
// Configura una ruta para el proxy
app.get('/proxy/duck', async (req, res) => {
  try {
    // Realiza una solicitud al servidor de origen
    const response = await axios.get('https://api.thecatapi.com/v1/images/search');

    // Agrega los encabezados CORS necesarios a la respuesta
    res.setHeader('Access-Control-Allow-Origin', ['*']);
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    // Envía la respuesta al cliente
    res.send(response.data);
    //res.send('Hola mundo');
  } catch (error) {
    console.error('Error en el servidor proxy:', error);
    res.status(500).send('Error en el servidor proxy');
  }
});
