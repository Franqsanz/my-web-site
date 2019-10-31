// menu hamburguesa
let nav = document.querySelector('.nav');
let hamburguesa = document.querySelector('.hamburgesa');
let cerrarNav = document.querySelector('.cerrarNav');
let X = document.querySelector('.X');

hamburguesa.addEventListener('click', () => {
    nav.style.left = 0;
});
cerrarNav.addEventListener('click', () => {
    nav.style.left = '-240px';
});
X.addEventListener('click', () => {
    nav.style.left = '-240px';
});