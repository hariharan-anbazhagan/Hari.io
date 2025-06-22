document.addEventListener('DOMContentLoaded', function () {
    // Custom Cursor
    var $dot = document.querySelector('.cursor-dot');
    var $outline = document.querySelector('.cursor-dot-outline');
    if ($dot && $outline) {
        var cursor = {
            delay: 8,
            _x: 0,
            _y: 0,
            endX: (window.innerWidth / 2),
            endY: (window.innerHeight / 2),
            cursorVisible: true,
            cursorEnlarged: false,
            $dot: $dot,
            $outline: $outline,

            init: function () {
                this.dotSize = this.$dot.offsetWidth;
                this.outlineSize = this.$outline.offsetWidth;
                this.setupEventListeners();
                this.animateDotOutline();
            },

            setupEventListeners: function () {
                var self = this;

                // Hover effects for interactive elements
                document.querySelectorAll('a, button, .circle-icon, .moonboi, .profile-pic, .filter-btn, .contact-link, .submit-btn, .gallery-item').forEach(function (el) {
                    el.addEventListener('mouseover', function () {
                        self.cursorEnlarged = true;
                        self.toggleCursorSize();
                    });
                    el.addEventListener('mouseout', function () {
                        self.cursorEnlarged = false;
                        self.toggleCursorSize();
                    });
                });

                // Click events
                document.addEventListener('mousedown', function () {
                    self.cursorEnlarged = true;
                    self.toggleCursorSize();
                });
                document.addEventListener('mouseup', function () {
                    self.cursorEnlarged = false;
                    self.toggleCursorSize();
                });

                document.addEventListener('mousemove', function (e) {
                    self.cursorVisible = true;
                    self.toggleCursorVisibility();
                    self.endX = e.pageX;
                    self.endY = e.pageY;
                    self.$dot.style.top = self.endY + 'px';
                    self.$dot.style.left = self.endX + 'px';
                });

                document.addEventListener('mouseenter', function () {
                    self.cursorVisible = true;
                    self.toggleCursorVisibility();
                });

                document.addEventListener('mouseleave', function () {
                    self.cursorVisible = false;
                    self.toggleCursorVisibility();
                });
            },

            animateDotOutline: function () {
                var self = this;
                self._x += (self.endX - self._x) / self.delay;
                self._y += (self.endY - self._y) / self.delay;
                self.$outline.style.top = self._y + 'px';
                self.$outline.style.left = self._x + 'px';
                requestAnimationFrame(self.animateDotOutline.bind(self));
            },

            toggleCursorSize: function () {
                if (this.cursorEnlarged) {
                    this.$dot.style.transform = 'translate(-50%, -50%) scale(0.75)';
                    this.$outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                } else {
                    this.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
                    this.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
                }
            },

            toggleCursorVisibility: function () {
                if (this.cursorVisible) {
                    this.$dot.style.opacity = 1;
                    this.$outline.style.opacity = 1;
                } else {
                    this.$dot.style.opacity = 0;
                    this.$outline.style.opacity = 0;
                }
            }
        };
        // Initialize cursor
        cursor.init();
    }

    // Theme Toggle with smooth transition
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentIcon = document.querySelector('#themeChanger');

    // Helper to trigger smooth color transition
    function triggerThemeTransition() {
        document.body.style.transition = 'background-color 0.5s, color 0.5s';
        document.documentElement.style.transition = 'background-color 0.5s, color 0.5s';
        // Remove transition after animation
        setTimeout(() => {
            document.body.style.transition = '';
            document.documentElement.style.transition = '';
        }, 600);
    }

    // Check for saved theme preference or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';

    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleSwitch.checked = true;
        currentIcon.classList.add('zmdi-sun');
        currentIcon.classList.remove('zmdi-brightness-2');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        toggleSwitch.checked = false;
        currentIcon.classList.remove('zmdi-sun');
        currentIcon.classList.add('zmdi-brightness-2');
    }

    function switchTheme(e) {
        triggerThemeTransition();
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            currentIcon.classList.add('zmdi-sun');
            currentIcon.classList.remove('zmdi-brightness-2');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            currentIcon.classList.remove('zmdi-sun');
            currentIcon.classList.add('zmdi-brightness-2');
        }
    }

    toggleSwitch.addEventListener('change', switchTheme, false);

    // Gallery Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter items
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Lightbox configuration
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'showImageNumberLabel': false,
        'positionFromTop': 100
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
});