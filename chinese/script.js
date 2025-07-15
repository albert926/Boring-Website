document.addEventListener("DOMContentLoaded", function() {
  const button = document.getElementById("runaway-btn");

  // Function to smoothly move the button to a random location
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

  // Make the button "glide away" when hovered
  button.addEventListener("mouseover", glideAway);

  // Rickroll if they actually manage to click the button
  button.addEventListener("click", function() {
      window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  });
});
