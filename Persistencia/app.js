const http = require('http');
const DatosDAO = require('./datosDAO');

const requestHandler = async (req, res) => {
    // Configurar encabezados CORS
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permitir solicitudes desde cualquier origen
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Métodos permitidos
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Encabezados permitidos

    // Manejar preflight request (para solicitudes de CORS)
    if (req.method === 'OPTIONS') {
        res.writeHead(204); // No Content
        res.end();
        return;
    }

    // Lógica de las rutas
    if (req.method === 'GET' && req.url.startsWith('/getTutor/')) {
        const id = req.url.split('/')[2];
        try {
            const tutor = await DatosDAO.getTutor(id);
            console.log('Tutor devuelto:', tutor); // Para depuración
            if (tutor) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(tutor));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ msg: 'Tutor not found' }));
            }
        } catch (err) {
            console.error('Error getting tutor:', err.message);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Server Error' }));
        }
    } else if (req.method === 'POST' && req.url === '/addTutor') {
        console.log('Received POST request to /addTutor');
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                const tutor = JSON.parse(body);
                console.log('Parsed tutor data:', tutor);
                const newTutor = await DatosDAO.createTutor(tutor);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(newTutor));
            } catch (err) {
                console.error('Error adding tutor:', err.message);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Server Error' }));
            }
        });
    } else if (req.method === 'PUT' && req.url.startsWith('/updateTutor/')) {
        const id = req.url.split('/')[2];
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                const tutor = JSON.parse(body);
                const updatedTutor = await DatosDAO.updateTutor(id, tutor);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(updatedTutor));
            } catch (err) {
                console.error('Error updating tutor:', err.message);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Server Error' }));
            }
        });
    } else if (req.method === 'DELETE' && req.url.startsWith('/deleteTutor/')) {
        const id = req.url.split('/')[2];
        try {
            await DatosDAO.deleteTutor(id);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ msg: 'Tutor deleted' }));
        } catch (err) {
            console.error('Error deleting tutor:', err.message);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Server Error' }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ msg: 'Not found' }));
    }
};

const server = http.createServer(requestHandler);
const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});