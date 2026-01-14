import json

# Initialize an empty dictionary
data = {}

# Dynamically add fields
data['id'] = 1
data['name'] = 'Item A'
data['tags'] = ['dynamic', 'python']

data['id'] = 2
data['name'] = 'Item B'
data['tags'] = ['dynamic', 'python']

# Create JSON string
json_string = json.dumps(data, indent=4)
print(json_string)
