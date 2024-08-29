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
    if (req.method === 'GET' && req.url.startsWith('/getData/')) {
        const id = req.url.split('/')[2];
        try {
            const data = await DatosDAO.getUser(id);
            console.log('Tutor devuelto:', data); // Para depuración
            if (data) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(data));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ msg: 'Tutor not found' }));
            }
        } catch (err) {
            console.error('Error getting tutor:', err.message);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Server Error' }));
        }
    } else if (req.method === 'POST' && req.url === '/addData') {
        console.log('Received POST request to /addData');
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                if (data.doc && data.name && data.lastName && data.adress) {
                    console.log('Parsed tutor data:', data);
                    const newData = await DatosDAO.createUser(data);
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(newData));
                } else {
                    throw new Error('Datos incompletos');
                }
            } catch (err) {
                console.error('Error adding tutor:', err.message);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Server Error' }));
            }
        });
        
    } else if (req.method === 'PUT' && req.url.startsWith('/updateData/')) {
        const id = req.url.split('/')[2];
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                const updatedData = await DatosDAO.updateUser(id, data);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(updatedData));
            } catch (err) {
                console.error('Error updating tutor:', err.message);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Server Error' }));
            }
        });
    } else if (req.method === 'DELETE' && req.url.startsWith('/deleteUser/')) {
        const id = req.url.split('/')[2];
        try {
            await DatosDAO.deleteUser(id);
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