# scripts/remove_id1_from_half_smash.py

updated_lines = []
file_path = "uZen/smash/half_smash.js"

try:
    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    for line in lines:
        if 'const [DI, id1] = diit.split' in line:
            updated_lines.append("const [DI] = diit.split('-');\n")
        elif 'ID1: id1' in line:
            continue  # Skip this line
        else:
            updated_lines.append(line)

    with open(file_path, 'w', encoding='utf-8') as file:
        file.writelines(updated_lines)

    print("✅ Script updated successfully.")
except Exception as e:
    print(f"❌ Error: {str(e)}")

