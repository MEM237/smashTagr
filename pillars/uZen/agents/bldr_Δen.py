import hashlib
import uuid
from datetime import datetime

class BLDR_Δen:
    def compile_union(self, tag_a, tag_b):
        # Create a unique session ID
        session_id = str(uuid.uuid4())

        # Combine entropies to form a hash
        combined_entropy = f"{tag_a['entropy']}{tag_b['entropy']}"
        entropy_hash = hashlib.sha256(combined_entropy.encode()).hexdigest()[:12]

        return {
            "session_id": session_id,
            "timestamp": datetime.utcnow().isoformat(),
            "participants": [tag_a["user_id"], tag_b["user_id"]],
            "cmids": [tag_a["cmid"], tag_b["cmid"]],
            "icons": [tag_a["icon"], tag_b["icon"]],
            "smash_tag": f"%{entropy_hash}"
        }
