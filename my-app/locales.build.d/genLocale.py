#!/bin/env python

import yaml
import json
import re
import sys
from argparse import ArgumentParser

url_re = re.compile(r'^(?:http|ftp)s?://')


def parse_args(args):
    usage = """
          genLocale.py file.yaml
          Extract strings from CMS yaml file and save them in json
          """
    parser = ArgumentParser(usage=usage)
    parser.add_argument("yamlfile", help="the YAML file used to extract strings")
    parser.add_argument("-o", dest="output", help="output JSON file")
    opts = parser.parse_args(args)
    return opts


def parse_list(l):
  if isinstance(l, list):
    for i in l:
      if isinstance(i, dict):
        parse_dict(i)
      elif isinstance(i, list):
        parse_list(i)
      elif isinstance(i, str) and len(i):
        add_key(i)


def parse_dict(d):
  if isinstance(d, dict):
    for k, v in d.items():
      if isinstance(v, dict):
        parse_dict(v)
      elif isinstance(v, list):
        parse_list(v)
      elif isinstance(v, str) and is_valid(v):
        add_key(v)


def is_valid(s):
  if not len(s):
    return False
  if s.startswith('public/'):
    return False
  if re.match(url_re, s):
    return False
  return True


def add_key(k):
  if k not in new_locale:
    new_locale[k] = k.replace('{', "{'{'}").replace('}', "{'}'}").replace('$', "{'$'}").replace('|', "{'|'}").replace('@', "{'@'}")


if __name__ == "__main__":
  opts = parse_args(sys.argv[1:])

  with open(opts.yamlfile, 'r') as f:
    nuxt_content = yaml.safe_load(f)
  
  """
  try:
    with open('flock.json', 'r') as f:
      old_locale = json.load(f)
  except FileNotFoundError:
    old_locale = {}
  """
  new_locale = {}
  
  parse_dict(nuxt_content)
  
  if opts.output:
    with open(opts.output, 'w') as f:
      json.dump(new_locale, f, indent=2, sort_keys=True)
  else:
      print(json.dumps(new_locale, indent=2, sort_keys=True))
