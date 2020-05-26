// menu hamburguesa
let header = document.querySelector('header'),
    nav = document.querySelector('.nav'),
    Burger = document.querySelector('.hamburgesa'),
    lineaBurger = document.querySelectorAll('.linea'),
    cerrarNav = document.querySelector('.cerrarNav'),
    X = document.querySelector('.X'),

    iconMode = document.querySelector('.iconMode'),
    notFound = document.querySelector('.notFound'),
    logo = document.querySelector('.a_logo'),
    aSobreMi = document.querySelectorAll('.sobreMi'),
    aEnlacesNav = document.querySelectorAll('.nav_enlaces'),
    footer = document.querySelector('footer');

document.addEventListener('DOMContentLoaded', () => {
    function openNav() {
        nav.classList.add('open');
    }

    function closeNav() {
        nav.classList.remove('open');
    }

    Burger.addEventListener('click', openNav);
    cerrarNav.addEventListener('click', closeNav);
    X.addEventListener('click', closeNav);

    // Dark Mode
    function darkMode() {
        if (document.body.classList.add('light')) {
            iconMode.textContent = '🌙';
        } else {
            document.body.classList.toggle('dark');
            header.classList.toggle('dark');
            lineaBurger.forEach(line => {
                line.classList.toggle('dark');
            });
            logo.classList.toggle('dark');
            nav.classList.toggle('dark');

            aEnlacesNav.forEach(enlacesNav => {
                enlacesNav.classList.toggle('dark');
            });
            X.classList.toggle('dark');

            aSobreMi.forEach(aSobreMi => {
                aSobreMi.classList.toggle('dark');
            });
            notFound.classList.toggle('dark');
            footer.classList.toggle('dark');
            iconMode.textContent = '💡';

            localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
        }
    }

    iconMode.addEventListener('click', darkMode);

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.toggle('dark');
        header.classList.toggle('dark');
        logo.classList.toggle('dark');
        nav.classList.toggle('dark');
        lineaBurger.forEach(line => {
            line.classList.toggle('dark');
        });

        aEnlacesNav.forEach(enlacesNav => {
            enlacesNav.classList.toggle('dark');
        });
        X.classList.toggle('dark');

        aSobreMi.forEach(aSobreMi => {
            aSobreMi.classList.toggle('dark');
        });
        notFound.classList.toggle('dark');
        footer.classList.toggle('dark');
        iconMode.textContent = '💡';
    }
});