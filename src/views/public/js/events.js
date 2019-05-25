// menu hamburguesa
let nav = document.querySelector('.nav');
let hamburguesa = document.querySelector('.hamburgesa');
let cerrarNav = document.querySelector('.cerrarNav');

hamburguesa.addEventListener('click', () => {
    nav.style.left = 0;
});
cerrarNav.addEventListener('click', () => {
    nav.style.left = '-240px';
});