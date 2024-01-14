 const countdownTitle = document.querySelector('#countdown-title');
  const countdownDays = document.querySelector('.countdown-days .countdown-value');
  const countdownHours = document.querySelector('.countdown-hours .countdown-value');
  const countdownMinutes = document.querySelector('.countdown-minutes .countdown-value');
  const countdownSeconds = document.querySelector('.countdown-seconds .countdown-value');
  let countdownInterval;
  
  function startCountdown(event) {
    event.preventDefault();
  
    const countdownDate = new Date(event.target.elements['countdown-date'].value);
    const countdownTitleValue = event.target.elements['countdown-title'].value.trim();
    const customMessage = event.target.elements['custom-message'].value.trim();
    const currentTime = new Date();
    const countdownTime = countdownDate.getTime() - currentTime.getTime();
  
    if (countdownTime <= 0) {
      alert('Please enter a future date');
      return;
    }
  
    clearInterval(countdownInterval);
  
    countdownInterval = setInterval(() => {
      const currentTime = new Date();
      const remainingTime = countdownDate.getTime() - currentTime.getTime();
  
      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        updateCountdown(0, 0, 0, 0);
  
        // Display custom message or default message
        countdownTitle.textContent = customMessage || 'Time is up!';
  
        // Set the title based on whether custom message was provided
        updateCountdownTitle(customMessage ? 'Time is up!' : countdownTitleValue);
  
        // Store custom message in localStorage if provided
        if (customMessage) {
          localStorage.setItem('customMessage', customMessage);
        } else {
          localStorage.removeItem('customMessage');  // Remove custom message from localStorage
        }
        
        localStorage.removeItem('countdownDate');
        localStorage.removeItem('countdownTitle');
      } else {
        const remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const remainingHours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
  
        updateCountdown(remainingDays, remainingHours, remainingMinutes, remainingSeconds);
      }
    }, 1000);
  
    updateCountdownTitle(countdownTitleValue);
    localStorage.setItem('countdownDate', countdownDate);
    localStorage.setItem('countdownTitle', countdownTitleValue);
  }    
  
  function updateCountdown(days, hours, minutes, seconds) {
    countdownDays.textContent = days;
    countdownHours.textContent = hours.toString().padStart(2, '0');
    countdownMinutes.textContent = minutes.toString().padStart(2, '0');
    countdownSeconds.textContent = seconds.toString().padStart(2, '0');
  }
  
  function updateCountdownTitle(title) {
    const countdownTitle = document.querySelector('.countdown-title');
    countdownTitle.textContent = title;
  }
  
  function loadCountdown() {
    const countdownDate = new Date(localStorage.getItem('countdownDate'));
    const countdownTitleValue = localStorage.getItem('countdownTitle');
  
    if (countdownDate && countdownTitleValue) {
      const currentTime = new Date();
      const countdownTime = countdownDate.getTime() - currentTime.getTime();
  
      if (countdownTime > 0) {
        const remainingDays = Math.floor(countdownTime / (1000 * 60 * 60 * 24));
        const remainingHours = Math.floor((countdownTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((countdownTime % (1000 * 60 * 60)) / (1000 * 60));
        const remainingSeconds = Math.floor((countdownTime % (1000 * 60)) / 1000);
  
        updateCountdown(remainingDays, remainingHours, remainingMinutes, remainingSeconds);
        updateCountdownTitle(countdownTitleValue);
        countdownInterval = setInterval(() => {
          const currentTime = new Date();
          const remainingTime = countdownDate.getTime() - currentTime.getTime();
  
          if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            updateCountdown(0, 0, 0, 0);
            countdownTitle.textContent = '';
            localStorage.removeItem('countdownDate');
            localStorage.removeItem('countdownTitle');
          } else {
            const remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
            const remainingHours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
  
            updateCountdown(remainingDays, remainingHours, remainingMinutes, remainingSeconds);
            updateCountdownTitle(countdownTitleValue);
          }
        }, 1000);
      } else {
        countdownTitle.textContent = localStorage.getItem('customMessage') || '';
        localStorage.removeItem('countdownDate');
        localStorage.removeItem('countdownTitle');
        localStorage.removeItem('customMessage');
      }
    }
  }
  
  // Event listener to trigger the countdown on form submission
  document.querySelector('.countdown-form').addEventListener('submit', startCountdown);
  
  loadCountdown();
