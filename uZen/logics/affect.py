# reflex_engine/logics/affect.py

MOODS = ["calm", "alert", "agitated", "neutral", "whimsical"]

class AffectEngine:
    def __init__(self):
        self.current_mood = "neutral"
        self.gradient = 0.5  # Scale of intensity from 0.0 to 1.0

    def set_mood(self, mood, intensity=0.5):
        if mood in MOODS:
            self.current_mood = mood
            self.gradient = intensity
        else:
            raise ValueError(f"Invalid mood: {mood}")

    def get_mood(self):
        return {"mood": self.current_mood, "gradient": self.gradient}

