import json
import os

def load_json(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading {filepath}: {e}")
        return None

def find_identical_values(base_data, target_data, path=""):
    identical = []
    if isinstance(base_data, dict) and isinstance(target_data, dict):
        for k, v in base_data.items():
            if k in target_data:
                new_path = f"{path}.{k}" if path else k
                identical.extend(find_identical_values(v, target_data[k], new_path))
    elif isinstance(base_data, list) and isinstance(target_data, list):
        # For lists, we can't easily match by key, but we can check if values are identical strings
        for i, (base_item, target_item) in enumerate(zip(base_data, target_data)):
            new_path = f"{path}[{i}]"
            identical.extend(find_identical_values(base_item, target_item, new_path))
    elif isinstance(base_data, str) and isinstance(target_data, str):
        # Ignore short strings, numbers, or common proper names if possible, but for now just list all
        # We can filter out obvious ones like "GitHub", "Twitter", "FrostyLabs" later
        if base_data == target_data and len(base_data) > 2:
             # Heuristic: if it contains spaces, it's likely a sentence that needs translation
             # If it's a single word, it might be a brand name
             identical.append((path, base_data))
    
    return identical

def main():
    base_dir = "/home/dude/FrostyLabs/frostylabs_landing_v2/messages"
    en_file = os.path.join(base_dir, "en.json")
    es_file = os.path.join(base_dir, "es.json")
    
    print(f"Comparing {es_file} against {en_file} for identical values...")
    
    en_data = load_json(en_file)
    es_data = load_json(es_file)
    
    if en_data and es_data:
        identical_items = find_identical_values(en_data, es_data)
        
        print(f"Found {len(identical_items)} identical values:")
        for path, value in identical_items:
            # Filter out some likely false positives to reduce noise
            if value.lower() in ["github", "twitter", "frostylabs", "frostyflow", "openai", "anthropic", "google ai", "xai", "openrouter", "qwen", "next.js 15", "node.js 20+", "postgresql", "web3 auth", "drizzle", "thirdweb v5", "thirdweb vault", "aws nitro", "erc-721/1155", "gpt-5, gpt-4.1", "claude 4", "gemini 2.x", "grok-3", "docker", "kubernetes", "github actions", "prometheus", "aws/gcp", "react 19", "tailwind css", "shadcn/ui", "react flow", "framer motion", "thirdweb", "aes-256", "soc 2, iso", "gdpr", "soc 2 type ii"]:
                continue
            print(f"  - {path}: \"{value}\"")

if __name__ == "__main__":
    main()
