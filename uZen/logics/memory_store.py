import json
MEMORY_PATH = "reflex_engine/data/memory_store.json"

class MemoryStore:
    def __init__(self):
        self.data = {}

    def save(self, agent_id, memory):
        self.data[agent_id] = memory
        with open(MEMORY_PATH, 'w') as f:
            json.dump(self.data, f, indent=2)

    def load(self, agent_id):
        try:
            with open(MEMORY_PATH, 'r') as f:
                self.data = json.load(f)
            return self.data.get(agent_id, {})
        except FileNotFoundError:
            return {}

