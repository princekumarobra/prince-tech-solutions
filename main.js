// main.js  – mobile menu + dropdown + hosting search

document.addEventListener('DOMContentLoaded', function () {

  /* ================= MOBILE MENU ================= */
  const mobileMenuBtn = document.getElementById('mobile-menu');   // <div id="mobile-menu" class="menu-toggle">
  const navMenu       = document.querySelector('.nav-menu');      // <ul class="nav-menu">
  const dropdownNavs  = document.querySelectorAll('.dropdown-nav');

  if (mobileMenuBtn && navMenu) {

    // 1. Hamburger open/close
    mobileMenuBtn.addEventListener('click', function () {
      // Button lines animate (CSS: .menu-toggle.is-active ...)
      mobileMenuBtn.classList.toggle('is-active');

      // Menu open/close (CSS: .nav-menu.open ...)
      navMenu.classList.toggle('open');

      // Saare dropdown band
      dropdownNavs.forEach(function (dd) {
        dd.classList.remove('active');
      });
    });

    // 2. Kisi bhi main link par tap -> menu band (sirf mobile width)
    document
      .querySelectorAll('.nav-menu > li > a')
      .forEach(function (link) {
        link.addEventListener('click', function () {
          if (window.innerWidth <= 768) {
            mobileMenuBtn.classList.remove('is-active');
            navMenu.classList.remove('open');
            dropdownNavs.forEach(function (dd) {
              dd.classList.remove('active');
            });
          }
        });
      });
  }

  // 3. Dropdown toggle (Services / Policies)
  dropdownNavs.forEach(function (dropdownNav) {
    const dropdownLink = dropdownNav.querySelector('.nav-link');

    if (!dropdownLink) return;

    dropdownLink.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();

        // Baaki sab dropdown band
        dropdownNavs.forEach(function (dd) {
          if (dd !== dropdownNav) dd.classList.remove('active');
        });

        dropdownNav.classList.toggle('active');
      }
    });
  });

  /* ============== HOSTING PAGE DEMO SEARCH ============== */

  const domainInput   = document.getElementById('domain-input');
  const resultElement = document.getElementById('search-result');
  const checkBtn      = document.getElementById('check-domain-btn');

  if (checkBtn && domainInput && resultElement) {
    checkBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const input = domainInput.value.trim().toLowerCase();

      if (input === '') {
        resultElement.textContent = 'Please enter a domain name for demo search.';
        resultElement.style.color = 'orange';
        return;
      }

      let isAvailable = false;

      if (input.includes('.com') || input.includes('.in') || input.includes('.net')) {

        if (input.includes('fastupdate') ||
            input.includes('google') ||
            input.includes('princetech')) {

          isAvailable = false;

        } else if (input.includes('clinic') ||
                   input.includes('school') ||
                   input.includes('yoga')) {

          isAvailable = true;

        } else {
          isAvailable = Math.random() < 0.7;  // demo 70% chance
        }

      } else {
        resultElement.textContent =
          'Please enter a valid extension (.com, .in, etc.).';
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
