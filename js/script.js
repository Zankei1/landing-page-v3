class smoothScroll {
    constructor(navLinks) {
        this.navLinks = navLinks;

        this.addClickEvent = this.addClickEvent.bind(this);
        this.getOffsetTop = this.getOffsetTop.bind(this);
        this.smoothScrollTo = this.smoothScrollTo.bind(this);
        this.scrollOnClick = this.scrollOnClick.bind(this);
    }

    addClickEvent() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', this.scrollOnClick)
        })
    }

    getOffsetTop(element) {
        const id = element.getAttribute('href');
        return document.querySelector(id).offsetTop;
    }

    scrollOnClick(event) {
        event.preventDefault();
        const scrollTo = this.getOffsetTop(event.target);
        this.smoothScrollTo(0, scrollTo, 700);
    }

    smoothScrollTo(endX, endY, duration) {
        const startX = window.scrollX;
        const startY = window.scrollY;
        const distanceX = endX - startX;
        const distanceY = endY - startY;
        const startTime = new Date().getTime();

        duration = typeof duration !== "undefined" ? duration : 400

        const easeInOutQuart = (time, from, distance, duration) => {
            if ((time /= duration / 2) < 1)
                return (distance / 2) * time * time * time * time + from;
            return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
        };

        const timer = setInterval(() => {
            const time = new Date().getTime() - startTime;
            const newX = easeInOutQuart(time, startX, distanceX, duration);
            const newY = easeInOutQuart(time, startY, distanceY, duration);
            if (time >= duration) {
                clearInterval(timer);
            }
            window.scroll(newX, newY)
        }, 1000 / 60);
    }
    
    init() {
        if(this.navLinks) {
            this.addClickEvent();
        }
    }
}

class mobileMenu {
    constructor(mobileMenu, navLinks) {
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navLinks = document.querySelectorAll(navLinks);

        this.toggleMenu = this.toggleMenu.bind(this);
    }

    addClickEvent() {
        this.mobileMenu.addEventListener('click', this.toggleMenu);
        this.mobileMenu.addEventListener('touchstart', this.toggleMenu)

        this.navLinks.forEach(link => {
            link.addEventListener('click', this.toggleMenu)
        })
    }

    toggleMenu(event) {
        const nav = document.querySelector('nav');
        
        if (event.type === 'touchstart') {
            event.preventDefault();
        }
        
        nav.classList.toggle('active');
        
        this.navLinks.forEach(link => {
            link.classList.toggle('active')
        }) 
    }

    init() {
        if(this.mobileMenu) {
            this.addClickEvent();
        }
    }
}   

const navLinks = document.querySelectorAll('.menu a[href^="#"]');
const scroll = new smoothScroll(navLinks);
scroll.init();

const buttonMobile = new mobileMenu(
    "#mobile-button",
    ".menu a"
);

buttonMobile.init();

