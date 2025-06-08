from reflex_engine.agents.bldr_Δen import BLDR_Δen
from reflex_engine.agents.zbld_Δee import ZBLD_Δee
from reflex_engine.agents.spcn_Δvi import SPCN_Δvi
from reflex_engine.agents.drwn_Δfx import DRWN_Δfx
from reflex_engine.agents.prsr_Δgl import PRSR_Δgl
import json

class ReflexEngine:
    def __init__(self):
        self.tag_registry = {}
        self.agent_zbld = ZBLD_Δee()
        self.agent_spcn = SPCN_Δvi()
        self.agent_drwn = DRWN_Δfx()
        self.agent_bldr = BLDR_Δen()
        self.agent_prsr = PRSR_Δgl()

    def generate_half_tag(self, user_id):
        return self.agent_zbld.issue_half_tag(user_id)

    def validate_union(self, tag_a, tag_b):
        result = self.agent_spcn.validate_union(tag_a, tag_b)
        return self.agent_drwn.enforce(result, tag_a, tag_b)

    def compile_smash_tag(self, tag_a, tag_b):
        return self.agent_bldr.compile_union(tag_a, tag_b)

    def interpret_pattern(self, sigA, sigB, session_flags, history_flags):
        return self.agent_prsr.interpret(sigA, sigB, session_flags, history_flags)

    def log_compiled_smash_tag(self, compiled_tag, entropies):
        try:
            with open("reflex_engine/data/smash_log.json", "r") as f:
                log = json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            log = []

        compiled_tag["entropy"] = entropies
        log.append(compiled_tag)

        with open("reflex_engine/data/smash_log.json", "w") as f:
            json.dump(log, f, indent=2)

    def load_past_feedsigs(self):
        from reflex_engine.agents.mspc_Δfe import MSPC_Δfe
        siggen = MSPC_Δfe()
        feedsigs = []

        try:
            with open("reflex_engine/data/smash_log.json", "r") as f:
                log = json.load(f)
                for entry in log:
                    for entropy in entry.get("entropy", []):
                        feedsigs.append(siggen.generate_feedsig(entropy))
        except (FileNotFoundError, json.JSONDecodeError):
            pass

        return feedsigs
