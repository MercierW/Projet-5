let total = localStorage.getItem('Total');
let objContatct = JSON.parse(localStorage.getItem('Reponse'));
let spanOrder = document.querySelector('.orderId');
let spanTotal = document.querySelector('.total');

spanOrder.textContent = objContatct.orderId;
spanTotal.textContent = total;