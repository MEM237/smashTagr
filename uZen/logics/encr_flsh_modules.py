# ENCR_Δvn — Smash-tag Full Seal Fusion
# FLSH_Δdk — Reflex Flush Logic

import hashlib
import time
import json
import os

class ENCR_Δvn:
    def __init__(self):
        self.active_tags = {}

    def _hash_feed_sig(self, cam_entropy: str) -> str:
        return hashlib.sha256(cam_entropy.encode()).hexdigest()

    def compile(self, icon: str, cmid: str, cam_entropy: str) -> dict:
        feed_sig = self._hash_feed_sig(cam_entropy)
        full_tag = f"{icon}:{cmid}:{feed_sig}"
        full_hash = hashlib.sha256(full_tag.encode()).hexdigest()

        tag_record = {
            'icon': icon,
            'cmid': cmid,
            'feed_sig': feed_sig,
            'tag_hash': full_hash,
            'created_at': time.time(),
            'ttl': 900,
            'usage_count': 1,
            'status': 'active'
        }

        self.active_tags[full_hash] = tag_record
        return {
            'public_key': f"{icon} {cmid}",
            'private_tag': full_hash,
            'record': tag_record
        }

class FLSH_Δdk:
    def __init__(self, tag_pool: dict):
        self.tag_pool = tag_pool
        self.flushed = {}

    def _is_expired(self, tag: dict) -> bool:
        return (time.time() - tag['created_at']) > tag['ttl']

    def _log_flush(self, tag: dict):
        log_path = "reflex_engine/data/tag_log.json"
        os.makedirs(os.path.dirname(log_path), exist_ok=True)
        with open(log_path, "a") as f:
            f.write(json.dumps(tag) + "\n")

    def flush_check(self, full_hash: str) -> dict:
        tag = self.tag_pool.get(full_hash)
        if not tag:
            return {'status': 'invalid', 'reason': 'tag not found'}

        if self._is_expired(tag):
            tag['status'] = 'expired'
            self.flushed[full_hash] = tag
            self._log_flush(tag)
            del self.tag_pool[full_hash]
            return {'status': 'flushed', 'reason': 'TTL expired'}

        if tag['usage_count'] > 1:
            tag['status'] = 'reused'
            self.flushed[full_hash] = tag
            self._log_flush(tag)
            del self.tag_pool[full_hash]
            return {'status': 'flushed', 'reason': 'tag reused'}

        return {'status': 'active', 'reason': 'valid tag'}

    def manual_flush(self, full_hash: str) -> dict:
        if full_hash in self.tag_pool:
            tag = self.tag_pool.pop(full_hash)
            tag['status'] = 'manually flushed'
            self.flushed[full_hash] = tag
            self._log_flush(tag)
            return {'status': 'flushed', 'reason': 'manual'}
        return {'status': 'invalid', 'reason': 'not in pool'}