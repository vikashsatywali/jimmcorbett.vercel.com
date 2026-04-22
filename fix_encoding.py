import os
import glob

replacements = {
    "â‚¹": "₹",
    "â€“": "–",
    "â€™": "’",
    "â€œ": "“",
    "â€": "”",
    "â€”": "—"
}

html_files = glob.glob("c:/Users/HP/OneDrive/Desktop/ukcorbett/**/*.html", recursive=True)

for file_path in html_files:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        for wrong, correct in replacements.items():
            content = content.replace(wrong, correct)
        
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Fixed {file_path}")
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
