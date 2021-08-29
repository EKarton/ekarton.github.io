'use strict';

(function () {
  /**
   * Handles the animation of scrolling to a particular element
   * @param {HTMLElement} targetElement the target element
   * @param {number} duration the time to complete the scrolling action, in ms (default is 1000ms)
   */
  const scrollTo = (targetElement, duration = 1000) => {
    const startingElement = document.documentElement;
    const amountToScrollBy = targetElement.getBoundingClientRect().y + pageYOffset;

    const start = startingElement.scrollTop;
    const change = amountToScrollBy - start;
    const increment = 20;

    const scrollToTarget = (currentTime = 0) => {
      const newTime = currentTime + increment;
      startingElement.scrollTop = easeInOutQuad(newTime, start, change, duration);

      if (newTime < duration) {
        window.requestAnimationFrame(() => scrollToTarget(newTime));
      }
    }

    // This function mimicks the behaviour of the ease-in-and-out transition type.
    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;

      if (t < 1) {
        return c / 2 * t * t + b;
      }

      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    scrollToTarget();
  }

  const handleScrollToSection = (section) => (e) => {
    e.preventDefault();
    scrollTo(section);
  }

  const handleGlobalHeaderOnScroll = (globalHeader, targetHeight) => {
    if (window.pageYOffset > targetHeight) {
      globalHeader.classList = 'global-header__contents global-header__contents--minimized';
      return;
    }

    globalHeader.classList = 'global-header__contents';
  }

  // It is triggered when the window has completed loading.
  window.onload = () => {
    // Sections of the webpage
    const introSection = document.getElementById('intro');
    const introContentSection = document.getElementById('intro__content')
    const aboutMeSection = document.getElementById('about');
    const projectsSection = document.getElementById('projects');

    const introContentSectionHeight = introContentSection.offsetHeight;

    // The global header
    Array.from(document.getElementsByClassName('global-header__contents')).forEach((globalHeader) => {
      const targetOffset = introContentSectionHeight - globalHeader.offsetHeight;

      window.addEventListener('scroll', () => handleGlobalHeaderOnScroll(globalHeader, targetOffset));
    });

    document.getElementById('global-header__home-button').onclick = handleScrollToSection(introSection);
    document.getElementById('global-header__about-button').onclick = handleScrollToSection(aboutMeSection);
    document.getElementById('global-header__projects-button').onclick = handleScrollToSection(projectsSection);
    document.getElementById('scroll-button').onclick = handleScrollToSection(aboutMeSection);
  };
})()