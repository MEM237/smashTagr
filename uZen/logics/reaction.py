# reflex_engine/logics/reaction.py

class ReactionEngine:
    def __init__(self):
        self.mood = "neutral"
        self.threat_level = 0
        self.reflex = "neutral"

    def register_event(self, mood: str, severity: int = 0):
        """
        Accepts an event with a mood and optional severity (0–3).
        Adjusts internal mood, threat level, and reflex strategy.
        """
        self.mood = mood
        self.threat_level = min(3, self.threat_level + severity)
        self.update_reflex()

    def resolve_event(self):
        """De-escalate threat level by one step."""
        self.threat_level = max(0, self.threat_level - 1)
        self.update_reflex()

    def update_reflex(self):
        if self.threat_level == 0:
            self.reflex = "neutral"
        elif self.threat_level == 1:
            self.reflex = "watch"
        elif self.threat_level == 2:
            self.reflex = "escalate"
        else:
            self.reflex = "flush"

    def get_state(self):
        return {
            "mood": self.mood,
            "threat_level": self.threat_level,
            "reflex": self.reflex
        }

    def __str__(self):
        return f"Mood: {self.mood}, Threat Level: {self.threat_level}, Reflex: {self.reflex}"

