

const links = document.querySelectorAll('.sidebar a');
const sections = document.querySelectorAll('details.card');

function setActiveLink(id) {
    links.forEach(link => {
        link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${id}`
        );
    });
}

links.forEach(link => {
    link.addEventListener('click', function () {

        const id = this.getAttribute('href').substring(1);
        const target = document.getElementById(id);

        // abre o details ao clicar no menu
        if (target && target.tagName === 'DETAILS') {
            target.open = true;
        }

        setActiveLink(id);
    });
});

sections.forEach(section => {
    section.addEventListener('toggle', function () {
        if (this.open) {
            setActiveLink(this.id);
        }
    });
});

window.addEventListener('scroll', () => {

    let current = null;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= 150 && rect.bottom >= 150) {
            current = section.id;
        }
    });

    if (current) {
        setActiveLink(current);
    }
});

function copiar(id) {

    const el = document.getElementById(id);

    const text = el.innerText
        .replace('Copiado!', '')
        .replace('Copiar', '')
        .trim();

    navigator.clipboard.writeText(text);

    const tooltip = el.querySelector('.tooltip');

    if (tooltip) {
        tooltip.classList.add('show');

        setTimeout(() => {
            tooltip.classList.remove('show');
        }, 1500);
    }
}