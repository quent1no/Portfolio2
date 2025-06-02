// Script principal pour le portfolio

// Initialisation des animations AOS
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser AOS avec des options personnalisées
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Gestion des onglets et animations de transition
    const tabs = document.querySelectorAll('.nav-link');
    tabs.forEach(tab => {
        tab.addEventListener('shown.bs.tab', function(e) {
            // Réinitialiser les animations AOS lorsqu'un nouvel onglet est affiché
            AOS.refresh();
            
            // Ajouter une classe pour l'animation de fondu
            const targetPane = document.querySelector(e.target.getAttribute('data-bs-target'));
            targetPane.classList.add('fade-in');
            
            // Faire défiler vers le haut lorsqu'un nouvel onglet est sélectionné
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    });

    // Gestion des liens de navigation interne
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').length > 1) {
                e.preventDefault();
                const tabId = this.getAttribute('href').substring(1);
                document.getElementById(tabId + '-tab').click();
            }
        });
    });

    // Animation des barres de progression
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
            bar.style.transition = 'width 1s ease-in-out';
        }, 500);
    });

    // Animation des cartes au survol
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Validation du formulaire de contact
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Vérification simple des champs
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            if (!name.value.trim()) {
                highlightField(name, true);
                isValid = false;
            } else {
                highlightField(name, false);
            }
            
            if (!email.value.trim() || !isValidEmail(email.value)) {
                highlightField(email, true);
                isValid = false;
            } else {
                highlightField(email, false);
            }
            
            if (!subject.value.trim()) {
                highlightField(subject, true);
                isValid = false;
            } else {
                highlightField(subject, false);
            }
            
            if (!message.value.trim()) {
                highlightField(message, true);
                isValid = false;
            } else {
                highlightField(message, false);
            }
            
            if (isValid) {
                // Simuler l'envoi du formulaire
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    // Réinitialiser le formulaire
                    contactForm.reset();
                    
                    // Afficher un message de succès
                    const successAlert = document.createElement('div');
                    successAlert.className = 'alert alert-success mt-3';
                    successAlert.innerHTML = '<i class="fas fa-check-circle"></i> Votre message a été envoyé avec succès!';
                    contactForm.appendChild(successAlert);
                    
                    // Restaurer le bouton
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Supprimer le message après 5 secondes
                    setTimeout(() => {
                        successAlert.remove();
                    }, 5000);
                }, 1500);
            }
        });
    }

    // Fonction pour mettre en évidence les champs de formulaire invalides
    function highlightField(field, isInvalid) {
        if (isInvalid) {
            field.classList.add('is-invalid');
            field.classList.remove('is-valid');
        } else {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
        }
    }

    // Fonction pour valider le format d'email
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});

// Fonction pour basculer entre le mode clair et sombre
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    
    // Sauvegarder la préférence dans localStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        document.getElementById('darkModeIcon').className = 'fas fa-sun';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        document.getElementById('darkModeIcon').className = 'fas fa-moon';
    }
}

// Vérifier la préférence de mode sombre au chargement
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeIcon').className = 'fas fa-sun';
    }
});
