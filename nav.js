document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');

    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            const icon = burgerMenu.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // Handle mobile dropdown toggles
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            // Only toggle on mobile
            if (window.innerWidth <= 768) {
                dropdown.classList.toggle('open');
            }
        });
    });

    // Fullscreen Banner Functionality
    const bannerClasses = [
        '.hero',
        '.page-hero',
        '.zone-hero',
        '.canter-hero',
        '.jeep-hero',
        '.package-hero',
        '.resort-hero'
    ];

    bannerClasses.forEach(className => {
        const banners = document.querySelectorAll(className);
        banners.forEach(banner => {
            // Check if toggle already exists to avoid duplicates
            if (banner.querySelector('.fullscreen-toggle')) return;

            // Create toggle button
            const toggleBtn = document.createElement('div');
            toggleBtn.className = 'fullscreen-toggle';
            toggleBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
            banner.appendChild(toggleBtn);

            // Add click listener
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                
                if (!document.fullscreenElement && 
                    !document.webkitFullscreenElement && 
                    !document.msFullscreenElement) {
                    // Enter fullscreen
                    if (banner.requestFullscreen) {
                        banner.requestFullscreen();
                    } else if (banner.webkitRequestFullscreen) {
                        banner.webkitRequestFullscreen();
                    } else if (banner.msRequestFullscreen) {
                        banner.msRequestFullscreen();
                    }
                } else {
                    // Exit fullscreen
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                }
            });
        });
    });

    // Handle Fullscreen state change events to update icons and tooltips
    const handleFullscreenChange = () => {
        const fullscreenElement = document.fullscreenElement || 
                                  document.webkitFullscreenElement || 
                                  document.msFullscreenElement;

        bannerClasses.forEach(className => {
            const banners = document.querySelectorAll(className);
            banners.forEach(banner => {
                const toggleBtn = banner.querySelector('.fullscreen-toggle');
                if (!toggleBtn) return;

                const icon = toggleBtn.querySelector('i');
                if (banner === fullscreenElement) {
                    banner.classList.add('fullscreen-active');
                    if (icon) {
                        icon.classList.remove('fa-expand');
                        icon.classList.add('fa-compress');
                    }
                } else {
                    banner.classList.remove('fullscreen-active');
                    if (icon) {
                        icon.classList.remove('fa-compress');
                        icon.classList.add('fa-expand');
                    }
                }
            });
        });
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
});

// Anti-Inspect & Anti-Copy Security Script
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    // F12
    if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
    }
    // Ctrl+Shift+I (Inspect)
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.keyCode === 73)) {
        e.preventDefault();
    }
    // Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && (e.key === 'J' || e.key === 'j' || e.keyCode === 74)) {
        e.preventDefault();
    }
    // Ctrl+U (View Source)
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.keyCode === 85)) {
        e.preventDefault();
    }
    // Ctrl+S (Save Page)
    if (e.ctrlKey && (e.key === 'S' || e.key === 's' || e.keyCode === 83)) {
        e.preventDefault();
    }
    // Ctrl+C (Copy)
    if (e.ctrlKey && (e.key === 'C' || e.key === 'c' || e.keyCode === 67)) {
        e.preventDefault();
    }
});

// Enquiry Popup Modal Injection and Control (Universal - Appears on all pages)
document.addEventListener('DOMContentLoaded', () => {
    const injectEnquiryModal = () => {
        // Prevent duplicate injection
        if (document.getElementById('enquiryModal')) return;

        // Check if already shown in this session (so we don't annoy users on page navigation)
        if (sessionStorage.getItem('enquiryModalShown')) return;

        // Create modal card structure
        const modalHtml = `
        <div class="modal-card">
            <span class="modal-close-btn">&times;</span>
            <div class="modal-header">
                <div class="modal-logo">
                    <i class="fa-solid fa-paw"></i>
                </div>
                <h3>Plan Your Wildlife Adventure</h3>
                <p>Enter details below to check Safari Availability & get a Free Quote!</p>
            </div>
            <form id="modalForm">
                <div class="modal-form-grid">
                    <div class="modal-field">
                        <label for="modalName">Full Name *</label>
                        <input type="text" id="modalName" placeholder="Your Name" required>
                    </div>
                    <div class="modal-field">
                        <label for="modalPhone">Phone Number *</label>
                        <input type="tel" id="modalPhone" placeholder="Mobile Number" required>
                    </div>
                    <div class="modal-field">
                        <label for="modalEmail">Email Address</label>
                        <input type="email" id="modalEmail" placeholder="Your Email">
                    </div>
                    <div class="modal-field">
                        <label for="modalDate">Travel Date *</label>
                        <input type="date" id="modalDate" required>
                    </div>
                    <div class="modal-field">
                        <label for="modalSafari">Safari Type</label>
                        <select id="modalSafari">
                            <option value="jeep">Jeep Safari</option>
                            <option value="canter">Canter Safari</option>
                            <option value="package" selected>Resort + Safari Package</option>
                        </select>
                    </div>
                    <div class="modal-field">
                        <label for="modalPeople">No. of Persons *</label>
                        <input type="number" id="modalPeople" min="1" max="50" value="2" required>
                    </div>
                </div>
                <button type="submit" class="modal-submit-btn">
                    Check Availability Now <i class="fa-solid fa-paper-plane"></i>
                </button>
            </form>
        </div>`;

        const modalDiv = document.createElement('div');
        modalDiv.id = 'enquiryModal';
        modalDiv.className = 'modal-overlay';
        modalDiv.innerHTML = modalHtml;
        document.body.appendChild(modalDiv);

        // Show modal after 1.5 seconds
        setTimeout(() => {
            modalDiv.classList.add('show');
        }, 1500);

        // Event listeners for close controls
        const closeBtn = modalDiv.querySelector('.modal-close-btn');
        const form = modalDiv.querySelector('#modalForm');

        const closeModal = () => {
            modalDiv.classList.remove('show');
            sessionStorage.setItem('enquiryModalShown', 'true');
            // Remove from DOM after transition
            setTimeout(() => {
                modalDiv.remove();
            }, 500);
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        modalDiv.addEventListener('click', (e) => {
            if (e.target === modalDiv) {
                closeModal();
            }
        });

        // Keypress close control
        const escHandler = (e) => {
            if (e.key === 'Escape' && modalDiv.classList.contains('show')) {
                closeModal();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);

        // Handle submission
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Thank you! Your availability request has been sent. We will contact you shortly.');
                closeModal();
            });
        }
    };

    // Run injection
    injectEnquiryModal();
});

