import os
import glob
import re

files = glob.glob('*.html')
for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace About
    content = re.sub(r'<a href="about\.html">About <i class="fa-solid fa-chevron-down"></i></a>', r'<a href="#">About <i class="fa-solid fa-chevron-down"></i></a>', content)
    content = re.sub(r'<a href="about\.html" class="active">About <i class="fa-solid fa-chevron-down"></i></a>', r'<a href="#" class="active">About <i class="fa-solid fa-chevron-down"></i></a>', content)

    # Replace Safari Booking
    content = re.sub(r'<a href="jeep\.html">Safari Booking <i class="fa-solid fa-chevron-down"></i></a>', r'<a href="#">Safari Booking <i class="fa-solid fa-chevron-down"></i></a>', content)
    content = re.sub(r'<a href="jeep\.html" class="active">Safari Booking <i class="fa-solid fa-chevron-down"></i></a>', r'<a href="#" class="active">Safari Booking <i class="fa-solid fa-chevron-down"></i></a>', content)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print(f"Updated {len(files)} files.")
