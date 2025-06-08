class PRSR_Δgl:
    def interpret(self, sigA, sigB, session_flags, history_flags):
        response = []

        # Interpret A
        if session_flags['A'] and history_flags['A']:
            response.append(f"⚠️ A:{sigA} — active + historic reuse detected.")
        elif history_flags['A']:
            response.append(f"⚠️ A:{sigA} — historic reuse.")
        elif session_flags['A']:
            response.append(f"⚠️ A:{sigA} — intra-session reuse.")
        else:
            response.append(f"✅ A:{sigA} — clean.")

        # Interpret B
        if session_flags['B'] and history_flags['B']:
            response.append(f"⚠️ B:{sigB} — active + historic reuse detected.")
        elif history_flags['B']:
            response.append(f"⚠️ B:{sigB} — historic reuse.")
        elif session_flags['B']:
            response.append(f"⚠️ B:{sigB} — intra-session reuse.")
        else:
            response.append(f"✅ B:{sigB} — clean.")

        return response

