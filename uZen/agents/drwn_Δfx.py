from reflex_engine.logics.encr_flsh_modules import FLSH_Δdk

class DRWN_Δfx:
    def __init__(self, tag_pool: dict):
        self.enforcer = FLSH_Δdk(tag_pool)

    def enforce(self, tag_hash: str):
        return self.enforcer.flush_check(tag_hash)

    def force_flush(self, tag_hash: str):
        return self.enforcer.manual_flush(tag_hash)

