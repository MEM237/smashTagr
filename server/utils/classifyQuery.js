module.exports = function classifyQuery(message) {
  const intent = message.toLowerCase();

  if (intent.includes("smash") || intent.includes("tag")) return "validation";
  if (intent.includes("law") || intent.includes("access")) return "enforcement";
  if (intent.includes("start") || intent.includes("ritual")) return "initiation";

  if (intent.trim().length < 3 || !/\w/.test(intent)) return "nonsense";

  return "unknown";
};
