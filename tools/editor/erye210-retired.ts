/** Old implementations stay excluded; restored business points have a new unique entry. */
const supersededLegacy210Ids: readonly string[] = Object.freeze([
  'ERYE210-002', 'ERYE210-004', 'ERYE210-005', 'ERYE210-007',
  'ERYE210-010', 'ERYE210-013', 'ERYE210-015', 'ERYE210-018',
  'ERYE210-020', 'ERYE210-040', 'ERYE210-041', 'ERYE210-014',
]);
/** All eleven retired IDs were restored; 014's readonly scope was separately replaced with v2. */
export const retired210Ids: readonly string[] = Object.freeze([]);

// Check before registering a test: a retired-only selection cannot create a browser or project.
export const isSupersededLegacy210 = (id: string): boolean => supersededLegacy210Ids.includes(id);
