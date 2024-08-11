const apiUrl = 'http://localhost:5000';

function createTutor() {
    const tutorName = document.getElementById('tutorName').value;
    const tutorPhone = document.getElementById('tutorPhone').value;
    const isDirector = document.getElementById('tutorDirector').checked;
    const idCasa = document.getElementById('idCasa').value;

    fetch(`${apiUrl}/addTutor`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tutorName, tutorPhone, isDirector, idCasa })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerText = 'Tutor creado: ' + JSON.stringify(data);
    })
    .catch(error => console.error('Error:', error));
}

function getTutor() {
    const id = document.getElementById('tutorId').value;

    fetch(`http://localhost:5000/getTutor/${id}`) // No se utiliza 'no-cors'
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Response received:', data);
            if (Object.keys(data).length === 0) {
                document.getElementById('result').innerText = 'Tutor not found';
            } else {
                document.getElementById('result').innerText = 'Tutor encontrado: ' + JSON.stringify(data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').innerText = 'Error fetching tutor data.';
        });
}



function updateTutor() {
    const id = document.getElementById('updateTutorId').value;
    const tutorName = document.getElementById('updateTutorName').value;
    const tutorPhone = document.getElementById('updateTutorPhone').value;
    const isDirector = document.getElementById('updateTutorDirector').checked;
    const idCasa = document.getElementById('updateIdCasa').value;

    fetch(`${apiUrl}/updateTutor/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tutorName, tutorPhone, isDirector, idCasa })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerText = 'Tutor actualizado: ' + JSON.stringify(data);
    })
    .catch(error => console.error('Error:', error));
}

function deleteTutor() {
    const id = document.getElementById('deleteTutorId').value;

    fetch(`${apiUrl}/deleteTutor/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerText = 'Tutor eliminado: ' + JSON.stringify(data);
    })
    .catch(error => console.error('Error:', error));
}
