// Global motion for this site: runs once on the client, before the first page initializes.
import { gsap } from 'gsap';
import { ease, setTransition } from '../engine';
import { pipelines } from './work';
import { chrome } from './chrome';

export function setupMotion() {
  // Page transition: pink bands sweep up over the page, then on out the top.
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(c.querySelectorAll('.curtain__strip'), { yPercent: 101 }, { yPercent: 0, duration: 0.55, ease: ease.inOut, stagger: 0.05 }),
    enter: (c) => gsap.timeline()
      .to(c.querySelectorAll('.curtain__strip'), { yPercent: -101, duration: 0.6, ease: ease.inOut, stagger: 0.05 })
      .set(c, { autoAlpha: 0 }),
  });

  pipelines();
  chrome();
}
