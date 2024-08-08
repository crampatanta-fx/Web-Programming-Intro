$("#message").hide()
let userLogged = {}
let container = document.getElementById("container")
let properties
let idPropertyActual
let workspaces
let selectedProperty
let session = {
    authenticated: null,
    ip: null,
    userLogged: null,
    session_expire: null
}
updateLogin()
listProperties('all')
function showMessage(msg, pattern) {
    if (pattern == "green") {
        $("#message").css("color", "green")
        $("#message").css("background-color", "lightgreen")
    } else {
        $("#message").css("color", "yellow")
        $("#message").css("background-color", "#F04520")
    }
    $("#message").text(msg)
    $("#message").fadeIn("slow")
    setTimeout(() => {
        $("#message").fadeOut("slow")
    }, 3000);
}
function goLogin() {
    $("#container").hide()
    container.innerHTML = '<div id="form-login"><label for="input-username-login">Username (email)</label>' +
        '<input type="text" name="username-login" id="input-username-login" size="30">' +
        '<label for="input-password-login">Password</label>' +
        '<input type="password" name="password-login" id="input-password-login" size="30">' +
        '<br><button type="button" onclick="login()">Login</button><div class="little-message">' +
        '<a onclick="goSignup()"> Are you not registered yet? Sign up</a></div>' +
        '<div id="error-message-login"></div></div>'
    $("#container").fadeIn("slow")
}
function goSignup() {
    $("#container").hide()
    container.innerHTML = '<div id="form-signup">' +
        '<label for="input-username-signup">Username (e-mail)</label>' +
        '<input type="text" name="username-signup" id="input-username-signup" size="30">' +

        '<label for="input-fullname-signup">Full Name</label>' +
        '<input type="text" name="fullname-signup" id="input-fullname-signup" size="30">' +

        '<label for="input-phonenumber-signup" >Phone Number</label>' +
        '<input type="text" name="phonenumber-signup" id="input-phonenumber-signup" size="30" placeholder="+1 (___) ___-____" data-slots="_">' +

        '<label for="input-password-signup">Password</label>' +
        '<input type="password" name="password-signup" id="input-password-signup" size="30">' +

        '<label for="input-reenterpassword-signup">Re-enter Password</label>' +
        '<input type="password"  name="reenterpassword-signup" id="input-reenterpassword-signup" size="30">' +
        '<div id="radio"><input type="radio" value="owner" name="role" id="owner"><label for="owner"  class="radio">Owner</label>' +
        '<input type="radio" name="role" value="renter" id="renter" checked><label for="renter"  class="radio">Renter</label></div>' +

        '<button type="button" onclick="signup()">Sign Up</button>' +
        '<div class="little-message">' +
        '<a onclick="goLogin()"> Do you have a login? Login</a>' +
        '</div>' +
        '<div id="error-message-signup"></div>' +
        '</div>'
    $("#container").fadeIn("slow")
    updateFormat()
}
function goAddProperty() {
    $("#container").hide()
    container.innerHTML = ""
    let formAddProperty = document.createElement("div")
    formAddProperty.id = "addproperty"
    formAddProperty.innerHTML = '<label for="name">Property Name</label>' +
        '<input type="text" name="name" id="name">' +
        '<label for="address">Address</label>' +
        '<input type="text" name="address" id="address">' +
        '<label for="neighborhood">Neighborhood</label>' +
        '<input type="text" name="neighborhood" id="neighborhood">' +
        '<label for="squaredFeet">Squared Feet</label>' +
        '<input type="number" name="squaredFeet" id="squaredfeet">' +
        '<div class="form-row">' +
        '<input type="checkbox" name="hasParkingGarage" id = "hasParkingGarage">' +
        '<label for="hasParkingGarage">Parking Garage</label>' +
        '</div>' +
        '<div class="form-row">' +
        '<input type="checkbox" name="hasAccessiblePublicTransportation" id ="hasAccessiblePublicTransportation"></input>' +
        '<label for="hasAccessiblePublicTransportation">Accessible Public Transportation</label>' +
        '</div>' +
        '<div class="form-row">' +
        '<input type="checkbox" name="active" id ="active" checked=true></input>' +
        '<label for="active">Active</label>' +
        '</div>' +
        '<button type="button" onclick="addProperty()">Add</button>' +
        '<div id="error-message-signup"></div>' +
        '</div>'
    container.appendChild(formAddProperty)
    $("#container").fadeIn("slow")
}
function goEditProperty(p) {
    idProperty = p.substring(10)
    selectedProperty = properties.filter((property) => {
        return (property.idProperty == idProperty)
    })
    $("#container").hide()
    container.innerHTML = ""
    let formEditProperty = document.createElement("div")
    formEditProperty.id = "editproperty"
    formEditProperty.innerHTML = '<label for="name">Property Name</label>' +
        '<input type="text" name="name" id="name">' +
        '<label for="address">Address</label>' +
        '<input type="text" name="address" id="address">' +
        '<label for="neighborhood">Neighborhood</label>' +
        '<input type="text" name="neighborhood" id="neighborhood">' +
        '<label for="squaredFeet">Squared Feet</label>' +
        '<input type="number" name="squaredFeet" id="squaredFeet">' +
        '<div class="form-row">' +
        '<input type="checkbox" name="hasParkingGarage" id = "hasParkingGarage">' +
        '<label for="hasParkingGarage">Parking Garage</label>' +
        '</div>' +
        '<div class="form-row">' +
        '<input type="checkbox" name="hasAccessiblePublicTransportation" id ="hasAccessiblePublicTransportation"></input>' +
        '<label for="hasAccessiblePublicTransportation">Accessible Public Transportation</label>' +
        '</div>' +
        '<div class="form-row">' +
        '<input type="checkbox" name="active" id ="active"></input>' +
        '<label for="active">Active</label>' +
        '</div>' +
        '<button type="button" onclick="editProperty(' + idProperty + ')">Save Changes</button>' +
        '<div id="message"></div>' +
        '</div>'
    container.appendChild(formEditProperty)
    document.getElementById("name").value = selectedProperty[0].name
    document.getElementById("address").value = selectedProperty[0].address
    document.getElementById("neighborhood").value = selectedProperty[0].neighborhood
    document.getElementById("squaredFeet").value = selectedProperty[0].squaredFeet
    if (selectedProperty[0].hasParkingGarage)
        document.getElementById("hasParkingGarage").checked = true
    if (selectedProperty[0].hasAccessiblePublicTransportation)
        document.getElementById("hasAccessiblePublicTransportation").checked = true
    if (selectedProperty[0].active)
        document.getElementById("active").checked = true
    $("#container").fadeIn("slow")
}
function goAddWorkspace(idProperty) {
    $("#container").hide()
    container.innerHTML = ""
    selectedProperty = properties.filter((property) => {
        return (property.idProperty == idProperty)
    })
    let cardProperty = document.createElement("div")
    cardProperty.className = "card-properties"
    cardProperty.id = "property" + selectedProperty[0].idProperty
    cardProperty.innerHTML = '<div class="title-card-property">' +
        selectedProperty[0].name + '</div>' +
        '<div class="details-card-property">' +
        'Neighborhood: ' + selectedProperty[0].neighborhood + '<br>' +
        'Address: ' + selectedProperty[0].address + '<br>' +
        'SqFeet: ' + selectedProperty[0].squaredFeet + '<br>' +
        'Parking Garage: ' + selectedProperty[0].hasParkingGarage + '<br>' +
        'Accessible Public Transportantion: ' + selectedProperty[0].hasAccessiblePublicTransportation + '<br>' +
        'Active: ' + selectedProperty[0].active + '<br>' +
        '</div>'
    container.appendChild(cardProperty)
    let formAddWorkspace = document.createElement("div")
    formAddWorkspace.id = "addworkspace"
    formAddWorkspace.innerHTML =
        '<label for="name">Workspace Name</label>' +
        '<input type="text" name="name" id="nameWorkspace">' +
        '<label for="type">Type: </label>' +
        '<input type="text" name="type" id="type">' +
        '<div class="form-row">' +
        '<input type="checkbox" name="isSmokeAllowed" id = "isSmokeAllowed">' +
        '<label for="isSmokeAllowed">Smoke Allowed</label>' +
        '</div>' +
        '<div class="form-row">' +
        '    <label for="capacity">Capacity</label>' +
        '    <input type="number" name="capacity" id="capacity" value=1 size=5>' +
        '</div>' +

        '<label for="availableDate">Available Date</label>' +
        '<input type="date" name="availableDate" id ="availableDate"></input>' +
        '<div class="form-row">' +
        '    <label for="price">Price</label>' +
        '    <input type="number" name="price" id="price"  size=15>' +
        '</div>' +
        '<span>Lease Type</span>' +
        '<div class="form-row">' +
        '<input type="radio" class ="leaseTermType" name="leaseTermType" value="Monthly" id="monthly>' +
        '<label for="monthly">Monthly</label>' +
        '</div>' +
        '<div class="form-row">' +
        '<input type="radio" class ="leaseTermType" name="leaseTermType" value="Weekly" id="weekly>' +
        '<label for="weekly">Weekly</label>' +
        '</div>' +
        '<div class="form-row">' +
        '<input type="radio" class ="leaseTermType" name="leaseTermType" value="Daily" id="daily">' +
        '<label for="daily">Daily</label>' +
        '</div>' +
        '<div class="form-row">' +
        '<input type="checkbox" name="active" id = "active" checked>' +
        '<label for="active">Active</label>' +
        '</div>' +
        '<button type="button" onclick="addWorkspace(' + idProperty + ')">Add</button>' +
        '<div id="error-message-signup"></div>'
    container.appendChild(formAddWorkspace)
    $("#container").fadeIn("slow")
}
function goEditWorkspace(w) {
    idWorkspace = w.substring(11)
    selectedWorkspace = workspaces.filter((workspace) => {
        return (workspace.idWorkspace == idWorkspace)
    })
    $("#container").hide()
    container.innerHTML = ""
    let formEditWorkspace = document.createElement("div")
    formEditWorkspace.id = "editworkspace"
    formEditWorkspace.innerHTML =
        '<label for="name">Workspace Name</label>' +
        '<input type="text" name="nameWorkspace" id="nameWorkspace">' +
        '<label for="type">Type: </label>' +
        '<input type="text" name="type" id="type">' +
        '<div class="form-row">' +
        '<input type="checkbox" name="isSmokeAllowed" id = "isSmokeAllowed">' +
        '<label for="isSmokeAllowed">Smoke Allowed</label>' +
        '</div>' +
        '<div class="form-row">' +
        '    <label for="capacity">Capacity</label>' +
        '    <input type="number" name="capacity" id="capacity" value=1 size=5>' +
        '</div>' +
        '<label for="availableDate">Available Date</label>' +
        '<input type="date" name="availableDate" id ="availableDate"></input>' +
        '<div class="form-row">' +
        '    <label for="price">Price</label>' +
        '    <input type="number" name="price" id="price"  size=15>' +
        '</div>' +
        '<span>Lease Type</span>' +
        '<div class="form-row">' +
        '<input type="radio" class ="leaseTermType" name="leaseTermType" value="Monthly" id="monthly">' +
        '<label for="monthly">Monthly</label>' +
        '</div>' +
        '<div class="form-row">' +
        '<input type="radio" class ="leaseTermType" name="leaseTermType" value="Weekly" id="weekly">' +
        '<label for="weekly">Weekly</label>' +
        '</div>' +
        '<div class="form-row">' +
        '<input type="radio" class ="leaseTermType" name="leaseTermType" value="Daily" id="daily">' +
        '<label for="daily">Daily</label>' +
        '</div>' +
        '<div class="form-row">' +
        '<input type="checkbox" name="active" id = "active">' +
        '<label for="active">Active</label>' +
        '</div>' +
        '<button type="button" onclick="editWorkspace(' + idWorkspace + ')">Save Changes</button>' +
        '<div id="message"></div>'
    container.appendChild(formEditWorkspace)
    document.getElementById("nameWorkspace").value = selectedWorkspace[0].nameWorkspace
    document.getElementById("type").value = selectedWorkspace[0].type
    document.getElementById("isSmokeAllowed").value = selectedWorkspace[0].isSmokeAllowed
    document.getElementById("capacity").value = selectedWorkspace[0].capacity
    document.getElementById("availableDate").value = selectedWorkspace[0].availableDate
    document.getElementById("price").value = selectedWorkspace[0].price
    if (selectedWorkspace[0].leaseTermType == "Monthly")
        document.getElementById("monthly").checked = true
    if (selectedWorkspace[0].leaseTermType == "Weekly")
        document.getElementById("weekly").checked = true
    if (selectedWorkspace[0].leaseTermType == "Daily")
        document.getElementById("daily").checked = true
    document.getElementById("active").value = selectedWorkspace[0].active
    $("#container").fadeIn("slow")
}
async function addProperty() {
    let nameProperty = document.getElementById("name").value
    let address = document.getElementById("address").value
    let neighborhood = document.getElementById("neighborhood").value
    let squaredFeet = document.getElementById("squaredfeet").value
    let hasParkingGarage = document.querySelector('#hasParkingGarage').checked
    let hasAccessiblePublicTransportation = document.querySelector('#hasAccessiblePublicTransportation').checked
    let active = document.querySelector('#active').checked
    objAddNewProperty = {
        name: nameProperty,
        address: address,
        neighborhood: neighborhood,
        squaredFeet: squaredFeet,
        hasParkingGarage: hasParkingGarage,
        hasAccessiblePublicTransportation: hasAccessiblePublicTransportation,
        active: active,
        idOwner: userLogged.id
    }
    JSONAddNewProperty = JSON.stringify(objAddNewProperty)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSONAddNewProperty,
        redirect: 'follow'
    };
    const url = "http://localhost:3000/addproperty"
    try {
        const response = await fetch(url, requestOptions);
        const result = await response.text();
        const resStatus = await response.status;
        console.log(resStatus);
        console.log(result);
        if (resStatus == "500") {
        } else if (resStatus == "201") {
            listProperties('all')
        }
    } catch (error) {
        console.error(error);
    }
}
async function editProperty(idProperty) {
    let nameProperty = document.getElementById("name").value
    let address = document.getElementById("address").value
    let neighborhood = document.getElementById("neighborhood").value
    let squaredFeet = document.getElementById("squaredFeet").value
    let hasParkingGarage = document.querySelector('#hasParkingGarage').checked
    let hasAccessiblePublicTransportation = document.querySelector('#hasAccessiblePublicTransportation').checked
    let active = document.querySelector('#active').checked

    objEditProperty = {
        idProperty: idProperty,
        name: nameProperty,
        address: address,
        neighborhood: neighborhood,
        squaredFeet: squaredFeet,
        hasParkingGarage: hasParkingGarage,
        hasAccessiblePublicTransportation: hasAccessiblePublicTransportation,
        active: active,
        idOwner: selectedProperty.idOwner
    }
    JSONEditProperty = JSON.stringify(objEditProperty)
    var myHeaders = new Headers();
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSONEditProperty,
        redirect: 'follow'
    };
    const url = "http://localhost:3000/editproperty"
    try {
        const response = await fetch(url, requestOptions);
        const result = await response.text();
        const resStatus = await response.status;
        if (resStatus == "500") {
            $("#message").text(result)
            $("#message").css("color", "var(--color2)")
        } else if (resStatus == "201") {
            $("#message").hide()
            $("#message").text(result)
            $("#message").css("color", "var(--color4)")
            $("#message").fadeIn("slow")
            setTimeout(listProperties('all'), 3000)
        }
    } catch (error) {
        console.error(error);
    }
}
async function addWorkspace(idProperty) {
    let nameWorkspace = document.getElementById("nameWorkspace").value
    let type = document.getElementById("type").value
    let capacity = document.getElementById("capacity").value
    let availableDate = document.getElementById("availableDate").value
    let isSmokeAllowed = document.querySelector('#isSmokeAllowed').checked
    let price = document.getElementById("price").value
    let active = document.querySelector('#active').checked
    let eLeaseTermType = document.getElementsByClassName('leaseTermType')
    let leaseTermType
    for (let i = 0; i < eLeaseTermType.length; i++) {
        console.log(eLeaseTermType[i].value)
        console.log(eLeaseTermType[i].checked)
        if (eLeaseTermType[i].checked) {
            leaseTermType = eLeaseTermType[i].value
        }
        console.log(leaseTermType)
    }
    objAddNewWorkspace = {
        nameWorkspace: nameWorkspace,
        type: type,
        capacity: capacity,
        availableDate: availableDate,
        isSmokeAllowed: isSmokeAllowed,
        price: price,
        leaseTermType: leaseTermType,
        active: active,
        idProperty: idProperty
    }
    JSONAddNewWorkspace = JSON.stringify(objAddNewWorkspace)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSONAddNewWorkspace,
        redirect: 'follow'
    };
    const url = "http://localhost:3000/addworkspace"
    try {
        const response = await fetch(url, requestOptions);
        const resStatus = await response.status;
        if (resStatus == "500") {
        } else if (resStatus == "201") {
        }
    } catch (error) {
        console.error(error);
    }
}
async function editWorkspace(idWorkspace) {
    let nameWorkspace = document.getElementById("nameWorkspace").value
    let type = document.getElementById("type").value
    let capacity = document.getElementById("capacity").value
    let availableDate = document.getElementById("availableDate").value
    let isSmokeAllowed = document.querySelector('#isSmokeAllowed').checked
    let price = document.getElementById("price").value
    let active = document.querySelector('#active').checked
    let eLeaseTermType = document.getElementsByClassName('leaseTermType')
    let leaseTermType
    for (let i = 0; i < eLeaseTermType.length; i++) {
        console.log(eLeaseTermType[i].value)
        console.log(eLeaseTermType[i].checked)
        if (eLeaseTermType[i].checked) {
            leaseTermType = eLeaseTermType[i].value
        }
        console.log(leaseTermType)
    }
    objEditWorkspace = {
        nameWorkspace: nameWorkspace,
        type: type,
        capacity: capacity,
        availableDate: availableDate,
        isSmokeAllowed: isSmokeAllowed,
        price: price,
        leaseTermType: leaseTermType,
        active: active,
        idWorkspace: idWorkspace
    }
    JSONEditWorkspace = JSON.stringify(objEditWorkspace)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSONEditWorkspace,
        redirect: 'follow'
    };
    const url = "http://localhost:3000/editworkspace"
    try {
        const response = await fetch(url, requestOptions);
        const result = await response.text();
        const resStatus = await response.status;
        if (resStatus == "500") {
            $("#message").text(result)
            $("#message").css("color", "var(--color2)")
        } else if (resStatus == "201") {
            $("#message").text(result)
            $("#message").css("color", "var(--color4)")
        }
    } catch (error) {
        console.error(error);
    }
}
function logout() {
    userLogged = {}
    updateLogin()
    listProperties('all')

}
async function login() {
    let username = document.getElementById("input-username-login")
    let password = document.getElementById("input-password-login")

    try {
        const response = await fetch('https://api.ipify.org/?format=json');
        const result = await response.text();
        const resStatus = await response.status;
        console.log(resStatus);
        console.log(result);
        objIp = JSON.parse(result)
    } catch (error) {
        console.error(error);
    }
    objLogin = {
        username: username.value,
        password: password.value,
        ip: objIp.ip
    }
    JSONLogin = JSON.stringify(objLogin)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSONLogin,
        redirect: 'follow'
    };
    const url = "http://localhost:3000/login"
    try {
        const response = await fetch(url, requestOptions);
        const result = await response.text();
        const resStatus = await response.status;
        if (resStatus == "500") {
        } else if (resStatus == "201") {
            resultObj = JSON.parse(result)
            userLogged = resultObj
            updateLogin()
            listProperties('all')
        }
    } catch (error) {
        console.error(error);
    }
}
async function listProperties(n) {
    let obj = { id: n, userLogged }
    let JSONobj = JSON.stringify(obj)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSONobj,
        redirect: 'follow'
    };
    const url = "http://localhost:3000/listallproperties"
    try {
        const response = await fetch(url, requestOptions);
        const result = await response.text();
        const resStatus = await response.status;
        if (resStatus == "500") {
            $("#container").hide()
        } else if (resStatus == "200") {
            resultObj = JSON.parse(result)
            properties = resultObj
            showProperties(resultObj)
        }
    } catch (error) {
        console.error(error);
    }
}
async function getpropertybyid(n) {


    let obj = { id: n }
    let JSONobj = JSON.stringify(obj)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSONobj,
        redirect: 'follow'
    };
    const url = "http://localhost:3000/getpropertybyid"
    try {
        const response = await fetch(url, requestOptions);
        const result = await response.text();
        const resStatus = await response.status;
        if (resStatus == "500") {
            $("#container").hide()
        } else if (resStatus == "200") {
            resultObj = JSON.parse(result)
            return resultObj
        }
    } catch (error) {
        console.error(error);
    }
}
function showProperties(p) {
    container.innerHTML = ""
    let selectors = document.createElement("div")
    selectors.id = "selectors"
    selectors.innerHTML = '<label for="sort">Sort by</label>            <select name="sort" onchange="sortProperties()" id="sortselector">                <option value="-">-</option>                <option value="name">Name</option>                <option value="neighborhood">Neighborhood</option>                <option value="squaredFeet">Squared Feet</option>                <option value="hasParkingGarage">Parking Garage</option>                <option value="hasAccessiblePublicTransportation">Accessible Public Transportation </option>            </select>            <label for="searchselector">Search</label>            <select name="searchselector" id="searchselector">                <option value="-">-</option>                <option value="name">Name</option>                <option value="neighborhood">Neighborhood</option>            </select>            <label for="inputcriteria">Value</label>            <input type="text" name="inputcriteria" id="inputcriteria">            <button type="button" onclick="searchProperties()">Search</button>'
    container.appendChild(selectors)
    let titleProperties = document.createElement("div")
    titleProperties.innerHTML = "List of properties"
    container.appendChild(titleProperties)
    let propertiesPage = document.createElement("div")
    propertiesPage.className = "properties-page"
    container.appendChild(propertiesPage)
    p.forEach(e => {
        if (userLogged.type == "owner" || e.active == true) {
            let card = document.createElement("div")
            card.className = "card-properties"
            card.id = "property" + e.idProperty
            card.innerHTML = '<div class="title-card-property">' + e.name + '</div>'
            card.innerHTML += '<div class="details-card-property">Neighborhood: ' + e.neighborhood + '</div>'
            card.innerHTML += '<div class="details-card-property">Address: ' + e.address + '</div>'
            card.innerHTML += '<div class="details-card-property">SqFeet: ' + e.squaredFeet + '</div>'
            if (e.hasParkingGarage) {
                card.innerHTML += '<div class="details-card-property">✅ Parking Garage</div>'
            } else {
                card.innerHTML += '<div class="details-card-property">❌ Parking Garage</div>'
            }
            if (e.hasAccessiblePublicTransportation) {
                card.innerHTML += '<div class="details-card-property">✅ Accessible Public Transportation</div>'
            } else {
                card.innerHTML += '<div class="details-card-property">❌ Accessible Public Transportation</div>'
            }
            if (e.active) {
                card.innerHTML += '<div class="details-card-property">✅ Active</div>'
            } else {
                card.innerHTML += '<div class="details-card-property">❌ Active</div>'
            }
            if (userLogged.type == 'owner')
                card.innerHTML += '<div id="card-buttons"><button type="button" class="owner" onclick="goEditProperty(\'idProperty' + e.idProperty + '\')">Edit Property</button></div>'
            if (userLogged.type == 'renter')
                card.innerHTML += '<div id="card-buttons"><button type="button" class="renter" onclick="getContact(' + e.idProperty + ', ' + e.idOwner + ')">See contact</button></div>'

            card.innerHTML += '<button type="button" onclick="listWorkspaces(' + e.idProperty + ')">List Workspaces</button></div>'
            card.innerHTML += '<div id="contact' + e.idProperty + '"></div>'
            propertiesPage.appendChild(card)
        }
    });
    if (userLogged.type == 'owner') {
        let card = document.createElement("div")
        card.id = "card-add"
        card.innerHTML = '<img id="img-add" src="add.png" alt="">' +
            '<button type="button" onclick="goAddProperty()">Add new Property</button>'
        propertiesPage.appendChild(card)
    }
}
function showWorkspaces(w, idProperty) {
    container.innerHTML = ""
    let selectors = document.createElement("div")
    selectors.id = "selectors"
    selectors.innerHTML = '<label for="sort">Sort by</label> <select name="sort" onchange="sortWorkspaces()" id="sortselector"> <option value="-">-</option> <option value="name">Name</option> <option value="type">Type</option> <option value="capacity">Capacity</option> <option value="availableDate">Available Date</option> <option value="price">Price</option> </select> <label for="searchselector">Search</label> <select name="searchselector" id="searchselector"> <option value="-">-</option> <option value="name">Name</option> <option value="capacity">Capacity</option> </select> <label for="inputcriteria">Value</label> <input type="text" name="inputcriteria" id="inputcriteria"> <button type="button" onclick="searchWorkspaces()">Search</button>'
    container.appendChild(selectors)
    selectedProperty = properties.filter((property) => {
        return (property.idProperty == idProperty)
    })
    let cardProperty = document.createElement("div")
    cardProperty.className = "card-properties"
    cardProperty.id = "property" + selectedProperty[0].idProperty
    cardProperty.innerHTML = '<div class="title-card-property">' +
        selectedProperty[0].name + '</div>'
    cardProperty.innerHTML += '<div class="details-card-property">Neighborhood: ' + selectedProperty[0].neighborhood + '</div>'
    cardProperty.innerHTML += '<div class="details-card-property">Address: ' + selectedProperty[0].address + '</div>'
    cardProperty.innerHTML += '<div class="details-card-property">SqFeet: ' + selectedProperty[0].squaredFeet + '</div>'
    if (selectedProperty[0].hasParkingGarage) {
        cardProperty.innerHTML += '<div class="details-card-property">✅ Parking Garage</div>'
    } else {
        cardProperty.innerHTML += '<div class="details-card-property">❌ Parking Garage</div>'
    }
    if (selectedProperty[0].hasAccessiblePublicTransportation) {
        cardProperty.innerHTML += '<div class="details-card-property">✅ Accessible Public Transportation</div>'
    } else {
        cardProperty.innerHTML += '<div class="details-card-property">❌ Accessible Public Transportation</div>'
    }
    if (selectedProperty[0].active) {
        cardProperty.innerHTML += '<div class="details-card-property">✅ Active</div>'
    } else {
        cardProperty.innerHTML += '<div class="details-card-property">❌ Active</div>'
    }
    if (userLogged.type == 'renter') {
        cardProperty.innerHTML += '<div id="card-buttons"><button type="button" class="renter" onclick="getContact(' + selectedProperty[0].idProperty + ', ' + selectedProperty[0].idOwner + ')">See contact</button></div>'
        cardProperty.innerHTML += '<div id="contact' + idProperty + '"></div>'
    }
    console.log(userLogged.type)
    if (userLogged.type == undefined) {
        cardProperty.innerHTML += '<div id="card-buttons"><button type="button" onclick="goLogin()">Login to see contact</button></div>'
    }
    container.appendChild(cardProperty)
    let titleWorkspaces = document.createElement("div")
    titleWorkspaces.innerHTML = "List of Workspaces"
    container.appendChild(titleWorkspaces)
    let workspacesPage = document.createElement("div")
    workspacesPage.className = "workspaces-page"
    container.appendChild(workspacesPage)
    w.forEach(e => {
        let card = document.createElement("div")
        card.className = "card-workspace"
        card.id = "workspace" + e.idWorkspace
        card.innerHTML = '<div class="title-card-workspace">' +
            e.nameWorkspace + '</div>' +
            '<div class="details-card-workspace">' +
            'Type: ' + e.type + '<br>' +
            'Capacity: ' + e.capacity + '<br>' +
            'Smoke Allowed: ' + e.isSmokeAllowed + '<br>' +
            'Available Date: ' + e.availableDate + '<br>' +
            'Term Type: ' + e.leaseTermType + '<br>' +
            'Price: C$' + e.price + '<br>' +
            'Active: ' + e.active + '<br>' +
            '</div>'
        if (userLogged.type == 'owner') {
            card.innerHTML += '<div id="card-buttons"><button type="button" onclick="goEditWorkspace(\'idWorkspace' + e.idWorkspace + '\')">Edit Workspace</button></div>'
        }
        if (e.active == true) {
        workspacesPage.appendChild(card)
        }
        console.log(e)
    });
    if (userLogged.type == 'owner') {
        let card = document.createElement("div")
        card.id = "card-add"
        card.innerHTML = '<img id="img-add" src="add.png" alt="">' +
        '<button type="button" onclick="goAddWorkspace(' + idProperty + ')">Add new Workspace</button>'
        workspacesPage.appendChild(card)
    }
}
async function listWorkspaces(idProperty) {
    objIdProperty = {
        idProperty: idProperty
    }
    JSONIdProperty = JSON.stringify(objIdProperty)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSONIdProperty,
        redirect: 'follow'
    };
    const url = "http://localhost:3000/listworkspaces"
    try {
        const response = await fetch(url, requestOptions);
        const result = await response.text();
        const resStatus = await response.status;
        if (resStatus == "500") {
        } else if (resStatus == "201") {
            resultObj = JSON.parse(result)
            workspaces = resultObj
            showWorkspaces(resultObj, idProperty)
        }
    } catch (error) {
        console.error(error);
    }
}
async function signup() {
    let username = document.getElementById("input-username-signup")
    let fullname = document.getElementById("input-fullname-signup")
    let phonenumber = document.getElementById("input-phonenumber-signup")
    let password = document.getElementById("input-password-signup")
    let reenterpassword = document.getElementById("input-reenterpassword-signup")
    let type = document.querySelector('input[name="role"]:checked').value
    if (username.value == "" || fullname.value == "" || phonenumber.value == "" || password.value == "") {
        $("#error-message-signup").text("Please fill all fields")
        $("#error-message-signup").css("color", "var(--color2)")
        return
    }
    if (password.value != reenterpassword.value) {
        $("#error-message-signup").text("re-entered password is different than password")
        $("#error-message-signup").css("color", "var(--color2)")
        return
    }
    objSignup = {
        id: 0,
        name: fullname.value,
        phone: phonenumber.value,
        email: username.value,
        password: password.value,
        type: type,
    }
    JSONSignup = JSON.stringify(objSignup)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSONSignup,
        redirect: 'follow'
    };
    const url = "http://localhost:3000/signup"
    try {
        const response = await fetch(url, requestOptions);
        const result = await response.text();
        const resStatus = await response.status;
        console.log(resStatus);
        console.log(result);
        if (resStatus == "500") {
            $("#error-message-signup").text(result)
            $("#error-message-signup").css("color", "var(--color2)")
        } else if (resStatus == "201") {
            $("#error-message-signup").text("Signup successful")
            $("#error-message-signup").css("color", "var(--color4)")
            goLogin()
        }
    } catch (error) {
        console.error(error);
    }
}
function updateLogin() {
    if (userLogged.type == "owner") {
        console.log("OWNER LOGGED");
        $(".owner").show()
        $(".renter").hide()
        $(".authenticated").show()
        $(".not-authenticated").hide()
    } else if (userLogged.type == "renter") {
        console.log("RENTER LOGGED");
        $(".owner").hide()
        $(".renter").show()
        $(".authenticated").show()
        $(".not-authenticated").hide()
    } else {
        console.log("NO ONE LOGGED");
        $(".owner").hide()
        $(".renter").hide()
        $(".authenticated").hide()
        $(".not-authenticated").show()
    }
    if (userLogged != "") {
        $("#welcome-message").text("Welcome, " + userLogged.name + "!")
    } else {
        $("#welcome-message").text("")
    }
}
async function getContact(idProperty, idOwner) {
    console.log("Trying to get the contact")
    objId = {
        id: idOwner
    }
    JSONId = JSON.stringify(objId)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSONId,
        redirect: 'follow'
    };
    const url = "http://localhost:3000/getcontact"
    try {
        const response = await fetch(url, requestOptions);
        const result = await response.text();
        const resStatus = await response.status;
        resultObj = JSON.parse(result)
        console.log(resStatus);
        console.log(result);
        $("#contact" + idProperty).html("Name: " + resultObj.name + "<br>Phone: " + resultObj.phone + "<br>email: " + resultObj.email)
        if (resStatus == "500") {
        } else if (resStatus == "201") {
            resultObj = JSON.parse(result)
            return resultObj
        }
    } catch (error) {
        console.error(error);
    }
}
function sortProperties() {
    let criteria = document.getElementById("sortselector").value
    console.log(criteria)
    switch (criteria) {
        case "name":
            properties.sort((a, b) => {
                if (a.name < b.name) {
                    return -1
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0
            })
            showProperties(properties)
            break;

        case "neighborhood":
            properties.sort((a, b) => {
                if (a.neighborhood < b.neighborhood) {
                    return -1
                }
                if (a.neighborhood > b.neighborhood) {
                    return 1;
                }
                return 0
            })
            showProperties(properties)
            break;

        case "squaredFeet":
            properties.sort((a, b) => {
                if (parseFloat(a.squaredFeet) < parseFloat(b.squaredFeet)) {
                    return -1
                }
                if (parseFloat(a.squaredFeet) > parseFloat(b.squaredFeet)) {
                    return 1;
                }
                return 0
            })
            showProperties(properties)
            break;

        case "hasParkingGarage":
            properties.sort((a, b) => {
                if (a.hasParkingGarage < b.hasParkingGarage) {
                    return 1
                }
                if (a.hasParkingGarage > b.hasParkingGarage) {
                    return -1;
                }
                return 0
            })
            showProperties(properties)
            break;
        case "hasAccessiblePublicTransportation":
            properties.sort((a, b) => {
                if (a.hasAccessiblePublicTransportation < b.hasAccessiblePublicTransportation) {
                    return 1
                }
                if (a.hasAccessiblePublicTransportation > b.hasAccessiblePublicTransportation) {
                    return -1;
                }
                return 0
            })
            showProperties(properties)
            break;
        default:
            break;
    }


}
function searchProperties() {
    let searchParam = document.getElementById("searchselector").value
    let searchValue = document.getElementById("inputcriteria").value
    let filteredProperties
    switch (searchParam) {
        case "-":
            filteredProperties = properties

            break;
        case "name":
            filteredProperties = properties.filter((property) => {
                return property.name.toLowerCase().includes(searchValue.toLowerCase())
            })

            break;
        case "neighborhood":
            filteredProperties = properties.filter((property) => {
                return property.neighborhood.toLowerCase().includes(searchValue.toLowerCase())
            })

            break;
        default:
            break;
    }
    showProperties(filteredProperties)

    console.log(filteredProperties);
}
function sortWorkspaces() {
    let criteria = document.getElementById("sortselector").value
    console.log(criteria)
    switch (criteria) {
        case "name":
            workspaces.sort((a, b) => {
                if (a.nameWorkspace < b.nameWorkspace) {
                    return -1
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0
            })
            showWorkspaces(workspaces, selectedProperty[0].idProperty)
            break;

        case "type":
            workspaces.sort((a, b) => {
                if (a.type < b.type) {
                    return -1
                }
                if (a.type > b.type) {
                    return 1;
                }
                return 0
            })
            showWorkspaces(workspaces, selectedProperty[0].idProperty)
            break;

        case "capacity":
            workspaces.sort((a, b) => {
                if (parseFloat(a.capacity) < parseFloat(b.capacity)) {
                    return -1
                }
                if (parseFloat(a.capacity) > parseFloat(b.capacity)) {
                    return 1;
                }
                return 0
            })
            showWorkspaces(workspaces, selectedProperty[0].idProperty)
            break;

        case "availableDate":
            workspaces.sort((a, b) => {
                if (a.availableDate < b.availableDate) {
                    return -1
                }
                if (a.availableDate > b.availableDate) {
                    return 1;
                }
                return 0
            })
            showWorkspaces(workspaces, selectedProperty[0].idProperty)
            break;
        case "price":
            workspaces.sort((a, b) => {
                if (parseFloat(a.price) > parseFloat(b.price)) {
                    return 1
                }
                if (parseFloat(a.price) < parseFloat(b.price)) {
                    return -1;
                }
                return 0
            })
            showWorkspaces(workspaces, selectedProperty[0].idProperty)
            break;
        default:
            break;
    }


}
function searchWorkspaces() {
    let searchParam = document.getElementById("searchselector").value
    let searchValue = document.getElementById("inputcriteria").value
    let filteredProperties
    switch (searchParam) {
        case "-":
            filteredWorkspaces = workspaces
            break;
        case "name":
            filteredWorkspaces = workspaces.filter((workspace) => {
                return workspace.nameWorkspace.toLowerCase().includes(searchValue.toLowerCase())
            })

            break;
        case "neighborhood":
            filteredProperties = properties.filter((property) => {
                return property.neighborhood.toLowerCase().includes(searchValue.toLowerCase())
            })

            break;
        default:
            break;
    }
    showWorkspaces(filteredWorkspaces, selectedProperty[0].idProperty)
}
function updateFormat() {
    for (const el of document.querySelectorAll("[placeholder][data-slots]")) {
        const pattern = el.getAttribute("placeholder"),
            slots = new Set(el.dataset.slots || "_"),
            prev = (j => Array.from(pattern, (c, i) => slots.has(c) ? j = i + 1 : j))(0),
            first = [...pattern].findIndex(c => slots.has(c)),
            accept = new RegExp(el.dataset.accept || "\\d", "g"),
            clean = input => {
                input = input.match(accept) || [];
                return Array.from(pattern, c =>
                    input[0] === c || slots.has(c) ? input.shift() || c : c
                );
            },
            format = () => {
                const [i, j] = [el.selectionStart, el.selectionEnd].map(i => {
                    i = clean(el.value.slice(0, i)).findIndex(c => slots.has(c));
                    return i < 0 ? prev[prev.length - 1] : back ? prev[i - 1] || first : i;
                });
                el.value = clean(el.value).join``;
                el.setSelectionRange(i, j);
                back = false;
            };
        let back = false;
        el.addEventListener("keydown", (e) => back = e.key === "Backspace");
        el.addEventListener("input", format);
        el.addEventListener("focus", format);
        el.addEventListener("blur", () => el.value === pattern && (el.value = ""));
    }

}