document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const formMessage = document.getElementById('formMessage');

    const validateName = () => {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required.';
            return false;
        } else {
            nameError.textContent = '';
            return true;
        }
    };

    const validateEmail = () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address.';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    };

    const validatePassword = () => {
        if (passwordInput.value.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters long.';
            return false;
        } else {
            passwordError.textContent = '';
            return true;
        }
    };

    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('blur', validatePassword);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (!isNameValid || !isEmailValid || !isPasswordValid) {
            formMessage.textContent = 'Please correct the errors in the form.';
            formMessage.style.color = '#dc3545';
            return;
        }

        // If validation passes, submit the form data to PHP using Fetch API
        const formData = new FormData(form);

        try {
            const response = await fetch('register.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                formMessage.textContent = result.message;
                formMessage.style.color = '#28a745';
                form.reset(); // Clear the form on successful submission
            } else {
                formMessage.textContent = result.message;
                formMessage.style.color = '#dc3545';
            }
        } catch (error) {
            formMessage.textContent = 'An error occurred. Please try again later.';
            formMessage.style.color = '#dc3545';
            console.error('Error:', error);
        }
    });
});