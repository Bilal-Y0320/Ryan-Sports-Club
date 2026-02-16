const dropdown = document.querySelector('.dropdown');
const toggle = document.querySelector('.dropdown-toggle');
const navbar = document.querySelector('.navbar');
const filterButtons = document.querySelectorAll(".buttons button");
const sportCards = document.querySelectorAll(".all-cards .card");
const testimonialCards = document.querySelectorAll('.testimonial-cards .card');

// 2. navbar 
toggle.addEventListener('click', (e) => {
    e.preventDefault();
    dropdown.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
    }
});

window.onscroll = () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
}

const navSlide = () => {
    const burger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        burger.classList.toggle('toggle');
    });
}

navSlide();

// 3. cards filter
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        sportCards.forEach(card => {
            if (filter === "all") {
                card.style.display = "flex";
            }
            else if (card.classList.contains(`card-${filter}`)) {
                card.style.display = "flex";
            }
            else {
                card.style.display = "none";
            }
        });
    });
});

// 4. testimonial
let current = 0;
function showTestimonial() {
    testimonialCards.forEach((card, index) => {
        card.style.display = index === current ? 'block' : 'none';
    });
    current = (current + 1) % testimonialCards.length;
}
if (testimonialCards.length > 0) {
    showTestimonial();
    setInterval(showTestimonial, 5000);
}

// 5. faq
const faqs = document.querySelectorAll('.faq');
faqs.forEach(faq => {
    faq.addEventListener('click', () => {
        faq.classList.toggle('active');
        const answer = faq.querySelector('.faq-answer');
        if (faq.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = 0;
        }
    });
});

// 6. feedback
const form = document.getElementById('feedbackForm');
const thankYouMessage = document.getElementById('thankYouMessage');

if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const feedback = document.getElementById('feedback').value.trim();
        const stars = document.querySelector('input[name="stars"]:checked');

        if (!name || !email || !feedback || !stars) {
            alert("Please fill in all required fields!");
            return;
        }

        form.style.display = 'none';
        thankYouMessage.style.display = 'block';
        form.reset();
    });
}

// Membership Form

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("membershipForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const firstName = document.getElementById("firstName");
        const lastName = document.getElementById("lastName");
        const email = document.getElementById("email");
        const phone = document.getElementById("phone");
        const zip = document.getElementById("zipCode");

        const nameRegex = /^[A-Za-z]{2,}$/;
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        const phoneRegex = /^[\+]?[0-9]{7,15}$/;
        const zipRegex = /^[0-9]{5,10}$/;

        if (!nameRegex.test(firstName.value)) {
            alert("First name must be letters only and at least 2 characters.");
            firstName.focus();
            return;
        }

        if (!nameRegex.test(lastName.value)) {
            alert("Last name must be letters only and at least 2 characters.");
            lastName.focus();
            return;
        }

        if (!emailRegex.test(email.value)) {
            alert("Please enter a valid email address.");
            email.focus();
            return;
        }

        if (!phoneRegex.test(phone.value)) {
            alert("Phone number must be between 7 and 15 digits.");
            phone.focus();
            return;
        }

        if (zip.value && !zipRegex.test(zip.value)) {
            alert("Zip code must be between 5 and 10 digits.");
            zip.focus();
            return;
        }

        alert("Success! Form submitted for Ryan Sports Club.");
        form.reset();
    });
});
