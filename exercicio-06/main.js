const img = document.getElementById('img-btn-carrinho');
const btn = document.getElementsByClassName('btn-carrinho')[0];

btn.addEventListener('mouseover', () => {
    img.src = 'img/carrinho-preenchido.png';
});

btn.addEventListener('mouseout', () => {
    img.src = 'img/carrinho.png';
});