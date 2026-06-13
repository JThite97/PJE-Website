import pandas as pd
import json

excel_path = r'C:\Users\12895\Downloads\g.xlsx'
json_path = r'c:\Users\12895\OneDrive\Desktop\Antigravity Test\PJE\src\data\catalog.json'

df = pd.read_excel(excel_path)
excel_products_raw = df['Unnamed: 4'].dropna().tolist()
excel_products_raw = [str(x).strip() for x in excel_products_raw if str(x).strip().upper() != 'PRODUCTS']

with open(json_path, 'r', encoding='utf-8') as f:
    catalog = json.load(f)

website_products_raw = []
for category, items in catalog.get('Shell', {}).items():
    if isinstance(items, dict):
        website_products_raw.extend(list(items.keys()))

def normalize(name):
    n = name.lower().strip()
    if n.startswith('shell '):
        n = n[6:].strip()
    return n

excel_dict = {normalize(p): p for p in excel_products_raw}
website_dict = {normalize(p): p for p in website_products_raw}

excel_norm_set = set(excel_dict.keys())
website_norm_set = set(website_dict.keys())

missing_in_website = excel_norm_set - website_norm_set
missing_in_excel = website_norm_set - excel_norm_set

print("=== Missing in Website (In Excel, but not on Website) ===")
for p in sorted(missing_in_website):
    print("- " + excel_dict[p])

print("\n=== Extra on Website (On Website, but not in Excel) ===")
for p in sorted(missing_in_excel):
    print("- " + website_dict[p])
