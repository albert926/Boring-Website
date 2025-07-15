document.addEventListener('DOMContentLoaded', () => {
  turnstile.render('.cf-turnstile', {
    sitekey: '0x4AAAAAABlI9CNxe5EyiFEo',
    callback: () => {
      document.getElementById('loginBtn').disabled = false;
    }
  });
});
