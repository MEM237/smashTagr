# reflex_engine/logics/threat_watch.py

import time

class ReflexBreach(Exception):
    pass

class ThreatWatch:
    def __init__(self):
        self.feed_history = {}

    def register_feed(self, user_id, feed_sig):
        timestamp = time.time()
        last = self.feed_history.get(user_id)

        if last and last["sig"] == feed_sig:
            if timestamp - last["time"] < 10:  # seconds
                raise ReflexBreach("Replay or spoof detected.")

        self.feed_history[user_id] = {"sig": feed_sig, "time": timestamp}
        return True
