
# XMFB Agent Manifest

This registry defines all μZen agents used within the XMFB Reflex Engine and surface protocol.

## Locked Core Agents

These agents are embedded into core backend and frontend logic. Their identities must remain unchanged.

| Agent Code | Delta | Agent Name     | Functionality                      |
|------------|-------|----------------|------------------------------------|
| ZBLD.Δee   | Δee   | ZeldaBuilder   | Issues `%smash-tag:½`              |
| DRWN.Δfx   | Δfx   | DungeonReader  | Validates cam presence / reflex ID |

## Notes

- `%smash-tag:½` is never displayed; it is split across agents
- Agents return to service after alignment is complete
- These names follow a 1980s arcade root + μZen delta code format
