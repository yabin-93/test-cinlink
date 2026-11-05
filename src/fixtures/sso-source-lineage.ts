export interface SourceSnapshot {
  stepId: string; tool: string; rootStep?: boolean;
  inputFileIds: string[]; currentOutputIds?: string[];
}

/** Preserve earlier outputs when the journal replaces a repeated tool's slot. */
export function auditSourceLineage(snapshots: SourceSnapshot[], previousIds: string[], sourceId: string, terminalRootInputs: string[] = []) {
  const previous = new Set(previousIds);
  const produced = new Set<string>();
  const wrongRoot = new Set<string>();
  const staleInputs: Array<{ stepId: string; tool: string; fileId: string }> = [];
  for (const snapshot of snapshots) {
    const available = new Set([...produced, ...(snapshot.currentOutputIds ?? [])]);
    for (const fileId of snapshot.inputFileIds) {
      if (fileId === sourceId || !previous.has(fileId) || available.has(fileId)) continue;
      staleInputs.push({ stepId: snapshot.stepId, tool: snapshot.tool, fileId });
      if (snapshot.rootStep) wrongRoot.add(fileId);
    }
    for (const id of snapshot.currentOutputIds ?? []) produced.add(id);
  }
  for (const id of terminalRootInputs) if (id !== sourceId && previous.has(id) && !produced.has(id)) wrongRoot.add(id);
  return { wrongRootInputIds: [...wrongRoot], staleInputs, observedCurrentOutputIds: [...produced] };
}
