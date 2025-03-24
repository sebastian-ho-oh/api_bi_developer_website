export class NavigationComponent {
    constructor(container) {
        this.container = container;
        this.init();
    }

    init() {
        this.render();
        this.setupMobileMenu();
        this.setupScrollEffect();
    }

    render() {
        this.container.innerHTML = `
            <nav>
                <a href="/">
                    <img src="/assets/images/brand/brand_logo.png" alt="Logo">
                </a>
                <button class="mobile-menu-btn">
                    <i class="fas fa-bars"></i>
                </button>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/cv">CV</a></li>
                    <li><a href="/#contact">Kontakt</a></li>
                    <li><a href="/admin/login">Admin</a></li>
                </ul>
            </nav>
        `;
    }

    setupMobileMenu() {
        const mobileMenuBtn = this.container.querySelector('.mobile-menu-btn');
        const navMenu = this.container.querySelector('nav ul');

        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    setupScrollEffect() {
        window.addEventListener('scroll', () => {
            const nav = this.container.querySelector('nav');
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }
} 