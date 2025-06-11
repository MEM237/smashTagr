import hashlib

class MSPC_Δfe:
    def generate_feedsig(self, entropy):
        return hashlib.sha256(entropy.encode()).hexdigest()[:16]
