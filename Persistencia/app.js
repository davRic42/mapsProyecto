const http = require('http');
const TutorDAO = require('./tutorDAO');

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
            const tutor = await TutorDAO.getTutor(id);
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
