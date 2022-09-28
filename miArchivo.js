
let catalogueData = [
    {id:"1", name: "Mate", price: 2000, amount: 1},
    {id:"2", name: "Bombilla", price: 1000, amount: 1},
    {id:"3", name: "Termo", price: 10000, amount: 1},
    {id:"4", name: "Yerba", price: 500, amount: 1},
    {id:"5", name: "Bolso Matero", price: 5000, amount: 1}
];


const productsContainer = document.getElementById('productsContainer');
const cartContainer = document.getElementById('cartContainer');
const btnEmptyCart = document.getElementById('emptyCart');
const totalPrice = document.getElementById('totalPrice');
const checkout = document.getElementById('checkout');

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'));
        updateCart();
    }
})


btnEmptyCart.addEventListener('click', () => {
    Swal.fire({
        title: 'Estas seguro de vaciar carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, vaciar carrito!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            "Carrito vaciado con exito!"
          )
        }
      })

    cart.length = 0;
    updateCart();
})


catalogueData.forEach((prod) => {
    const div = document.createElement('div')
    
    div.innerHTML = 
    `
    <h3>${prod.name}</h3>
    <p class="priceProduct">Precio:$ ${prod.price}</p>
    <button id="add${prod.id}" class="btnAdd">Agregar </button>

    `
  
    productsContainer.appendChild(div);

    
    let btn = document.getElementById(`add${prod.id}`)

    btn.addEventListener('click', () => {
        addCart(prod.id);
    })

})


const addCart = (prodId) => {

    const productExists = cart.some (prod => prod.id === prodId)

    if(productExists){
        const prod = cart.map(prod => {
            if (prod.id === prodId){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Producto agregado con éxito',
                    showConfirmButton: false,
                    timer: 1500
                  })

                prod.amount++
                
            }
        })

    } else {

        const item = catalogueData.find((prod) => prod.id === prodId);
        cart.push(item);
       // console.log(cart);
}

updateCart()
}

const removeFromCart = (prodId) => {
    const item = cart.find((prod) => prod.id === prodId);
    const index = cart.indexOf(item)
    cart.splice(index,1)
    updateCart();
}

const updateCart = () => {

    cartContainer.innerHTML = "";

    cart.forEach((prod)=> {

        const div = document.createElement('div')
        div.innerHTML = `
        <p>${prod.name}</p>
        <p>Precio: $${prod.price}</p>
        <p>Cantidad: <span id="amount">${prod.amount}</span></p>
        <button onclick = "removeFromCart(${prod.id})" class ="btnDelete">Eliminar<i class="fas fa-trash-alt"</button>
        `

        cartContainer.appendChild(div);
        localStorage.setItem('cart', JSON.stringify(cart));

        totalPrice.innerHTML = cart.reduce((acc,prod) => acc + prod.price * prod.amount, 0);
        
    })

}

 checkout.onclick = () => {

    Swal.fire("Gracias por su compra, hasta luego")
}


