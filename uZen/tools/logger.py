from datetime import datetime

class ReflexLogger:
    def __init__(self):
        self.logs = []

    def log(self, agent, action, tag="N/A", mood="-", level="INFO"):
        entry = {
            "time": datetime.now().isoformat(),
            "agent": agent,
            "action": action,
            "tag": tag,
            "mood": mood,
            "level": level
        }
        self.logs.append(entry)
        print(f"[{entry['time']}] {agent}: {action} ({mood})")

    def export(self):
        return self.logs

