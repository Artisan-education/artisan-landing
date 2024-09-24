document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector("#contact-form");
    

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.querySelector("#name").value;
        const email = document.querySelector("#email").value;
        const phone = document.querySelector("#phone").value;

        const telegram_message = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}`;

        fetch(`https://api.telegram.org/bot7465395914:AAFAnHt0dFwdzuzQWv3fIEmKAlj8aBD-LR0/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: '-4530943091',
                text: telegram_message
            })
        })
            .then(response => {
                console.log('Response status:', response.status);
                return response.json(); // Преобразуйте ответ в JSON
            })
            .then(data => {
                console.log('Response data:', data); // Выведите данные ответа
                if (data.ok) {
                    document.querySelector('.w-form-done').style.display = 'block';
                    document.querySelector('.w-form-fail').style.display = 'none';
                    form.reset();
                } else {
                    const errorMessage = data.description || 'Unknown error';
                    document.querySelector('.w-form-fail').textContent = `Error: ${errorMessage}`;
                    document.querySelector('.w-form-fail').style.display = 'block';
                    document.querySelector('.w-form-done').style.display = 'none';
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                document.querySelector('.w-form-fail').textContent = `Error: ${error.message}`;
                document.querySelector('.w-form-fail').style.display = 'block';
                document.querySelector('.w-form-done').style.display = 'none';
            });

        // Optional: Add delay before hiding the error message
        setTimeout(() => {
            document.querySelector('.w-form-fail').style.display = 'none';
        }, 5000); // 5 seconds delay
    });
});
