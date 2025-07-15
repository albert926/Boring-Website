window.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById("instant-page-button-element");
    if (button) {
      button.addEventListener("click", () => {
        const audio = new Audio('blue-screen.mp3');
        audio.play();
      });
    }
  });
  