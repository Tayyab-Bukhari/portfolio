/** Browser preference checks. Call these only inside effects or event handlers. */
export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const hasFinePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
