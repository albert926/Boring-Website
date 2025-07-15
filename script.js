document.addEventListener("DOMContentLoaded", function() {
  const button = document.getElementById("runaway-btn");

  function glideAway() {
      const x = Math.random() * (window.innerWidth - button.clientWidth);
      const y = Math.random() * (window.innerHeight - button.clientHeight);

      anime({
          targets: button,
          left: `${x}px`,
          top: `${y}px`,
          easing: "easeOutQuad",
          duration: 500 // Adjust speed here
      });
  }

  button.addEventListener("mouseover", glideAway);

  button.addEventListener("click", function() {
      window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  });
});
