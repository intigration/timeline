#!/bin/env python

import json
import glob

js_files = glob.glob("*.json")
merged_js = {}
for js_file in sorted(js_files):
  with open(js_file, 'r') as f:
    js = json.load(f)
  for k, v in js.items():
    if k not in merged_js:
      merged_js[k] = v if v else k

with open('../locales/en.json', 'w') as f:
  json.dump(merged_js, f, indent=2, sort_keys=False)
