type Video = { id: string; name: string; durationSec?: number; width?: number; height?: number };
type PriorRound = { finalStatus?: string; downloads: Video[] };

/** Resolve only the declared dependency. Never fall back to F or another output. */
export function resolveRoundInput(inputRound: number, currentRound: number, source: Video, rounds: PriorRound[]) {
  if (!Number.isInteger(inputRound) || inputRound < 0 || inputRound >= currentRound) {
    throw new Error(`Invalid source round ${inputRound} for round ${currentRound}`);
  }
  if (inputRound === 0) return { video: source, inputRound };
  const dependency = rounds[inputRound - 1];
  const videos = dependency?.downloads.filter(file => /\.mp4$/i.test(file.name)) ?? [];
  if (dependency?.finalStatus !== "done" || videos.length !== 1 || !(videos[0].durationSec! > 0) || !(videos[0].width! > 0) || !(videos[0].height! > 0)) {
    return { inputRound, blockedReason: `第${inputRound}轮没有已完成且可解码的唯一MP4，本轮不提交，不替换来源` };
  }
  return { inputRound, video: videos[0] };
}
