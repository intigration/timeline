(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  // Scripts that need to be in website header.

  let stickyHeader;
  window.addEventListener('load', () => {
    stickyHeader = document.querySelector('.sticky-header');
  });
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (stickyHeader) {
      if (currentScroll >= 70) {
        stickyHeader.classList.add('is-active');
        stickyHeader.style.visibility = 'visible';
        document.documentElement.classList.add('is-header-sticky');
        document.documentElement.style.setProperty('--stickyHeaderHeight', stickyHeader.clientHeight + 'px');
      } else if (currentScroll < 70) {
        stickyHeader.style.visibility = 'hidden';
        stickyHeader.classList.remove('is-active');
        document.documentElement.style.setProperty('--stickyHeaderHeight', stickyHeader.clientHeight + 'px');
        document.documentElement.classList.remove('is-header-sticky');
      }
    }
  });

}));
//# sourceMappingURL=header.js.map
