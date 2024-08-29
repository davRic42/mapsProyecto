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
    const doc = document.getElementById('updateDocument').value;
    const name = document.getElementById('updatedName').value;
    const lastName = document.getElementById('updatedLastName').value;
    const adress = document.getElementById('updatedAdress').value;

    fetch(`${apiUrl}/updateData/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ doc, name, lastName, adress })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerText = 'registro actualizado: ' + JSON.stringify(data);
    })
    .catch(error => console.error('Error:', error));
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
function iniciarMap(){
    var coord = {lat:-34.5956145 ,lng: -58.4431949};
    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 10,
      center: coord
    });
    var marker = new google.maps.Marker({
      position: coord,
      map: map
    });
}