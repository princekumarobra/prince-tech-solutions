document.addEventListener('DOMContentLoaded', () => {
  
  const mobileMenuBtn = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.nav-menu');
  const dropdownNavs = document.querySelectorAll('.dropdown-nav');
  
  // 1. Hamburger Toggler Logic
  if (mobileMenuBtn && navMenu) {
    
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
      
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
              
              dropdownNavs.forEach(dd => {
                  if (dd !== dropdownNav) {
                      dd.classList.remove('active');
                  }
              });
              
              dropdownNav.classList.toggle('active');
          }
      });

      // 4. Close mobile menu when a sub-link is clicked
      dropdownNav.querySelectorAll('.dropdown-menu a').forEach(subLink => {
          subLink.addEventListener('click', () => {
             if (window.innerWidth <= 768) {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                dropdownNavs.forEach(dd => dd.classList.remove('active'));
             }
          });
      });
  });

  // --- HOSTING PAGE DEMO SEARCH LOGIC ---
    const domainInput = document.getElementById('domain-input');
    const resultElement = document.getElementById('search-result');
    const checkBtn = document.getElementById('check-domain-btn');
    
    if (checkBtn && domainInput && resultElement) {
        checkBtn.addEventListener('click', function(e) {
            e.preventDefault(); 
            const input = domainInput.value.trim().toLowerCase();
            
            if (input === '') {
                resultElement.textContent = 'Please enter a domain name for demo search.';
                resultElement.style.color = 'orange';
                return;
            }
            
            // --- Demo Logic ---
            let isAvailable = false;
            if (input.includes('.com') || input.includes('.in') || input.includes('.net')) {
                if (input.includes('fastupdate') || input.includes('google') || input.includes('princetech')) {
                     isAvailable = false;
                } else if (input.includes('clinic') || input.includes('school') || input.includes('yoga')) {
                    isAvailable = true;
                } else {
                    isAvailable = Math.random() < 0.7; // 70% chance of being available
                }
            } else {
                resultElement.textContent = `Please enter a valid extension (.com, .in, etc.).`;
                resultElement.style.color = 'yellow';
                return;
            }

            if (isAvailable) {
                resultElement.textContent = `🎉 ${input} is available! (Demo) - Click 'Order Now' on the plans below to check real price.`;
                resultElement.style.color = '#4caf50';
            } else {
                resultElement.textContent = `😔 Sorry, ${input} is taken! (Demo) - Check in real store for alternatives.`;
                resultElement.style.color = '#ff6b6b';
            }
        });
    }
});
