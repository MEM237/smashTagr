# reflex_engine/agents/feed_sig.py

import hashlib
import time
import os

class FeedSig:
    def generate_signature(self, input_data=None):
        # Simulate entropy if no cam frame available
        if not input_data:
            input_data = f"{time.time()}-{os.urandom(16)}"
        if isinstance(input_data, str):
            input_data = input_data.encode('utf-8')
        return hashlib.sha256(input_data).hexdigest()

# Test the logic directly
if __name__ == "__main__":
    fs = FeedSig()
    print("🔐 FeedSig:", fs.generate_signature())
