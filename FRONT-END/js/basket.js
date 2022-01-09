////  basket procedure////

//Recovery basket  from LOCAL STORAGE 
let cameras = JSON.parse(localStorage.getItem("basket")) ? JSON.parse(localStorage.getItem("basket")) : [];

//container in  HTML
let container = document.getElementById("container");

// INIT the basket price to 0
let prixbasket = 0;

//Recovery product ID
let addIdBasket = [];

//Caalculate the Total Price from local storage
function priceTotalBasket(camera){
  prixbasket += camera.quantity * camera.price / 100;

  //Total Price Calculataion  // send all local storage
  let prixTotal = document.getElementById('prixTotal').textContent = prixbasket + " € ";
  localStorage.setItem('prixTotal', JSON.stringify(prixTotal));
};

//loop to check the basket
cameras.forEach((camera, i) => {
  container.innerHTML += `
    <tr>
        <td class="srcimage"><img src=${camera.imageUrl} alt="" /></td>
        <td>${camera.name}</td>
        <td>${camera.price / 100} €</td>
        <td>${camera.quantity}</td>
        <td><a href="#" class="deleteCamera" data-id="${i}"> <i class="fas fa-trash-alt"></i></a></td>
        <td >${camera.quantity * camera.price / 100} €</td>
    </tr>
  `;
  
  priceTotalBasket(camera)
 
 // loop to add product
  for (let i = 0; i < camera.quantity; i++) {
    addIdBasket .push(camera.id);
  }
});

function deleteCamera(id) {
    let camera = cameras[id];
    if (camera.quantity > 1) {
      camera.quantity--;
    } else {
      cameras.splice(id, 1);
    }
    localStorage.setItem('basket', JSON.stringify(cameras));
    window.location.reload();
  }

// delete only one product from basket
document.querySelectorAll(".deleteCamera").forEach(delBtn => {
  delBtn.addEventListener('click', () => deleteCamera(delBtn.dataset.id))
});

let viderbasket = document.getElementById('viderbasket')
viderbasket.addEventListener('click',  deleteBasket);

//Function delete all the basket
function deleteBasket() {
  if (cameras == null) {
  } else {
    container.remove();
    localStorage.clear();
    window.location.reload();
  }
};

//// F  O  R  M ////

function sendOrder() {
  let form = document.getElementById("form");
  if (form.reportValidity() == true && addIdBasket.length>0) {
    let contact = {
      'firstName': document.getElementById("LName").value,
      'lastName': document.getElementById("firstname").value,
      'address': document.getElementById("address").value,
      'city': document.getElementById("city").value,
      'email': document.getElementById("email").value
    };
 
    let products = addIdBasket;

    let formulaireClient = JSON.stringify({
      contact,
      products,
    });

    // Fetch 

    fetch('http://localhost:3000/api/cameras/order', {
      method: 'POST',
      headers: {
        'content-type': "application/json"
      },
      mode: "cors",
      body: formulaireClient
      })
      .then(function (response) {
        return response.json()
      })
      .then(function (r) {
        localStorage.setItem("contact", JSON.stringify(r.contact));
        window.location.assign("confirmation.html?orderId=" + r.orderId);
      })
      //If Problem Found

      .catch(function (err) {
        console.log("fetch Error");
      });
  }
  else{
    alert(" Please fill up with the appropiate format the mandatory fields")
  };
}

let envoiFormulaire = document.getElementById("envoiFormulaire");

envoiFormulaire.addEventListener('click', function (event) {
  event.preventDefault();
  sendOrder();
});