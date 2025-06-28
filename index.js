document.addEventListener('DOMContentLoaded', function() {
    // Animation de chargement
    setTimeout(() => {
        document.querySelector('.loading-screen').style.display = 'none';
        document.querySelector('.container').style.display = 'block';
    }, 2500);

    // Gestion des étapes du formulaire
    const formSteps = document.querySelectorAll('.form-step');
    let currentStep = 1;

    function showStep(step) {
        formSteps.forEach(formStep => {
            formStep.classList.remove('active');
            if (parseInt(formStep.dataset.step) === step) {
                formStep.classList.add('active');
                // Animation pour l'étape active
                formStep.style.animation = 'fadeIn 0.5s ease-out';
            }
        });
        currentStep = step;
    }

    // Boutons suivant/précédent
    document.querySelectorAll('.next-step').forEach(button => {
        button.addEventListener('click', function() {
            const nextStep = parseInt(this.dataset.next);
            if (validateStep(currentStep)) {
                showStep(nextStep);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });

    document.querySelectorAll('.prev-step').forEach(button => {
        button.addEventListener('click', function() {
            const prevStep = parseInt(this.dataset.prev);
            showStep(prevStep);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Validation des étapes
    function validateStep(step) {
        let isValid = true;
        
        if (step === 1) {
            const commandType = document.querySelector('input[name="command-type"]:checked');
            if (!commandType) {
                document.getElementById('command-type-error').textContent = 'Veuillez sélectionner un type de commande';
                document.getElementById('command-type-error').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('command-type-error').style.display = 'none';
                
                // Afficher les champs d'adresse appropriés
                const deliveryFields = document.getElementById('delivery-address-fields');
                const eventFields = document.getElementById('event-address-fields');
                
                if (commandType.value === 'event') {
                    deliveryFields.style.display = 'none';
                    eventFields.style.display = 'block';
                } else {
                    deliveryFields.style.display = 'block';
                    eventFields.style.display = 'none';
                }
            }
        }
        
        if (step === 2) {
            // Validation type de client
            const clientType = document.getElementById('client-type');
            if (!clientType.value) {
                document.getElementById('client-type-error').textContent = 'Veuillez sélectionner un type de client';
                document.getElementById('client-type-error').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('client-type-error').style.display = 'none';
                
                // Afficher les champs appropriés
                const particularFields = document.getElementById('particular-fields');
                const professionalFields = document.getElementById('professional-fields');
                
                if (clientType.value === 'particular') {
                    particularFields.style.display = 'block';
                    professionalFields.style.display = 'none';
                    
                    // Validation nom et prénom
                    const lastname = document.getElementById('lastname');
                    const firstname = document.getElementById('firstname');
                    
                    if (!lastname.value.trim()) {
                        document.getElementById('lastname-error').textContent = 'Veuillez entrer votre nom';
                        document.getElementById('lastname-error').style.display = 'block';
                        lastname.classList.add('error');
                        isValid = false;
                    } else {
                        document.getElementById('lastname-error').style.display = 'none';
                        lastname.classList.remove('error');
                    }
                    
                    if (!firstname.value.trim()) {
                        document.getElementById('firstname-error').textContent = 'Veuillez entrer votre prénom';
                        document.getElementById('firstname-error').style.display = 'block';
                        firstname.classList.add('error');
                        isValid = false;
                    } else {
                        document.getElementById('firstname-error').style.display = 'none';
                        firstname.classList.remove('error');
                    }
                } else {
                    particularFields.style.display = 'none';
                    professionalFields.style.display = 'block';
                    
                    // Validation nom entreprise
                    const company = document.getElementById('company');
                    if (!company.value.trim()) {
                        document.getElementById('company-error').textContent = 'Veuillez entrer le nom de votre entreprise';
                        document.getElementById('company-error').style.display = 'block';
                        company.classList.add('error');
                        isValid = false;
                    } else {
                        document.getElementById('company-error').style.display = 'none';
                        company.classList.remove('error');
                    }
                }
            }
            
            // Validation téléphone
            const phone = document.getElementById('phone');
            const phoneRegex = /^[0-9]{10}$/;
            if (!phone.value.trim()) {
                document.getElementById('phone-error').textContent = 'Veuillez entrer votre numéro de téléphone';
                document.getElementById('phone-error').style.display = 'block';
                phone.classList.add('error');
                isValid = false;
            } else if (!phoneRegex.test(phone.value.trim())) {
                document.getElementById('phone-error').textContent = 'Veuillez entrer un numéro de téléphone valide (10 chiffres)';
                document.getElementById('phone-error').style.display = 'block';
                phone.classList.add('error');
                isValid = false;
            } else {
                document.getElementById('phone-error').style.display = 'none';
                phone.classList.remove('error');
            }
            
            // Validation email
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                document.getElementById('email-error').textContent = 'Veuillez entrer votre adresse email';
                document.getElementById('email-error').style.display = 'block';
                email.classList.add('error');
                isValid = false;
            } else if (!emailRegex.test(email.value.trim())) {
                document.getElementById('email-error').textContent = 'Veuillez entrer une adresse email valide';
                document.getElementById('email-error').style.display = 'block';
                email.classList.add('error');
                isValid = false;
            } else {
                document.getElementById('email-error').style.display = 'none';
                email.classList.remove('error');
            }
            
            // Validation adresse
            const commandType = document.querySelector('input[name="command-type"]:checked');
            const addressFields = commandType.value === 'event' ? 'event-' : '';
            
            const streetType = document.getElementById(`${addressFields}street-type`);
            const streetNumber = document.getElementById(`${addressFields}street-number`);
            const streetName = document.getElementById(`${addressFields}street-name`);
            const postalCode = document.getElementById(`${addressFields}postal-code`);
            const city = document.getElementById(`${addressFields}city`);
            
            if (!streetType.value) {
                document.getElementById(`${addressFields}street-type-error`).textContent = 'Veuillez sélectionner la nature de la voie';
                document.getElementById(`${addressFields}street-type-error`).style.display = 'block';
                streetType.classList.add('error');
                isValid = false;
            } else {
                document.getElementById(`${addressFields}street-type-error`).style.display = 'none';
                streetType.classList.remove('error');
            }
            
            if (!streetNumber.value.trim()) {
                document.getElementById(`${addressFields}street-number-error`).textContent = 'Veuillez entrer le numéro de voie';
                document.getElementById(`${addressFields}street-number-error`).style.display = 'block';
                streetNumber.classList.add('error');
                isValid = false;
            } else {
                document.getElementById(`${addressFields}street-number-error`).style.display = 'none';
                streetNumber.classList.remove('error');
            }
            
            if (!streetName.value.trim()) {
                document.getElementById(`${addressFields}street-name-error`).textContent = 'Veuillez entrer le nom de la voie';
                document.getElementById(`${addressFields}street-name-error`).style.display = 'block';
                streetName.classList.add('error');
                isValid = false;
            } else {
                document.getElementById(`${addressFields}street-name-error`).style.display = 'none';
                streetName.classList.remove('error');
            }
            
            if (!postalCode.value.trim()) {
                document.getElementById(`${addressFields}postal-code-error`).textContent = 'Veuillez entrer le code postal';
                document.getElementById(`${addressFields}postal-code-error`).style.display = 'block';
                postalCode.classList.add('error');
                isValid = false;
            } else if (!/^[0-9]{5}$/.test(postalCode.value.trim())) {
                document.getElementById(`${addressFields}postal-code-error`).textContent = 'Veuillez entrer un code postal valide (5 chiffres)';
                document.getElementById(`${addressFields}postal-code-error`).style.display = 'block';
                postalCode.classList.add('error');
                isValid = false;
            } else {
                document.getElementById(`${addressFields}postal-code-error`).style.display = 'none';
                postalCode.classList.remove('error');
                
                // Si le code postal est valide, on peut essayer de remplir automatiquement la ville
                if (postalCode.value.trim().length === 5) {
                    fetchCityFromPostalCode(postalCode.value.trim(), city);
                }
            }
            
            if (!city.value.trim()) {
                document.getElementById(`${addressFields}city-error`).textContent = 'Veuillez entrer la ville';
                document.getElementById(`${addressFields}city-error`).style.display = 'block';
                city.classList.add('error');
                isValid = false;
            } else {
                document.getElementById(`${addressFields}city-error`).style.display = 'none';
                city.classList.remove('error');
            }
        }
        
        if (step === 3) {
            // Validation produits
            const products = document.querySelectorAll('input[name="products"]:checked');
            if (products.length === 0) {
                document.getElementById('products-error').textContent = 'Veuillez sélectionner au moins un type de produit';
                document.getElementById('products-error').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('products-error').style.display = 'none';
            }
            
            // Validation nombre de personnes
            const peopleCount = document.getElementById('people-count');
            if (!peopleCount.value || parseInt(peopleCount.value) < 1) {
                document.getElementById('people-count-error').textContent = 'Veuillez entrer un nombre valide de personnes (au moins 1)';
                document.getElementById('people-count-error').style.display = 'block';
                peopleCount.classList.add('error');
                isValid = false;
            } else {
                document.getElementById('people-count-error').style.display = 'none';
                peopleCount.classList.remove('error');
            }
            
            // Validation date
            const eventDate = document.getElementById('event-date');
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (!eventDate.value) {
                document.getElementById('event-date-error').textContent = 'Veuillez sélectionner une date';
                document.getElementById('event-date-error').style.display = 'block';
                eventDate.classList.add('error');
                isValid = false;
            } else {
                const selectedDate = new Date(eventDate.value);
                if (selectedDate < today) {
                    document.getElementById('event-date-error').textContent = 'Veuillez sélectionner une date future';
                    document.getElementById('event-date-error').style.display = 'block';
                    eventDate.classList.add('error');
                    isValid = false;
                } else {
                    document.getElementById('event-date-error').style.display = 'none';
                    eventDate.classList.remove('error');
                }
            }
        }
        
        return isValid;
    }

    // Récupération automatique de la ville depuis le code postal
    function fetchCityFromPostalCode(postalCode, cityField) {
        // Utilisation de l'API gouvernementale française pour les codes postaux
        fetch(`https://apicarto.ign.fr/api/codes-postaux/communes/${postalCode}`)
            .then(response => {
                if (!response.ok) throw new Error('Code postal non trouvé');
                return response.json();
            })
            .then(data => {
                if (data && data.length > 0) {
                    cityField.value = data[0].nomCommune;
                    cityField.dispatchEvent(new Event('input'));
                }
            })
            .catch(error => {
                console.error('Erreur lors de la récupération de la ville:', error);
            });
    }

    // Gestion du changement de type de client
    document.getElementById('client-type').addEventListener('change', function() {
        const particularFields = document.getElementById('particular-fields');
        const professionalFields = document.getElementById('professional-fields');
        
        if (this.value === 'particular') {
            particularFields.style.display = 'block';
            professionalFields.style.display = 'none';
        } else if (this.value === 'professional') {
            particularFields.style.display = 'none';
            professionalFields.style.display = 'block';
        } else {
            particularFields.style.display = 'none';
            professionalFields.style.display = 'none';
        }
    });

    // Gestion du changement de code postal pour la ville
    document.getElementById('postal-code').addEventListener('input', function() {
        if (this.value.length === 5) {
            fetchCityFromPostalCode(this.value, document.getElementById('city'));
        }
    });

    document.getElementById('event-postal-code').addEventListener('input', function() {
        if (this.value.length === 5) {
            fetchCityFromPostalCode(this.value, document.getElementById('event-city'));
        }
    });

    // Soumission du formulaire
    document.getElementById('bywizaForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateStep(currentStep)) {
            // Préparation des données
            const formData = {
                commandType: document.querySelector('input[name="command-type"]:checked').value,
                clientType: document.getElementById('client-type').value,
                clientInfo: {},
                address: {},
                orderDetails: {},
                comments: document.getElementById('comments').value
            };
            
            // Récupération des infos client
            if (formData.clientType === 'particular') {
                formData.clientInfo = {
                    lastname: document.getElementById('lastname').value,
                    firstname: document.getElementById('firstname').value
                };
            } else {
                formData.clientInfo = {
                    company: document.getElementById('company').value
                };
            }
            
            formData.clientInfo.phone = document.getElementById('phone').value;
            formData.clientInfo.email = document.getElementById('email').value;
            
            // Récupération de l'adresse
            const commandType = document.querySelector('input[name="command-type"]:checked').value;
            const addressFields = commandType === 'event' ? 'event-' : '';
            
            formData.address = {
                streetType: document.getElementById(`${addressFields}street-type`).value,
                streetNumber: document.getElementById(`${addressFields}street-number`).value,
                streetName: document.getElementById(`${addressFields}street-name`).value,
                postalCode: document.getElementById(`${addressFields}postal-code`).value,
                city: document.getElementById(`${addressFields}city`).value
            };
            
            // Récupération des détails de commande
            const products = Array.from(document.querySelectorAll('input[name="products"]:checked')).map(el => el.value);
            formData.orderDetails = {
                products: products,
                peopleCount: document.getElementById('people-count').value,
                eventDate: document.getElementById('event-date').value
            };
            
            // Affichage des données dans la modal de confirmation
            displayConfirmationDetails(formData);
            
            // Envoi des données par email (simulation)
            sendFormData(formData);
            
            // Affichage de la modal de confirmation
            document.getElementById('confirmationModal').style.display = 'flex';
        }
    });

    // Fonction pour afficher les détails dans la modal de confirmation
    function displayConfirmationDetails(formData) {
        const confirmationDetails = document.getElementById('confirmationDetails');
        let html = '';
        
        // Type de commande
        let commandTypeText = '';
        switch(formData.commandType) {
            case 'big': commandTypeText = 'Fête/Événement'; break;
            case 'small': commandTypeText = 'Petite commande'; break;
            case 'event': commandTypeText = 'Organisation d\'événement'; break;
        }
        html += `<p><strong>Type de commande:</strong> ${commandTypeText}</p>`;
        
        // Informations client
        html += `<h4>Informations client</h4>`;
        if (formData.clientType === 'particular') {
            html += `<p><strong>Nom:</strong> ${formData.clientInfo.lastname} ${formData.clientInfo.firstname}</p>`;
        } else {
            html += `<p><strong>Entreprise:</strong> ${formData.clientInfo.company}</p>`;
        }
        html += `<p><strong>Téléphone:</strong> ${formData.clientInfo.phone}</p>`;
        html += `<p><strong>Email:</strong> ${formData.clientInfo.email}</p>`;
        
        // Adresse
        html += `<h4>Adresse</h4>`;
        html += `<p>${formData.address.streetType} ${formData.address.streetNumber} ${formData.address.streetName}</p>`;
        html += `<p>${formData.address.postalCode} ${formData.address.city}</p>`;
        
        // Détails commande
        html += `<h4>Détails de la commande</h4>`;
        
        let productsText = '';
        if (formData.orderDetails.products.includes('all')) {
            productsText = 'Gâteaux, petites salées et plats traditionnels';
        } else {
            productsText = formData.orderDetails.products.map(p => {
                switch(p) {
                    case 'cakes': return 'Gâteaux';
                    case 'savory': return 'Petites salées';
                    case 'traditional': return 'Plats traditionnels';
                    default: return p;
                }
            }).join(', ');
        }
        html += `<p><strong>Produits:</strong> ${productsText}</p>`;
        html += `<p><strong>Nombre de personnes:</strong> ${formData.orderDetails.peopleCount}</p>`;
        
        const eventDate = new Date(formData.orderDetails.eventDate);
        html += `<p><strong>Date de l'événement:</strong> ${eventDate.toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>`;
        
        if (formData.comments) {
            html += `<p><strong>Commentaires:</strong> ${formData.comments}</p>`;
        }
        
        confirmationDetails.innerHTML = html;
    }

    // Fonction pour envoyer les données (simulation)
    function sendFormData(formData) {
        // Dans une vraie implémentation, vous utiliseriez un service comme Formspree, EmailJS ou un backend
        console.log('Données du formulaire à envoyer:', formData);
        
        // Simulation d'envoi réussi
        setTimeout(() => {
            console.log('Données envoyées à socialmedia.bywiza@gmail.com');
        }, 1000);
    }

    // Fermeture de la modal
    document.getElementById('modalCloseBtn').addEventListener('click', function() {
        document.getElementById('confirmationModal').style.display = 'none';
        // Réinitialisation du formulaire
        document.getElementById('bywizaForm').reset();
        // Retour à la première étape
        showStep(1);
        // Réinitialisation des champs masqués
        document.getElementById('particular-fields').style.display = 'none';
        document.getElementById('professional-fields').style.display = 'none';
        document.getElementById('event-address-fields').style.display = 'none';
        document.getElementById('delivery-address-fields').style.display = 'block';
    });

    // Animation du logo au survol
    const logo = document.querySelector('.header-logo');
    logo.addEventListener('mouseover', () => {
        logo.style.transform = 'rotate(5deg) scale(1.05)';
    });
    logo.addEventListener('mouseout', () => {
        logo.style.transform = 'rotate(0) scale(1)';
    });

    // Initialisation
    showStep(1);
});