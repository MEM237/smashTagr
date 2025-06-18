class ReflexAgent:
    def __init__(self, name, memory_limit=5):
        self.name = name
        self.memory = []
        self.memory_limit = memory_limit

    def remember(self, observation):
        self.memory.append(observation)
        if len(self.memory) > self.memory_limit:
            self.memory.pop(0)

    def recall(self):
        return list(self.memory)

    def react(self, stimulus):
        if stimulus in self.memory:
            return f"{self.name}: 👁️ Seen before — adjusting behavior."
        else:
            self.remember(stimulus)
            return f"{self.name}: 👋 New contact — storing observation."

    def __str__(self):
        return self.name


class ReflexCell:
    def __init__(self, row, col, tag=None, agent=None, state="empty"):
        self.position = (row, col)
        self.tag = tag
        self.agent = agent
        self.state = state

    def __repr__(self):
        return f"({self.position} | {self.state} | {self.agent or 'None'})"


class ReflexGrid:
    def __init__(self, size=3):
        self.size = size
        self.grid = [
            [ReflexCell(row, col) for col in range(size)]
            for row in range(size)
        ]
        self.local_cell = self.grid[0][0]
        self.local_cell.state = "active"
        self.local_cell.agent = ReflexAgent("YOU")

    def set_cell(self, row, col, tag=None, agent=None, state="stanby"):
        if 0 <= row < self.size and 0 <= col < self.size:
            cell = self.grid[row][col]
            cell.tag = tag
            cell.agent = agent
            cell.state = state
        else:
            raise ValueError("Grid coordinates out of bounds")

    def get_snapshot(self):
        return [
            [str(cell) for cell in row]
            for row in self.grid
        ]

    def print_grid(self):
        print("🔳 Reflex Grid Snapshot:")
        for row in self.get_snapshot():
            print(" | ".join(row))

    def scan_environment(self):
        print("\n🧠 Reflex Scan Report:")
        for row in range(self.size):
            for col in range(self.size):
                cell = self.grid[row][col]
                if cell.agent and cell.state != "empty":
                    neighbors = self._get_neighbors(row, col)
                    print(f"🔎 Agent at ({row}, {col}) — {cell.agent} [{cell.state}] sees:")
                    for n in neighbors:
                        if n.agent and n.state != "empty":
                            target_name = n.agent.name if hasattr(n.agent, "name") else str(n.agent)
                            if isinstance(cell.agent, ReflexAgent):
                                reaction = cell.agent.react(target_name)
                                print(f"    - ({n.position}) — {target_name} [{n.state}]: {reaction}")

    def check_mutual_presence(self):
        print("\n🔁 Mutual Presence Check (VTTX Trigger Logic):")
        visited = set()

        for row in range(self.size):
            for col in range(self.size):
                cell = self.grid[row][col]
                if not cell.agent or cell.state != "active":
                    continue

                neighbors = self._get_neighbors(row, col)
                for n in neighbors:
                    pair = tuple(sorted([str(cell.agent), str(n.agent or "None")]))
                    if (
                        n.agent
                        and n.state == "active"
                        and pair not in visited
                        and str(n.agent) != str(cell.agent)
                    ):
                        visited.add(pair)
                        print(f"✅ VTTX session initiated between {cell.agent} ↔ {n.agent}")

    def _get_neighbors(self, row, col):
        neighbors = []
        for r in range(row - 1, row + 2):
            for c in range(col - 1, col + 2):
                if (r == row and c == col) or r < 0 or c < 0 or r >= self.size or c >= self.size:
                    continue
                neighbors.append(self.grid[r][c])
        return neighbors


# 🧪 Test block
if __name__ == "__main__":
    rg = ReflexGrid()

    # Populate test agents
    rg.set_cell(0, 1, tag="tagA", agent=ReflexAgent("Agent A"), state="active")
    rg.set_cell(1, 1, tag="tagB", agent=ReflexAgent("Agent B"), state="active")
    rg.set_cell(2, 2, tag="tagC", agent=ReflexAgent("GhostBot"), state="offline")

    rg.print_grid()
    rg.scan_environment()
    rg.check_mutual_presence()

