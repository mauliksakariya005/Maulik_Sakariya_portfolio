
  document.addEventListener('DOMContentLoaded', function() {
    const profileImg = document.querySelector('.profile-img');
    
    profileImg.addEventListener('click', function() {
      // Create overlay div
      const overlay = document.createElement('div');
      overlay.className = 'image-overlay';
      
      // Create enlarged image
      const enlargedImg = document.createElement('img');
      enlargedImg.className = 'enlarged-img';
      enlargedImg.src = this.src;
      enlargedImg.alt = this.alt;
      
      // Add to overlay and then to body
      overlay.appendChild(enlargedImg);
      document.body.appendChild(overlay);
      
      // Click to close
      overlay.addEventListener('click', function() {
        document.body.removeChild(overlay);
      });
    });
  });
