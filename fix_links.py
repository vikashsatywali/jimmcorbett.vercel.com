import os
import glob

html_files = glob.glob('c:/Users/HP/OneDrive/Desktop/ukcorbett/*.html')

replacements = {
    'dhikala-zone.html': 'dhikala.html',
    'bijrani-zone.html': 'bijrani.html',
    'jhirna-zone.html': 'jhirna.html',
    'dhela-zone.html': 'dhela.html',
    'durga-devi-zone.html': 'durgadevi.html',
    'garjiya-zone.html': 'garjiya.html',
    'sitabani-zone.html': 'sitabani.html',
    'href="#">Zones Overview</a>': 'href="zones.html">Zones Overview</a>',
    'href="index.html#zones">Zones Overview</a>': 'href="zones.html">Zones Overview</a>'
}

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    modified = False
    for old_str, new_str in replacements.items():
        if old_str in content:
            content = content.replace(old_str, new_str)
            modified = True
            
    if modified:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated links in {os.path.basename(file_path)}")

print("Done linking inner pages to the site.")
