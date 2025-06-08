const consonants = ["b", "d", "g", "k", "l", "m", "n", "p", "r", "s", "t", "v", "z"];
const vowels = ["a", "e", "i", "o", "u", "ae", "ou"];

function segmentToWord(segment) {
  let word = "";
  for (let i = 0; i < segment.length - 1; i += 2) {
    const c = consonants[parseInt(segment[i], 16) % consonants.length];
    const v = vowels[parseInt(segment[i + 1], 16) % vowels.length];
    word += c + v;
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function generateCMID(feedSig, timestamp) {
  const seed = `${feedSig}-${timestamp}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(seed);

  return crypto.subtle.digest('SHA-256', data).then(buffer => {
    const hex = Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    const segment1 = hex.slice(0, 10);
    const segment2 = hex.slice(10, 20);
    return `${segmentToWord(segment1)} ${segmentToWord(segment2)}`;
  });
}
