# reflex_engine/agents/drwn.py

class DRWN:
    def evaluate_tag(self, tag, reuse_warnings):
        if not tag.get("feed_sig"):
            return {
                "status": "failure",
                "reason": "Missing FeedSig — session invalid"
            }

        if reuse_warnings and any("⚠️" in warning for warning in reuse_warnings):
            return {
                "status": "failure",
                "reason": "Presence violation — reuse detected",
                "details": reuse_warnings
            }

        return {
            "status": "clear",
            "reason": "Tag validated"
        }

# 🔽 TEST STUB (outside the class!)
if __name__ == "__main__":
    drwn = DRWN()

    fake_tag = {
        "cmid": "Cranjis McBasketball",
        "icon": "🟨 PixelIcon_472",
        "feed_sig": ""
    }

    print("❌ Missing FeedSig:", drwn.evaluate_tag(fake_tag, []))

    reused_tag = {
        "cmid": "Cranjis McBasketball",
        "icon": "🟨 PixelIcon_472",
        "feed_sig": "a1b2c3d4feed"
    }

    warnings = [
        "⚠️ FeedSig reuse detected: a1b2c3d4feed"
    ]

    print("🚨 Reuse Detected:", drwn.evaluate_tag(reused_tag, warnings))


