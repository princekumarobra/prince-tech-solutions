document.addEventListener('DOMContentLoaded', () => {

  const mobileMenuBtn = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.nav-menu');
  const dropdownNavs = document.querySelectorAll('.dropdown-nav');

  /* =========== 1. HAMBURGER TOGGLER =========== */
  if (mobileMenuBtn && navMenu) {

    // Open / Close mobile menu
    mobileMenuBtn.addEventListener('click', () => {
      // Button animation (CSS: .menu-toggle.is-active ...)
      mobileMenuBtn.classList.toggle('is-active');

      // Menu open/close (CSS: .nav-menu.open ...)
      navMenu.classList.toggle('open');

      // Saare dropdown band kar do
      dropdownNavs.forEach(dd => dd.classList.remove('active'));
    });

    // Kisi bhi main link par click -> menu band (mobile me)
    document
      .querySelectorAll('.nav-menu > li > a:not(.dropdown-nav > a)')
      .forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
            mobileMenuBtn.classList.remove('is-active');
            navMenu.classList.remove('open');
          }
        });
      });
  }

  /* =========== 2. DROPDOWN TOGGLER (MOBILE) =========== */
  dropdownNavs.forEach(dropdownNav => {
    const dropdownLink = dropdownNav.querySelector('.nav-link');

    // Dropdown title par click
    dropdownLink.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();

        // Dusre sab dropdown band
        dropdownNavs.forEach(dd => {
          if (dd !== dropdownNav) dd.classList.remove('active');
        });

        // Current dropdown toggle
        dropdownNav.classList.toggle('active');
      }
    });

    // Dropdown ke andar kisi link par click -> pura menu band
    dropdownNav.querySelectorAll('.dropdown-menu a').forEach(subLink => {
      subLink.addEventListener('click', () => {
        if (window.innerWidth <= 768 && mobileMenuBtn && navMenu) {
          mobileMenuBtn.classList.remove('is-active');
          navMenu.classList.remove('open');
          dropdownNavs.forEach(dd => dd.classList.remove('active'));
        }
      });
    });
  });

  /* =========== 3. HOSTING PAGE DEMO SEARCH LOGIC =========== */
  const domainInput = document.getElementById('domain-input');
  const resultElement = document.getElementById('search-result');
  const checkBtn = document.getElementById('check-domain-btn');

  if (checkBtn && domainInput && resultElement) {
    checkBtn.addEventListener('click', function (e) {
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
          // 70% chance available
          isAvailable = Math.random() < 0.7;
        }

      } else {
        resultElement.textContent = 'Please enter a valid extension (.com, .in, etc.).';
        resultElement.style.color = 'yellow';
        return;
      }

      if (isAvailable) {
        resultElement.textContent =
          `🎉 ${input} is available! (Demo) - Click 'Order Now' on the plans below to check real price.`;
        resultElement.style.color = '#4caf50';
      } else {
        resultElement.textContent =
          `😔 Sorry, ${input} is taken! (Demo) - Check in real store for alternatives.`;
        resultElement.style.color = '#ff6b6b';
      }
    });
  }

});
