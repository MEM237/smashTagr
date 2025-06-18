# reflex_engine/agents/tmpl.py

class TMPL:
    def __init__(self):
        self.history = {
            "feed_sigs": set(),
            "cmids": set(),
            "icons": set()
        }

    def check_reuse(self, tag):
        warnings = []

        if tag["feed_sig"] in self.history["feed_sigs"]:
            warnings.append(f"⚠️ FeedSig reuse detected: {tag['feed_sig']}")

        if tag["cmid"] in self.history["cmids"]:
            warnings.append(f"⚠️ CMID reuse detected: {tag['cmid']}")

        if tag["icon"] in self.history["icons"]:
            warnings.append(f"⚠️ Icon reuse detected: {tag['icon']}")

        # Log current tag to history
        self.history["feed_sigs"].add(tag["feed_sig"])
        self.history["cmids"].add(tag["cmid"])
        self.history["icons"].add(tag["icon"])

        if not warnings:
            return ["✅ Tag is clean."]
        return warnings

# ✅ This part must be outside the class
if __name__ == "__main__":
    tmpl = TMPL()
    test_tag = {
        "cmid": "Cranjis McBasketball",
        "icon": "🟨 PixelIcon_472",
        "feed_sig": "a1b2c3d4feed"
    }

    print("🔍 First pass:", tmpl.check_reuse(test_tag))
    print("🔁 Second pass:", tmpl.check_reuse(test_tag))
