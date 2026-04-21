import os
import re

files = [
    'about.html', 'best-time.html', 'canter-safari.html', 
    'guide.html', 'index.html', 'jeep.html', 
    'resort.html', 'service.html', 'things-to-do.html', 'zones.html'
]

nav_template = """<ul class="nav-links">
                <li><a href="index.html"{index_class}>Home</a></li>
                <li class="dropdown">
                    <a href="about.html"{about_class}>About <i class="fa-solid fa-chevron-down"></i></a>
                    <ul class="dropdown-menu">
                        <li><a href="about.html">About Jim Corbett</a></li>
                        <li><a href="best-time.html">Best Time to Visit</a></li>
                        <li><a href="service.html">Our Services</a></li>
                    </ul>
                </li>
                <li class="dropdown">
                    <a href="jeep.html"{safari_class}>Safari Booking <i class="fa-solid fa-chevron-down"></i></a>
                    <ul class="dropdown-menu">
                        <li><a href="jeep.html">Jeep Safari</a></li>
                        <li><a href="canter-safari.html">Canter Safari</a></li>
                    </ul>
                </li>
                <li><a href="zones.html"{zones_class}>Zones</a></li>
                <li><a href="resort.html"{resort_class}>Resorts</a></li>
                <li><a href="index.html#packages">Packages</a></li>
                <li class="dropdown">
                    <a href="#"{explore_class}>Explore <i class="fa-solid fa-chevron-down"></i></a>
                    <ul class="dropdown-menu">
                        <li><a href="things-to-do.html">Things to Do</a></li>
                        <li><a href="guide.html">Travel Guide</a></li>
                    </ul>
                </li>
            </ul>"""

active_mappings = {
    'index.html': 'index_class',
    'about.html': 'about_class',
    'best-time.html': 'about_class',
    'service.html': 'about_class',
    'jeep.html': 'safari_class',
    'canter-safari.html': 'safari_class',
    'zones.html': 'zones_class',
    'resort.html': 'resort_class',
    'things-to-do.html': 'explore_class',
    'guide.html': 'explore_class'
}

def get_replacement(filename):
    kwargs = {
        'index_class': '',
        'about_class': '',
        'safari_class': '',
        'zones_class': '',
        'resort_class': '',
        'explore_class': ''
    }
    if filename in active_mappings:
        kwargs[active_mappings[filename]] = ' class="active"'
    
    return nav_template.format(**kwargs)

# Regex to match <ul class="nav-links"> ... matching </ul>
import re

for filename in files:
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Simple replace by splitting or regex. 
    # Since we know the structure has exactly 3 inner <ul> elements for dropdowns:
    # A regex might be complex, so let's do a simple string search.
    start_str = '<ul class="nav-links">'
    start_idx = content.find(start_str)
    
    if start_idx != -1:
        # find the end </ul> by counting open and close
        open_count = 0
        end_idx = -1
        i = start_idx
        while i < len(content):
            if content[i:].startswith('<ul'):
                open_count += 1
                i += 3
            elif content[i:].startswith('</ul'):
                open_count -= 1
                if open_count == 0:
                    end_idx = i + 5 # include </ul>
                    break
                i += 4
            else:
                i += 1
        
        if end_idx != -1:
            replacement = get_replacement(filename)
            new_content = content[:start_idx] + replacement + content[end_idx:]
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print("Updated", filename)
        else:
            print("Could not find matching </ul> for", filename)
    else:
        print("Could not find <ul class=\"nav-links\"> in", filename)
