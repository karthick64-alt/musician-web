// Subscription Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    const billingToggle = document.getElementById('billingToggle');
    const premiumPrice = document.getElementById('premiumPrice');
    const premiumSavings = document.getElementById('premiumSavings');
    const premiumBtn = document.getElementById('premiumBtn');
    const paymentSection = document.getElementById('paymentSection');
    const paymentMethodCards = document.querySelectorAll('.payment-method-card');
    const cardPaymentForm = document.getElementById('cardPaymentForm');

    // Billing toggle (Monthly/Yearly)
    if (billingToggle) {
        billingToggle.addEventListener('change', function() {
            const isYearly = this.checked;
            if (premiumPrice) {
                premiumPrice.textContent = isYearly ? '$7.99' : '$9.99';
            }
            if (premiumSavings) {
                premiumSavings.style.display = isYearly ? 'block' : 'none';
            }
        });
    }

    // Premium button click
    if (premiumBtn) {
        premiumBtn.addEventListener('click', function() {
            if (paymentSection) {
                paymentSection.style.display = 'block';
                paymentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // Payment method selection
    paymentMethodCards.forEach(card => {
        card.addEventListener('click', function() {
            paymentMethodCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            const method = this.dataset.method;
            if (cardPaymentForm) {
                cardPaymentForm.style.display = method === 'card' ? 'block' : 'none';
            }
        });
    });

    // Card number formatting
    const cardNumberInput = document.querySelector('input[placeholder="1234 5678 9012 3456"]');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }

    // Expiry date formatting
    const expiryInput = document.querySelector('input[placeholder="MM/YY"]');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }

    // CVV formatting (numbers only)
    const cvvInput = document.querySelector('input[placeholder="123"]');
    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }

    // Subscribe button
    const subscribeBtn = document.querySelector('.btn-subscribe');
    if (subscribeBtn) {
        subscribeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Subscription functionality would be implemented here. This would process the payment and activate the premium account.');
        });
    }
});

