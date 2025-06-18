const classifyQuery = require("../utils/classifyQuery");

router.post("/:agent/reply", async (req, res) => {
  const { agent } = req.params;
  const { message } = req.body;

  const domain = classifyQuery(message);
  const thisAgent = agentModels[agent];

  // Nonsense case
  if (domain === "nonsense") {
    return res.json({
      reply: "Your question is unclear. Please refine and ask again.",
      highlight: null
    });
  }

  // Out of scope → redirect
  if (domain !== thisAgent.domain) {
    const redirectedAgent = thisAgent.redirectTo;
    const tileToHighlight = redirectedAgent;

    return res.json({
      reply: `That inquiry falls outside my domain. Please speak with agent ${redirectedAgent}.`,
      highlight: tileToHighlight
    });
  }

  // Valid inquiry → AI generate
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: thisAgent.systemPrompt },
      { role: "user", content: message }
    ]
  });

  const reply = completion.choices[0].message.content;

  res.json({ reply, highlight: null });
});
