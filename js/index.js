/* Animation Timing */
const animeConfig = {
  duration : 500,
  movementDelay : 500 * (.333 * 2),
  movementAnimation : 500 * .333
}

console.log(animeConfig.movementDelay, animeConfig.movementAnimation)

/* Selected DOM */
let navbar = document.querySelector('nav'),
    navbarItems = document.querySelectorAll('nav > ul > li'),
    navbarOldIndex = 0,
    navbarIndex = 0;

/* Create navbar__line */
let navbarLine = document.createElement('div');
navbarLine.classList.add('navbar__line');
navbar.appendChild(navbarLine);

navbarItems.forEach( (element, index, array) => {
  // console.log(element, index, array);
  if (navbarIndex == 0) {
     navbarItems[0].classList.add('selected');
     navbarLine.style.top = `${navbarItems[0].offsetTop}px`;
  }

  if (navbarItems[index].classList.contains('selected')) {
    navbarIndex = index;
  }

  navbarItems[index].addEventListener('click', () => {
    if (navbarIndex == index) return ;
    // Full Height - top and bottom padding
    let navbarItemFullHeight = navbarItems[index].offsetHeight;
    let navbarItemHeight = navbarItems[index].offsetHeight - 16;
    // Code ...
    navbarItems[navbarIndex].classList.remove('selected');
    navbarOldIndex = navbarIndex;
    navbarIndex = index;
    element.classList.add('selected');
    
    // Animejs
    if (navbarIndex > navbarOldIndex) {
      let calcHeightAnimation = (navbarItems[index].offsetTop - navbarItems[navbarOldIndex].offsetTop + navbarItemHeight);
      anime.remove(navbarLine);
      anime({
        targets: navbarLine,
        duration: animeConfig.duration,
        easing: 'easeInOutCubic', //'cubicBezier(.63,.09,.75,.46)', // from - to = exe
        height: [navbarItemHeight, calcHeightAnimation, navbarItemHeight],
        top: {
          value: [navbarItems[navbarOldIndex].offsetTop, navbarItems[index].offsetTop],
          delay: animeConfig.movementDelay,
          duration: animeConfig.movementAnimation
        }
      });
    }
    else {
      let totalSize = ((navbarItems.length - 1) * navbarItemFullHeight);
      let calcHeightAnimation = (navbarItems[navbarOldIndex].offsetTop - navbarItems[index].offsetTop + navbarItemHeight);
      navbarLine.removeAttribute("style");
      anime.remove(navbarLine);
      anime({
        targets: navbarLine,
        duration: animeConfig.duration,
        easing: 'easeInOutCubic',
        height: [navbarItemHeight, calcHeightAnimation, navbarItemHeight],
        bottom: {
          value: [totalSize - navbarItems[navbarOldIndex].offsetTop , totalSize - navbarItems[index].offsetTop],
          delay: animeConfig.movementDelay,
          duration: animeConfig.movementAnimation
        }
      });
    }
  });
});