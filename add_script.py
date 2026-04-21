import os
import glob

html_files = glob.glob('*.html')

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '<script src="nav.js"></script>' not in content:
        # Replace </body> with the script and then </body>
        content = content.replace('</body>', '<script src="nav.js"></script>\n</body>')
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file}")
