document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.contact-form');  
  const formResponse = document.createElement('div');
  contactForm.appendChild(formResponse); 

  const submitBtn = document.querySelector('.submit-btn');  

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    3
    const name = document.querySelector('.form-input[type="text"]').value.trim(); 
    const email = document.querySelector('.form-input[type="email"]').value.trim();  
    const message = document.querySelector('.form-textarea').value.trim();  
    
    if (!name || !email || !message) {
      showResponse('Please fill in all fields.', 'error');
      return;
    }

    const botToken = '7662975939:AAFW5Ocb7oYuas0-FBnUTAADPp_176zAJNI';
    const chatId = '5186694775';
    
    const telegramMessage = `📩 <b>New Contact Form Submission</b>\n\n` +
                           `👤 <b>Name:</b> ${name}\n` +
                           `📧 <b>Email:</b> ${email}\n` +
                           `💬 <b>Message:</b>\n${message}`;

    toggleSubmitButton(true);

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: 'HTML'
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.ok) {
        showResponse('Message sent successfully! We\'ll get back to you soon.', 'success');
        contactForm.reset(); 
      } else {
        throw new Error(data.description || 'Failed to send message');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      showResponse(`Error: ${error.message}`, 'error');
    })
    .finally(() => {
      toggleSubmitButton(false);
    });
  });

  function toggleSubmitButton(isLoading) {
    if (isLoading) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    } else {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }
  }

  function showResponse(message, type) {
    formResponse.classList.add(type);
    formResponse.innerHTML = message;
    formResponse.style.display = 'block';

    setTimeout(() => {
      formResponse.style.display = 'none';
    }, 5000);
  }
});

//theme change
function setTheme(theme) {
  const themes = ['blue', 'green', 'dark'];

  themes.forEach(t => {
    document.getElementById(`${t}-theme`).disabled = true;
  });

  if (theme === 'default') {
    // Just keep all themes disabled
    return;
  }

  document.getElementById(`${theme}-theme`).disabled = false;
}