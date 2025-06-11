from reflex_engine.logics.reaction import ReactionEngine
from reflex_engine.tools.logger import ReflexLogger
from reflex_engine.logics.affect import AffectEngine
from reflex_engine.logics.threat_watch import ThreatWatch, ReflexBreach
from reflex_engine.logics.memory_store import MemoryStore
from local_adk.adk.types import ToolContext, AgentOutput

# Initialize shared tools
logger = ReflexLogger()
affect = AffectEngine()
threat = ThreatWatch()
memory = MemoryStore()
reaction = ReactionEngine()

class RootAgent:
    def run(self, input_data: dict, tool_context: ToolContext) -> AgentOutput:
        user_id = input_data.get("user", "unknown")
        tag = input_data.get("tag", "unknown")
        feed_sig = input_data.get("feed_sig", "default_sig")

        # Load previous memory state
        state = memory.load("ZBLD.Δee")
        if state:
            affect.set_mood(state.get("mood", "neutral"))
            logger.log("ZBLD.Δee", "Loaded memory", tag=state.get("tag", 
"N/A"), mood=state.get("mood", "-"))

        # Threat analysis
        try:
            threat.register_feed(user_id=user_id, feed_sig=feed_sig)
            logger.log("DRWN.Δfx", "FeedSig accepted", tag=feed_sig, 
mood="calm")
            reaction.resolve_event()  # De-escalate
        except ReflexBreach:
            logger.log("DRWN.Δfx", "Breach detected", tag=feed_sig, 
mood="alert", level="ERROR")
            reaction.register_event(mood="agitated", severity=2)

        # Log current reflex state
        reflex_state = reaction.get_state()
        logger.log("ZBLD.Δee", f"Reflex mode: {reflex_state['reflex']}", 
mood=reflex_state["mood"])

        # Flush logic
        if reflex_state["reflex"] == "flush":
            logger.log("ZBLD.Δee", "Reflex triggered flush – memory wipe", 
mood="agitated")
            memory.save("ZBLD.Δee", {})

        # Final smash-tag logic
        affect.set_mood("calm", 0.6)
        logger.log("ZBLD.Δee", "Issued %smash-tag:½", tag=tag, 
mood=affect.get_mood()["mood"])
        print("[Tool Call] generate_half_smash_tag -> %smash-tag ::μ~zen")

        memory.save("ZBLD.Δee", {
            "mood": affect.get_mood()["mood"],
            "tag": tag,
            "trust_matrix": {"DRWN.Δfx": 0.93}
        })

        print("[Tool Call] log_reflex_state ->", {
            "reflex": "%smash-tag ::μ~zen",
            "tag": tag
        })

        return AgentOutput({
            "reflex_valid": True,
            "tag": tag,
            "status": "presence verified",
            "reflex": reflex_state["reflex"]
        })

