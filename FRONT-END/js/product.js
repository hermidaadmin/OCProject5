//RECOVER URL
let params = (new URL(document.location)).searchParams;

//DECLARE THE CONST ID
const id = params.get("id");

// GET THE ELEMENT BY ID
let container = document.getElementById("container");

//  LOCAL STORAGE
const addLocalStorage = basket => {
  localStorage.setItem('basket', JSON.stringify(basket));
};

//   HTML   DISPLAY
const display = camera => {
  container.innerHTML +=`
    <div class="apparience" id="cardsProduct">
      <img src=${camera.imageUrl} alt="">
      <div class="description">
        <p class="nom">${camera.name}</p>
        <span class="apparience-description">
          ${camera.description}
        </span>
        <select class="options" id ="option">
          <option>Choose options</option>
        </select>
        <p class="prix"> Unit Price: ${camera.price/ 100}€</p>
        <select class="quantity" id="quantity">           
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>         
        <a href ="../pages/basket.html"><button type ="submit" id="basket" value="submit"> Add Basket</button></a>
      </div>
    </div>
  `;
  // LOOP DROP SELECTION OPRIONS
  for (let lenses of camera.lenses){
    document.getElementById('option').innerHTML+=
    `<option value="1">${lenses}</option>`
  }
  //  CLICK EVENT + FNCT addProductBasket
  document.getElementById('basket').addEventListener('click', function () {
    addProductBasket(camera)
  });
};

//FONCTION Adjust basket 
const addProductBasket = camera=> {
  camera.quantity = parseInt(document.getElementById('quantity').value);

  //RECovery basket//memo : let variable=(condition)
  let basket = localStorage.getItem('basket') ? JSON.parse(localStorage.getItem('basket')) : [];

  //LOOP TO SHOW THE BASKET PRODUCTS
  let cameraExistIndex = false;
  for (let i = 0; i < basket.length; i++) {
    let product = basket[i];
    //CONDITION CI PRODUIT EXISTE
    if (product.id === camera.id) {
      cameraExistIndex = i;
    }
  };
  // VERIFY IF CAMERA EXIST
  if (false !== cameraExistIndex) {
    basket[cameraExistIndex].quantity = parseInt(basket[cameraExistIndex].quantity) + camera.quantity;
  } else {
    basket.push(camera);
  };
  addLocalStorage(basket)
};

// FETCH THE API 
fetch("http://localhost:3000/api/cameras/" + id)
  .then(response => response.json())
  .then(function (product) {
    let camera = new Camera(product)
    display(camera);
  })
  // CASE API FAIL
  .catch(function(err){
  console.log("fetch Error")
});
