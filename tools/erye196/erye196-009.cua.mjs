import { createHarness } from './common.cua.mjs';
const valueAt = (value, path) => path.reduce((v, k) => v?.[k], value);
/** Requires an actual captured read request. Never constructs a PRD endpoint or sends write-method probes. */
export function createCase009(config) {
  const a = createHarness({ ...config, caseId: 'ERYE196-009' });
  const b = createHarness({ ...config, ...config.projectB, app: config.app, fs: config.fs, outputDir: `${config.outputDir}/project-b`, caseId: 'ERYE196-009' });
  return { a, b,
    async runReadProbe({ fixture, request }) {
      if (!fixture || fixture.source !== 'observed-browser-request' || fixture.method !== 'GET' || !fixture.evidencePath)
        return a.finish('Blocked', { reason: 'Missing captured real read request; no invented API probe was sent.' });
      await a.fs.stat(fixture.evidencePath);
      const u = new URL(fixture.url);
      if (u.protocol !== 'https:' || u.origin !== fixture.allowedOrigin || u.username || u.password || u.searchParams.has('access_token')) throw new Error('Unsafe request destination');
      if (!fixture.resourceId || !fixture.invalidResourceId || fixture.resourceId === fixture.invalidResourceId || !fixture.identityPath?.length) throw new Error('Missing observed resource/identity mapping');
      const occurrences = fixture.url.split(fixture.resourceId).length - 1;
      if (occurrences !== 1 || !u.pathname.includes(fixture.resourceId)) throw new Error('Resource must be a unique observed path parameter');
      const c = await a.load(); if (c.steps.probeAttempted) throw new Error('Probe already attempted; inspect saved response instead of replaying');
      a.assertScan(await a.scan('a-before-probe'));
      c.steps.probeAttempted = true; await a.persist();
      const control = await request(fixture.url, { method: 'GET', headers: fixture.headers, redirect: 'manual' });
      const valid = await control.json();
      if (!control.ok || valueAt(valid, fixture.identityPath) !== fixture.expectedIdentity) throw new Error('Legitimate control did not identify the registered project');
      const invalidURL = fixture.url.replace(fixture.resourceId, fixture.invalidResourceId);
      if (new URL(invalidURL).origin !== u.origin) throw new Error('Probe changed origin');
      const bad = await request(invalidURL, { method: 'GET', headers: fixture.headers, redirect: 'manual' });
      let body; try { body = await bad.json(); } catch { body = null; }
      const errorReported = fixture.errorPath?.length && valueAt(body, fixture.errorPath) === fixture.errorValue;
      c.steps.probe = { controlStatus: control.status, invalidStatus: bad.status,
        invalidIdentity: body ? valueAt(body, fixture.identityPath) : null, explicitlyRejected: (bad.status >= 400 && bad.status < 500) || !!errorReported };
      await a.persist(); return { status: 'NeedsSavedProjectVerification', ...c.steps.probe };
    },
    async verifyProjectA() { a.assertScan(await a.scan('a-after-probe')); const c = await a.load(); c.steps.aUnchanged = true; await a.persist(); return { status: 'VerifyB' }; },
    async verifyProjectB() {
      b.assertScan(await b.scan('b-after-probe')); const c = await a.load();
      if (!c.steps.probe || !c.steps.aUnchanged) throw new Error('Read probe and A verification must precede final B verification');
      return b.finish(c.steps.probe.explicitlyRejected ? 'Passed' : 'Failed', { probe: c.steps.probe,
        reason: c.steps.probe.explicitlyRejected ? 'Invalid target rejected; both registered projects unchanged' : 'Invalid target was not explicitly rejected' });
    },
  };
}
