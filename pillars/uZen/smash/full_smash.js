import { compileHalfSmash, confirmHalfSmash } from './half_smash.js';
import { writeFileSync, readFileSync } from 'fs';

export function confirmFullSmash(initiatorData, responderData) {
  const half1 = compileHalfSmash(initiatorData);
  const half2 = compileHalfSmash(responderData);

  const isValid1 = confirmHalfSmash(half1);
  const isValid2 = confirmHalfSmash(half2);

  if (isValid1 && isValid2) {
    const fusionId = generateFusionId();
    const timestamp = new Date().toISOString();

    const record = {
      fusion_id: fusionId,
      fusion_timestamp: timestamp,
      agents_consented: [...half1, ...half2].map(h => h.comb).concat("comb_SPCN"),
      status: 'validated',
      sealed: true
    };

    const ledgerPath = './smash/ledger.json';
    const ledger = JSON.parse(readFileSync(ledgerPath, 'utf8'));
    ledger.push(record);
    writeFileSync(ledgerPath, JSON.stringify(ledger, null, 2));

    return record;
  } else {
    throw new Error('Agent consensus incomplete.');
  }
}

function generateFusionId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * 
chars.length)]).join('');
}

