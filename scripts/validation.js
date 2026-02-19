// validation.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Сбрасываем предыдущие ошибки
        document.querySelectorAll('.input.is-danger, .textarea.is-danger').forEach(el => {
            el.classList.remove('is-danger');
        });
        document.querySelectorAll('.help.is-danger').forEach(el => el.remove());
        
        let isValid = true;
        
        // 1. Проверка ФИО
        const fullname = document.getElementById('fullname');
        const fullnameValue = fullname.value.trim();
        
        if (fullnameValue === '') {
            showError(fullname, 'Введите фамилию и имя');
            isValid = false;
        } else if (fullnameValue.split(' ').filter(word => word.length > 0).length < 2) {
            showError(fullname, 'Введите фамилию и имя (минимум 2 слова)');
            isValid = false;
        }
        
        // 2. Проверка телефона
        const phone = document.getElementById('phone');
        const phoneValue = phone.value.trim();
        const phoneDigits = phoneValue.replace(/\D/g, '');
        
        if (phoneValue === '') {
            showError(phone, 'Введите номер телефона');
            isValid = false;
        } else if (phoneDigits.length < 10) {
            showError(phone, 'Введите 10 цифр номера');
            isValid = false;
        }
        
        // 3. Проверка email
        const email = document.getElementById('email');
        const emailValue = email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailValue === '') {
            showError(email, 'Введите email');
            isValid = false;
        } else if (!emailPattern.test(emailValue)) {
            showError(email, 'Введите корректный email (например: name@domain.com)');
            isValid = false;
        }
        
        // 4. Проверка сообщения (необязательное, но можно проверить длину)
        const message = document.getElementById('message');
        const messageValue = message.value.trim();
        
        if (messageValue.length > 500) {
            showError(message, 'Сообщение не должно превышать 500 символов');
            isValid = false;
        }
        
        // 5. Проверка согласия
        const agreement = document.getElementById('agreement');
        
        if (!agreement.checked) {
            const agreementDiv = agreement.closest('.field');
            const help = document.createElement('p');
            help.classList.add('help', 'is-danger');
            help.textContent = 'Необходимо согласие на обработку данных';
            agreementDiv.appendChild(help);
            isValid = false;
        }
        
        // Если всё корректно - отправляем данные
        if (isValid) {
            const formData = {
                fullname: fullnameValue,
                phone: phoneValue,
                email: emailValue,
                message: messageValue || '(не заполнено)',
                agreement: agreement.checked
            };
            
            const event = new CustomEvent('formValid', { detail: formData });
            document.dispatchEvent(event);
            
            // Можно добавить уведомление
            const successMessage = document.createElement('div');
            successMessage.classList.add('notification', 'is-success', 'mt-4');
            successMessage.textContent = 'Форма успешно отправлена! Проверьте консоль.';
            form.appendChild(successMessage);
            
            // Удаляем уведомление через 3 секунды
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        }
    });
    
    // Функция показа ошибки
    function showError(input, message) {
        input.classList.add('is-danger');
        const help = document.createElement('p');
        help.classList.add('help', 'is-danger');
        help.textContent = message;
        input.parentNode.parentNode.appendChild(help);
    }
    
    // Сброс ошибки при вводе
    document.querySelectorAll('.input, .textarea').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('is-danger');
            const parent = this.parentNode.parentNode;
            const errors = parent.querySelectorAll('.help.is-danger');
            errors.forEach(el => el.remove());
        });
    });
    
    // Сброс ошибки для checkbox
    const agreement = document.getElementById('agreement');
    if (agreement) {
        agreement.addEventListener('change', function() {
            const parent = this.closest('.field');
            const errors = parent.querySelectorAll('.help.is-danger');
            errors.forEach(el => el.remove());
        });
    }
});
