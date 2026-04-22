import os

file_path = 'resort.html'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    'ðŸŒ¿': '🌿',
    'ðŸ •ï¸ ': '🛎️',
    'ðŸ’Ž': '💎',
    'ðŸ ¨': '🏨',
    'ðŸ‘‰': '👉',
    'ðŸ› ï¸ ': '🛏️',
    'ðŸŒŸ': '🌟',
    'ðŸ’°': '💰',
    'ðŸ“ž': '📞',
    'â­ ': '⭐'
}

for wrong, correct in replacements.items():
    content = content.replace(wrong, correct)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Replaced emojis in resort.html')
