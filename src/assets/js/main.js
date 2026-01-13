(function () {
    // Nav Logic (Mobile Menu, Scroll, Active State)
    function initNavLogic() {
        const navbar = document.getElementById('navbar');
        const navDivider = document.getElementById('nav-divider');
        const mobileIcon = document.getElementById('mobile-menu-icon');
        const logo = document.getElementById('nav-logo');

        // Active State Logic
        const currentPath = window.location.pathname; // e.g. "/pages/about/" or "/pages/about.html"
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            // Check for exact match or directory match
            // If href is /pages/about.html and currentPath is /pages/about/ it might mismatch
            // Simple robust check:
            if (href === currentPath ||
                (currentPath === '/' && href === '/index.html') ||
                (currentPath.endsWith('/') && href === currentPath.slice(0, -1) + '.html') ||
                (href.endsWith('.html') && currentPath === href.replace('.html', '/'))
            ) {
                link.classList.add('text-yarrow');
            }
        });

        // Scroll Logic
        function handleScroll() {
            if (!navbar) return;
            const isHome = document.body.classList.contains('home-page');
            const scrollY = window.scrollY;

            // If it's NOT home page, it should always be white/visible background
            // If it IS home page, it starts transparent and becomes white

            if (!isHome) {
                // Ensure default state for non-home pages
                return;
            }

            // Home Page Logic
            if (scrollY > 50) {
                navbar.classList.remove('bg-transparent', 'text-white');
                navbar.classList.add('bg-white/95', 'backdrop-blur-md', 'text-black', 'shadow-sm');
                if (navDivider) navDivider.classList.replace('bg-white/30', 'bg-neutral-300');
                if (mobileIcon) mobileIcon.style.color = 'black';
                if (logo) {
                    logo.classList.remove('logo-white-filter');
                    logo.classList.add('logo-normal');
                }
            } else {
                navbar.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-sm', 'text-black');
                navbar.classList.add('bg-transparent', 'text-white');
                if (navDivider) navDivider.classList.replace('bg-neutral-300', 'bg-white/30');
                if (mobileIcon) mobileIcon.style.color = 'white';
                if (logo) {
                    logo.classList.remove('logo-normal');
                    logo.classList.add('logo-white-filter');
                }
            }
        }

        // Initial generic setup for transparent vs white nav on load
        if (document.body.classList.contains('home-page')) {
            // Force transparent start if at top
            if (window.scrollY < 50 && navbar) {
                navbar.classList.remove('bg-white/95', 'text-black', 'shadow-sm');
                navbar.classList.add('bg-transparent', 'text-white');
                if (logo) { logo.classList.add('logo-white-filter'); logo.classList.remove('logo-normal'); }
                if (navDivider) { navDivider.classList.replace('bg-neutral-300', 'bg-white/30'); }
                if (mobileIcon) { mobileIcon.style.color = 'white'; }
            }
            window.addEventListener('scroll', handleScroll);
        } else {
            if (navbar) {
                // Ensure we stick to the white nav styles
                navbar.classList.remove('bg-transparent', 'text-white');
                navbar.classList.add('bg-white/95', 'backdrop-blur-md', 'text-black', 'shadow-sm');
            }
        }

        // Mobile Menu Toggle Global Function (Required for onclick in HTML)
        window.toggleMobileMenu = function () {
            const menu = document.getElementById("mobile-menu");
            const icon = document.getElementById("mobile-menu-icon");
            const body = document.body;
            if (!menu) return;

            const isHidden = menu.classList.contains("hidden");

            if (isHidden) {
                menu.classList.remove("hidden");
                // Small delay to allow display:block to apply before opacity transition
                requestAnimationFrame(() => {
                    menu.classList.remove("opacity-0");
                    menu.classList.add("opacity-100");
                });
                if (icon) icon.setAttribute("data-lucide", "x");
                // We need to handle icon color if we are on transparent home
                if (document.body.classList.contains('home-page') && window.scrollY < 50) {
                    // Keep white or switch to black? Usually menu overlay is white, so icon should be black
                    if (icon) icon.style.color = 'black';
                }

                body.classList.add("overflow-hidden");
            } else {
                menu.classList.remove("opacity-100");
                menu.classList.add("opacity-0");
                setTimeout(() => menu.classList.add("hidden"), 300);
                if (icon) icon.setAttribute("data-lucide", "menu");

                // Revert icon color for home page transparency
                if (document.body.classList.contains('home-page') && window.scrollY < 50) {
                    if (icon) icon.style.color = 'white';
                }

                body.classList.remove("overflow-hidden");
            }
            if (window.lucide) window.lucide.createIcons();
        };
    }

    // Run
    document.addEventListener("DOMContentLoaded", () => {
        initNavLogic();
        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }
    });

})();
