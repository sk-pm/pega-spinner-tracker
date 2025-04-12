(function () {
    console.log("🔍 Pega Load Tracker initialized");
  
    function waitForSpinnerAndObserve() {
      const spinner = document.querySelector('.busyIndicator');
      if (!spinner) {
        setTimeout(waitForSpinnerAndObserve, 1000);
        return;
      }
  
      let loadStart = null;
  
      const observer = new MutationObserver(() => {
        const isVisible = window.getComputedStyle(spinner).display !== 'none';
  
        if (isVisible && !loadStart) {
          loadStart = performance.now();
        } else if (!isVisible && loadStart) {
          const duration = performance.now() - loadStart;
          const data = {
            duration: Math.round(duration),
            url: window.location.href,
            timestamp: new Date().toISOString()
          };
          console.log("📊 Spinner Duration:", data);
  
          // Optional: send to backend
          // sendToBackend(data);
  
          loadStart = null;
        }
      });
  
      observer.observe(spinner, {
        attributes: true,
        attributeFilter: ['style', 'class']
      });
    }
  
    waitForSpinnerAndObserve();
  
    // Uncomment this function if you have a backend ready
    /*
    function sendToBackend(data) {
      fetch('https://your-api-endpoint.com/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    }
    */
  })();
  