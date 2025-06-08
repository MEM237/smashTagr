# reflex_engine/agents/bldr.py

import hashlib
import time

class BLDR:
    def fuse_smash_tags(self, tagA, tagB):
        # Confirm matching presence logic
        if not all(k in tagA and k in tagB for k in ["cmid", "icon", "feed_sig"]):
            raise ValueError("Invalid half-tag structure")

        # Fusion: combine key components into one hash
        fusion_string = f"{tagA['feed_sig']}-{tagB['feed_sig']}-{tagA['icon']}-{tagB['icon']}"
        full_tag = hashlib.sha256(fusion_string.encode('utf-8')).hexdigest()

        return {
            "fusion_tag": full_tag,
            "participants": [tagA["cmid"], tagB["cmid"]],
            "timestamp": time.time()
        }

if __name__ == "__main__":
    b = BLDR()
    tagA = {
        "cmid": "Cranjis McBasketball",
        "icon": "🟨 PixelIcon_472",
        "feed_sig": "a1b2c3d4feed"
    }
    tagB = {
        "cmid": "Rufus McGuffin",
        "icon": "🟪 PixelIcon_007",
        "feed_sig": "f1e2d3c4beef"
    }
    fused = b.fuse_smash_tags(tagA, tagB)
    print("🤝 Full %smash-tag =", fused)

