import json
import os

def load_json(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading {filepath}: {e}")
        return None

def get_keys(data, prefix=""):
    keys = set()
    if isinstance(data, dict):
        for k, v in data.items():
            new_prefix = f"{prefix}.{k}" if prefix else k
            keys.add(new_prefix)
            keys.update(get_keys(v, new_prefix))
    elif isinstance(data, list):
        # For lists, we just check if it's a list of objects or strings
        # If it's a list of objects, we might want to check keys of the first object as a sample
        # But for strict key parity in translation files, usually lists should match in length or structure
        # For now, let's just treat the list itself as a leaf node key
        pass
    return keys

def compare_keys(base_file, target_file):
    print(f"Comparing {os.path.basename(target_file)} with {os.path.basename(base_file)}...")
    base_data = load_json(base_file)
    target_data = load_json(target_file)

    if not base_data or not target_data:
        return False

    base_keys = get_keys(base_data)
    target_keys = get_keys(target_data)

    missing_keys = base_keys - target_keys
    extra_keys = target_keys - base_keys

    if missing_keys:
        print(f"❌ Missing keys in {os.path.basename(target_file)}:")
        for k in sorted(missing_keys):
            print(f"  - {k}")
    
    if extra_keys:
        print(f"⚠️ Extra keys in {os.path.basename(target_file)} (might be obsolete):")
        for k in sorted(extra_keys):
            print(f"  - {k}")

    if not missing_keys and not extra_keys:
        print(f"✅ {os.path.basename(target_file)} matches {os.path.basename(base_file)} structure perfectly.")
        return True
    else:
        return False

def main():
    base_dir = "/home/dude/FrostyLabs/frostylabs_landing_v2/messages"
    en_file = os.path.join(base_dir, "en.json")
    
    languages = ["es.json", "fr.json", "ja.json", "ko.json", "zh.json"]
    
    all_passed = True
    for lang in languages:
        target_file = os.path.join(base_dir, lang)
        if os.path.exists(target_file):
            if not compare_keys(en_file, target_file):
                all_passed = False
        else:
            print(f"❌ File not found: {target_file}")
            all_passed = False
        print("-" * 30)

    if all_passed:
        print("\n🎉 All translation files match the English structure!")
    else:
        print("\n⚠️ Some translation files have discrepancies.")

if __name__ == "__main__":
    main()