// Footer Enquiry Form Section (Injected before footer on all pages)
document.addEventListener('DOMContentLoaded', () => {
    const injectFooterEnquiry = () => {
        // Prevent duplicate injection
        if (document.getElementById('footerEnquirySection')) return;

        const footerEnquiryHTML = `
        <section class="footer-enquiry-section" id="footerEnquirySection">
            <div class="container">
                <div class="footer-enquiry-container">
                    <!-- Left Info Panel -->
                    <div class="footer-enquiry-info">
                        <span class="subtitle">Get in Touch</span>
                        <h2>Plan Your Perfect Corbett Safari</h2>
                        <p>Ready to witness the majestic Bengal Tiger in its natural habitat? Fill in your details and our wildlife experts will design a personalized safari package just for you — completely free of charge!</p>
                        <div class="footer-enquiry-contact">
                            <div class="contact-item">
                                <i class="fa-solid fa-phone"></i>
                                <span><strong>Call / WhatsApp:</strong> +91-9456722521</span>
                            </div>
                            <div class="contact-item">
                                <i class="fa-solid fa-envelope"></i>
                                <span><strong>Email:</strong> booking@ukcorbett.com</span>
                            </div>
                            <div class="contact-item">
                                <i class="fa-solid fa-clock"></i>
                                <span><strong>Open Daily:</strong> 9:00 AM – 9:00 PM</span>
                            </div>
                        </div>
                    </div>

                    <!-- Right Form Panel -->
                    <div class="footer-enquiry-form-wrapper">
                        <h3 style="font-family: var(--font-heading); color: var(--primary-color); font-size: 1.5rem; margin-bottom: 5px;">Send an Enquiry</h3>
                        <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 20px;">We'll respond within 24 hours</p>
                        <form id="footerEnquiryForm">
                            <div class="form-grid-footer">
                                <div class="form-group-footer">
                                    <label for="feqName">Full Name *</label>
                                    <input type="text" id="feqName" placeholder="Your Name" required>
                                </div>
                                <div class="form-group-footer">
                                    <label for="feqPhone">Phone Number *</label>
                                    <input type="tel" id="feqPhone" placeholder="Mobile Number" required>
                                </div>
                                <div class="form-group-footer">
                                    <label for="feqEmail">Email Address</label>
                                    <input type="email" id="feqEmail" placeholder="Your Email">
                                </div>
                                <div class="form-group-footer">
                                    <label for="feqDate">Travel Date *</label>
                                    <input type="date" id="feqDate" required>
                                </div>
                                <div class="form-group-footer">
                                    <label for="feqSafari">Safari Type</label>
                                    <select id="feqSafari">
                                        <option value="jeep">Jeep Safari</option>
                                        <option value="canter">Canter Safari</option>
                                        <option value="package" selected>Resort + Safari Package</option>
                                    </select>
                                </div>
                                <div class="form-group-footer">
                                    <label for="feqPersons">No. of Persons *</label>
                                    <input type="number" id="feqPersons" min="1" max="50" value="2" required>
                                </div>
                            </div>
                            <button type="submit" class="btn-primary" style="width:100%; margin-top:18px; padding:14px; font-size:1rem; justify-content:center; gap:10px;">
                                Send Enquiry <i class="fa-solid fa-paper-plane"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>`;

        // Find the footer wave div to insert before it
        const footerWave = document.querySelector('.footer-wave');
        if (footerWave) {
            footerWave.insertAdjacentHTML('beforebegin', footerEnquiryHTML);
        } else {
            // Fallback: insert before footer
            const footer = document.querySelector('footer.footer');
            if (footer) {
                footer.insertAdjacentHTML('beforebegin', footerEnquiryHTML);
            }
        }

        // Handle form submission
        const feqForm = document.getElementById('footerEnquiryForm');
        if (feqForm) {
            feqForm.addEventListener('submit', (e) => {
                e.preventDefault();
                feqForm.reset();
                const btn = feqForm.querySelector('button[type="submit"]');
                if (btn) {
                    const original = btn.innerHTML;
                    btn.innerHTML = '<i class="fa-solid fa-check"></i> Enquiry Sent! We\'ll contact you soon.';
                    btn.style.background = '#2d8a4e';
                    setTimeout(() => {
                        btn.innerHTML = original;
                        btn.style.background = '';
                    }, 5000);
                }
            });
        }
    };

    injectFooterEnquiry();
});

