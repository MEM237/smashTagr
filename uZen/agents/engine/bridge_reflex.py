import sys
import json

def handle_request(data):
    # Example: pretend to do validation or routing
    cmid = data.get("cmid", "unknown_user")
    agent = data.get("agent", "RDRS.aie")
    result = {
        "status": "ok",
        "agent": agent,
        "cmid": cmid,
        "validated": True
    }
    return result

if __name__ == "__main__":
    try:
        input_data = json.loads(sys.stdin.read())
        response = handle_request(input_data)
        print(json.dumps(response))
    except Exception as e:
        print(json.dumps({"status": "error", "message": str(e)}))
