import os
import re

# Set your project directory (adjust if needed)
root_dir = "./"

# Define patterns to replace
replacements = {
    r'\bID0\b': 'DI',
    r'\bid0\b': 'DI',
    r'\bIDIT\b': 'DIIT',
    r'\bIDIT#\b': 'DIIT#',
    r'\bidit\b': 'diit',
    r'\bidit#\b': 'diit#'
}

# Track changed files
changed_files = []

# Function to apply replacements in a single file
def replace_in_file(filepath, replacements):
    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    original = content

    for pattern, repl in replacements.items():
        content = re.sub(pattern, repl, content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8', errors='ignore') as f:
            f.write(content)
        changed_files.append(filepath)

# Walk all files under root_dir
for subdir, dirs, files in os.walk(root_dir):
    if 'node_modules' in subdir or '__pycache__' in subdir:
        continue
    for file in files:
        if file.endswith(('.js', '.jsx', '.ts', '.tsx', '.py', '.json', 
'.txt')):
            full_path = os.path.join(subdir, file)
            replace_in_file(full_path, replacements)

# Summary
print("✅ Updated Files:")
for file in changed_files:
    print(" -", file)


