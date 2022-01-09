let container = document.getElementById("container");
//  HTML DISPLAY FUNCTION
const display = camera => {
    container.innerHTML += `
    <article id="cardsProduct" class="product">
        <img src=${camera.imageUrl} alt="photos product" />
        <div class="bloqueDescription">
            <h2> ${camera.name}</h2>
            <p>${camera.price / 100}€</p>
        </div>
        <p>${camera.description}</p>
        <a href="pages/product.html?id=${camera.id}"> Item details</a>
    </article>`
};

//API CALL WITH FETCH
fetch("http://localhost:3000/api/cameras")
    .then(response => response.json())  
    .then(function (listeProduct) {
        // for loop takes a product from the list
        for (let product of listeProduct) {
            let camera = new Camera(product)
            display(camera);
        }
    })
    // api error
    .catch(function (err) {
        console.log("fetch Error")
        alert("item not available ")
    });


