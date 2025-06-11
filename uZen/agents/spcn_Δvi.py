class SPCN_Δvi:
    def validate_union(self, tag_a, tag_b):
        return tag_a["entropy"] != tag_b["entropy"]
