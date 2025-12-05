document.addEventListener('DOMContentLoaded', () => {
  
  const mobileMenuBtn = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.nav-menu');
  const dropdownNavs = document.querySelectorAll('.dropdown-nav'); // Select all dropdowns
  
  // 1. Hamburger Toggler Logic
  if (mobileMenuBtn && navMenu) {
    
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Jab menu open ho, saare dropdowns band kar do
      dropdownNavs.forEach(dd => dd.classList.remove('active'));
    });
    
    // 2. Close menu when clicking any main link
    document.querySelectorAll('.nav-menu > li > a:not(.dropdown-nav > a)').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          mobileMenuBtn.classList.remove('active');
          navMenu.classList.remove('active');
        }
      });
    });
  }
  
  // 3. Mobile Dropdown Toggler Logic (For multiple dropdowns)
  dropdownNavs.forEach(dropdownNav => {
    const dropdownLink = dropdownNav.querySelector('.nav-link');
    
    dropdownLink.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        
        // Agar koi aur dropdown active ho, toh use pehle band karo
        dropdownNavs.forEach(dd => {
          if (dd !== dropdownNav) {
            dd.classList.remove('active');
          }
        });
        
        // Current dropdown ko toggle karo
        dropdownNav.classList.toggle('active');
      }
    });
    
    // 4. Close mobile menu when a sub-link is clicked
    dropdownNav.querySelectorAll('.dropdown-menu a').forEach(subLink => {
      subLink.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          mobileMenuBtn.classList.remove('active');
          navMenu.classList.remove('active');
          dropdownNavs.forEach(dd => dd.classList.remove('active')); // Sab band karo
        }
      });
    });
  });
});
