function fetchall(){
    data={
        type: "all",
        id:"_"
    }
    fetch("http://localhost:4000/getData", {
        method: "POST",
        headers:{
            'Content-type': "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        const parent = document.getElementById("sec-4");
        data.message.forEach(element => {
            parent.insertAdjacentHTML("beforeend", 
            `
                <ul>
                    <li> ${element.name} </li>
                    <li> ${element.surname} </li>
                    <li> ${element.department} </li>
                    <li> ${element.contact} </li>
                </ul>
            `
            )
        });
    })
    .catch(err => console.log(err));
}

function fetchsingle(){
    let nameinput = document.getElementById("name");
    data={
        type: "single",
        name: nameinput.value 
    }
    fetch("http://localhost:4000/getData", {
        method: "POST",
        headers:{
            'Content-type': "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        const parent = document.getElementById("sec-4");
        parent.insertAdjacentHTML("beforeend", 
        `
            <ul>
                <li>${data.message.name}</li><br><br>
                <li>${data.message.surname}</li><br><br>
                <li>${data.message.department}</li><br><br>
                <li>${data.message.contact}</li><br><br>
            </ul>
        `
        )
    })
    .catch(err => console.log(err));

}

function create(){
    let name = document.getElementById('name3').value;
    let surname = document.getElementById('surname').value;
    let contact = document.getElementById('contact').value;
    let department = document.getElementById('dept').value;

    data={
        name: name,  
        surname: surname,
        contact: contact,
        dept: department
    }
    fetch("http://localhost:4000/addNewRecord", {
        method: "POST",
        headers:{
            'Content-type': "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(err => alert('Failed to save data'));

}

function update(){
    let name = document.getElementById("name2");
    let field = document.getElementById("field");
    let val = document.getElementById("value");
    data={
        id: name.value,
        field: field.value,
        data: val.value
    }
    fetch("http://localhost:4000/updateRecord", {
        method: "PATCH",
        headers:{
            'Content-type': "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => alert('Data updated!'));

}


function deleteall(){
    data={
        type: "all",
        name:"_"
    }
    fetch("http://localhost:4000/delete", {
        method: "DELETE",
        headers:{
            'Content-type': "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => alert('Database deleted'))
    .catch(err => alert('Could not delete records'));
}

function deleteone(){
    let name = document.getElementById("name1");
    data={
        type: "single",
        name: name.value
    }
    fetch("http://localhost:4000/delete", {
        method: "DELETE",
        headers:{
            'Content-type': "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response =>alert('data deleted sucessfully!'))  
}

function blank(){
    let a= document.getElementById('sec-4');
    a.innerHTML = '';
}


