// Pipelines keep one packet in transit, hopping node to node.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ease, onPage, prefersReducedMotion } from '../engine';

export function pipelines() {
  onPage(() => {
    if (prefersReducedMotion()) return;
    document.querySelectorAll<HTMLElement>('[data-pipe="live"]').forEach((pipe) => {
      const packet = pipe.querySelector<HTMLElement>('[data-packet]');
      const rail = packet?.parentElement;
      const stops = [...pipe.querySelectorAll<HTMLElement>('.pipe__node')];
      if (!packet || !rail || !stops.length) return;
      const tl = gsap.timeline({ repeat: -1, paused: true });
      stops.forEach((s) => {
        tl.to(packet, { x: () => s.offsetLeft - rail.offsetLeft, duration: 0.55, ease: ease.inOut }).to({}, { duration: 0.45 });
      });
      tl.to(packet, { autoAlpha: 0, duration: 0.2 }).set(packet, { x: 0 }).to(packet, { autoAlpha: 1, duration: 0.2 });
      ScrollTrigger.create({ trigger: pipe, start: 'top bottom', end: 'bottom top', onToggle: (s) => (s.isActive ? tl.play() : tl.pause()) });
    });
  });
}
