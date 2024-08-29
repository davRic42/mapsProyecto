const apiUrl = 'http://localhost:5000';

function createTutor() {
    const doc = document.getElementById('document').value;
    const name = document.getElementById('name').value;
    const lastName = document.getElementById('lastName').value;
    const adress = document.getElementById('adress').value; // Verifica que este ID sea correcto y único

    fetch(`${apiUrl}/addData`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ doc, name, lastName, adress })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerText = 'registro creado: ' + JSON.stringify(data);
    })
    .catch(error => console.error('Error:', error));
}


function getTutor() {
    const id = document.getElementById('tutorId').value;

    fetch(`http://localhost:5000/getData/${id}`) // No se utiliza 'no-cors'
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Response received:', data);
            if (Object.keys(data).length === 0) {
                document.getElementById('result').innerText = 'not found';
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
    const id = document.getElementById('updateId').value;
    const userDoc = document.getElementById('updateDocument').value;
    const userName = document.getElementById('updateName').value;
    const userLastName = document.getElementById('updateLastName').value;
    const userAdress = document.getElementById('updateAdress').checked;

    fetch(`${apiUrl}/updateData/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userDoc, userName, userLastName, userAdress })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerText = 'registro actualizado: ' + JSON.stringify(data);
    })
    .catch(error => console.error('Error:', error));
}

function deleteTutor() {
    const id = document.getElementById('deleteTutorId').value;

    fetch(`${apiUrl}/deleteUser/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerText = 'Tutor eliminado: ' + JSON.stringify(data);
    })
    .catch(error => console.error('Error:', error));
}
