
let paramsUrl = new URL(window.location).searchParams;

let orderId = paramsUrl.get("orderId");

// Contact details
let contact = JSON.parse(localStorage.getItem("contact"));

// Total Price
let prixTotal = JSON.parse(localStorage.getItem("prixTotal"));

// Display 
function display (){
    confirmation.innerHTML += `
        <p>
        Dear Customer ${contact.firstName } ${contact.lastName} 
        </p>
        <hr>
        <p>We have received your order No° ${orderId} </br>
        The Order Amount is :${prixTotal}  </br>
        </p>
        An email will be sent to you at : </br> ${contact.email}  when we shipping your order 
    `
};

display();