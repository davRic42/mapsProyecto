const apiUrl = 'http://localhost:5000';

function createTutor() {
    const location = document.getElementById('location').value;
    const [latitudNum, longitudNum] = location.split(',').map(coord => coord.trim());
    const latitude = parseFloat(latitudNum);
    const long = parseFloat(longitudNum);
    const doc = document.getElementById('document').value;
    const name = document.getElementById('name').value;
    const lastName = document.getElementById('lastName').value;
    const adress = document.getElementById('adress').value; // Verifica que este ID sea correcto y único
    if (location) {
        console.log(location);
        fetch(`${apiUrl}/addData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ doc, name, lastName, adress,latitude,long })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').innerText = 'registro creado: ' + JSON.stringify(data);
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('selecciona una ubicación antes de guardar')
    }

}


function getTutor() {
    const id = document.getElementById('Idget').value;
    console.log(id);
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
                document.getElementById('result').innerText = 'datos encontrado: ' + JSON.stringify(data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').innerText = 'Error fetching tutor data.';
        });
}



function updateTutor() {
    const id = document.getElementById('updatedId').value;
    const location = document.getElementById('locationUpdated').value;
    const [latitudNum, longitudNum] = location.split(',').map(coord => coord.trim());
    const latitude = parseFloat(latitudNum);
    const long = parseFloat(longitudNum);
    const doc = document.getElementById('updateDocument').value;
    const name = document.getElementById('updatedName').value;
    const lastName = document.getElementById('updatedLastName').value;
    const adress = document.getElementById('updatedAdress').value;

    if (location) {
    fetch(`${apiUrl}/updateData/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ doc, name, lastName, adress,latitude,long })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').innerText = 'registro actualizado: ' + JSON.stringify(data);
        })
        .catch(error => console.error('Error:', error));
    }else{
        alert('selecciona una ubicación antes de actualizar')
    }
}

function deleteTutor() {
    const id = document.getElementById('deleteId').value;

    fetch(`${apiUrl}/deleteUser/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').innerText = 'registro eliminado: ' + JSON.stringify(data);
        })
        .catch(error => console.error('Error:', error));
}