// consoleLogger.js
document.addEventListener('DOMContentLoaded', function() {
    // Слушаем кастомное событие formValid
    document.addEventListener('formValid', function(event) {
        const formData = event.detail;
        
        // Очищаем консоль (опционально)
        console.clear();
        
        // Красивое оформление вывода
        console.log('%cДанные отправленной формы:', 'font-size: 16px; font-weight: bold; color: #000000;');
        console.log('───────────────────');
        console.log('%cФИО:', 'font-weight: bold;', formData.fullname);
        console.log('%cТелефон:', 'font-weight: bold;', formData.phone);
        console.log('%cEmail:', 'font-weight: bold;', formData.email);
        console.log('%cСообщение:', 'font-weight: bold;', formData.message);
        console.log('%cСогласие:', 'font-weight: bold;', formData.agreement ? 'Да' : 'Нет');
        console.log('───────────────────');
        
        // Временная метка
        const timestamp = new Date().toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        console.log('%cВремя отправки:', 'font-weight: bold;', timestamp);
        
        // Вывод в виде таблицы для наглядности
        console.log('%cТаблица данных:', 'font-size: 14px; font-weight: bold; color: #485fc7;');
        console.table(formData);
    });
});