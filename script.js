document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle for Floating Pill
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle hamburger icon animation
            const spans = hamburger.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
                spans[1].style.transform = 'rotate(-45deg) translate(4px, -4px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.transform = 'none';
            }
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.transform = 'none';
            });
        });
    }

    // 2. High-End Staggered Intersection Observer
    const staggerContainers = document.querySelectorAll('.stagger-container');
    
    const staggerObserverOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const staggerObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.stagger-item');
                
                // Fluid, staggered reveal 
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('is-visible');
                    }, index * 100); // Snappy 100ms for tighter section spacing
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, staggerObserverOptions);

    staggerContainers.forEach(container => {
        staggerObserver.observe(container);
    });

    // 3. Dynamic Counter-Up Logic
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const counterObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
                hasCounted = true;
                
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText;
                        
                        const inc = target / 100;
                        
                        if (count < target) {
                            counter.innerText = Math.ceil(count + inc);
                            setTimeout(updateCount, 25);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, counterObserverOptions);

    const statsSection = document.querySelector('.statistics');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }

    // 4. Ambient Background Animations (Floating Geometric Nodes)
    const nodesContainer = document.getElementById('nodes-container');
    if (nodesContainer) {
        const numNodes = window.innerWidth < 768 ? 6 : 15; // Fewer on mobile for performance
        
        for (let i = 0; i < numNodes; i++) {
            createNode(nodesContainer);
            
            // Randomly create connector lines for some nodes to form a "network" look
            if (i % 3 === 0) {
                createLine(nodesContainer);
            }
        }
    }

    function createNode(container) {
        const node = document.createElement('div');
        node.classList.add('geo-node');
        
        // Random size between 100px and 300px
        const size = Math.random() * 200 + 100;
        node.style.width = `${size}px`;
        node.style.height = `${size}px`;
        
        // Random position
        node.style.left = `${Math.random() * 100}vw`;
        node.style.top = `${Math.random() * 100}vh`;
        
        // Random animation duration and delay for organic drift
        const duration = Math.random() * 10 + 10; // 10s to 20s
        const delay = Math.random() * -20; // Start at random point in animation
        
        node.style.animationDuration = `${duration}s`;
        node.style.animationDelay = `${delay}s`;
        
        container.appendChild(node);
    }

    function createLine(container) {
        const line = document.createElement('div');
        line.classList.add('geo-line');
        
        // Random length
        line.style.width = `${Math.random() * 300 + 100}px`;
        
        // Random position and rotation
        line.style.left = `${Math.random() * 100}vw`;
        line.style.top = `${Math.random() * 100}vh`;
        line.style.transform = `rotate(${Math.random() * 180}deg)`;
        
        const delay = Math.random() * -10;
        line.style.animationDelay = `${delay}s`;
        
        container.appendChild(line);
    }
});
