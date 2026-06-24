document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.portfolio-section');
    const exploreBtn = document.getElementById('explore-btn');
    const contactForm = document.getElementById('contact-form');
    const formResponse = document.getElementById('form-response');

    // Function to handle switching sections dynamically
    function switchSection(targetId) {
        // Remove active states
        sections.forEach(section => section.classList.add('hidden'));
        navLinks.forEach(link => link.classList.remove('active'));

        // Target target elements
        const targetSection = document.querySelector(targetId);
        const targetLink = document.querySelector(`a[href="${targetId}"]`);

        if (targetSection && targetLink) {
            targetSection.classList.remove('hidden');
            targetLink.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Attach click events to navbar navigation items
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            switchSection(targetId);
        });
    });

    // Connect the CTA "View My Work" button on the home page
    if (exploreBtn) {
        exploreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            switchSection('#projects');
        });
    }

    // Handle Contact Form Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            
            // Simulating an API submission response
            formResponse.textContent = `Thank you, ${name}! Your message has been received successfully.`;
            formResponse.classList.remove('hidden');
            formResponse.classList.add('success');
            // Inside your contactForm submit event listener in script.js:
            emailjs.send("service_223olsf", "template_af2fv1o", {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,
                message: document.getElementById('message').value,
                date: new Date().toLocaleDateString()
            }).then(() => {
                // This triggers the success message we already built!
                formResponse.textContent = `Thank you! Your message has been sent.`;
                formResponse.classList.remove('hidden');
            });

            // Reset fields
            contactForm.reset();

            // Fade out response notification after 5 seconds
            setTimeout(() => {
                formResponse.classList.add('hidden');
                formResponse.classList.remove('success');
            }, 5000);
        });
    }
});