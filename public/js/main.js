document.addEventListener("DOMContentLoaded", () => {
    loadNavbar();
    loadFooter();

    // 2. Initialize Contact Form
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector("button");
            const originalContent = btn.innerHTML;
            
            btn.innerHTML = `<i class="ph ph-circle-notch animate-spin text-xl"></i> Sending...`;
            btn.disabled = true;

            const formData = new FormData(contactForm);

            formData.append("form-name", "contact");
            
            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString(),
            })
            .then((response) => {
                if (response.ok) {
                    contactForm.classList.add('hidden');
                    successMessage.classList.remove('hidden');
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch((error) => {
                btn.innerHTML = originalContent;
                btn.disabled = false;
                console.error('Submission error:', error);
                alert("Sorry, we couldn't send your message. Please try again.");
            });
        });
    }
});

// ==========================================
// NAVBAR & NAVIGATION LOGIC
// ==========================================

function loadNavbar() {
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
      const placeholder = document.getElementById("navbar-placeholder");
      if (!placeholder) return;
      placeholder.innerHTML = data;

      initializeMobileMenu();
      highlightCurrentPage();
    })
    .catch((err) => console.error("Error loading navbar:", err));
}

function initializeMobileMenu() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
}

function highlightCurrentPage() {
  const path = window.location.pathname;
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    
    // Improved logic: 
    // If we are at root and link is index, OR if path contains the link's name
    if ((path === "/" && href === "index.html") || (path !== "/" && href && path.includes(href.replace('.html', '')))) {
      link.classList.add("text-brand", "font-bold");
      link.classList.remove("text-slate-600", "hover:text-brand");
    }
  });
}

// ==========================================
// FOOTER LOGIC
// ==========================================

function loadFooter() {
  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      const placeholder = document.getElementById("footer-placeholder");
      if (!placeholder) return;
      placeholder.innerHTML = data;
      updateCopyrightYear();
    })
    .catch((err) => console.error("Error loading footer:", err));
}

function updateCopyrightYear() {
  const yearElement = document.querySelector("#current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// ==========================================
// FAQ LOGIC
// ==========================================

window.toggleFaq = function(button) {
  const answer = button.nextElementSibling;
  const icon = button.querySelector("i");

  // Ensure icon has transition class for smoothness
  icon.classList.add("transition-transform", "duration-300");

  if (answer.classList.contains("hidden")) {
    answer.classList.remove("hidden");
    icon.style.transform = "rotate(180deg)";
  } else {
    answer.classList.add("hidden");
    icon.style.transform = "rotate(0deg)";
  }
};