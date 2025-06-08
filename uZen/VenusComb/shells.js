import { agentMap } from '../smash/agents.js';

export function generateShellMap(seed = Date.now()) {
  const keys = Object.keys(agentMap);
  const shuffled = shuffle(keys.map(k => `comb_${generateId(2)}${k}`));

  const map = {};
  keys.forEach((key, i) => {
    map[shuffled[i]] = agentMap[key];
  });

  return map;
}

function generateId(length = 2) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * 
chars.length)]).join('');
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

