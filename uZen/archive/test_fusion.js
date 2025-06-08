import { confirmFullSmash } from './full_smash.js';

const initiator = {
  cmid: 'Captain Cringe',
  diit: '813-49-76',
  ictm: 'XF23JKGHYS82',
  icon: '🧃'
};

const responder = {
  cmid: 'Zaptina Ringe',
  diit: '219-84-33',
  ictm: 'GG12PDKLT39',
  icon: '👾'
};

try {
  const result = confirmFullSmash(initiator, responder);
  console.log("✅ VenusComb Fusion Confirmed:");
  console.log("🔐 fusion_id:       ", result.fusion_id);
  console.log("🕒 timestamp:       ", result.fusion_timestamp);
  console.log("🌀 agents_consented:", result.agents_consented);
  console.log("📜 status:          ", result.status);
} catch (err) {
  console.error("❌ Fusion Failed:", err.message);
}

