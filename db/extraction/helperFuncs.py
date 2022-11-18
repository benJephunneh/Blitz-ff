import re
from typing import Iterator
from collections.abc import MutableSequence

def rowparse(row: dict):
  fn = row['First name']
  ln = row['Last name']
  cn = row['Company name']
  pr = True if row['Primary?'] == 'yes' else False
  ph = phoneparse(row)
  em = row['Email']
  ho, st = streetparse(row)
  ci = row['City']
  fl = 'FL'
  zi = row['Postal code']
  no = row['Tags']

  if ((fn == '' and ln == '' and cn == '') or
      ph == '' or
      not isValidEmail(em)):
    raise TypeError(f'Insufficient data to create customer <row {row["ID"]}>.')

  return {
    'customer': {
      'firstname': fn,
      'lastname': ln,
      'companyname': cn,
      'phone': ph,
      'email': em,
    },
    'location': {
      'house': ho,
      'street': st,
      'city': ci,
      'state': fl,
      'zipcode': zi,
      'primary': pr,
      'notes': no, # These seem to all be location notes.
    }
  }

def phoneparse(row: dict):
  # Prioritized as follows:
  #   1. Office phone
  #   2. Mobile phone
  #   3. Home phone

  ph = row['Office phone'] if len(row['Office phone']) in [7, 10] \
        else row['Mobile phone'] if len(row['Mobile phone']) in [7, 10] \
          else row['Home phone'] if len(row['Home phone']) in [0, 7, 10] \
            else ''
  return ph

def isValidEmail(em: str) -> bool:
  if len(em) < 6: # len should minimally be a@a.co
    return False

  # emailPattern = re.compile("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")
  # emailPattern = re.compile('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')
  emailPattern = re.compile("^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
  if emailPattern.search(em):
    return True

  return False

def streetparse(row: dict):
  addressPattern = re.compile('(\d*)\s+(.*)')
  ret = addressPattern.findall(row['Street one'])
  try:
    ho, st = ret[0]
    if len(ho) == 0 and len(st) == 0:
      ret = addressPattern.findall(row['Street two'])
      try:
        ho, st = ret[0]
      except:
        ho, st = ('', '')
  except:
    ho, st = ('', '')

  return (ho, st)

def customerExists(cl: list, c: dict):
  return c in cl

# def newCustomer(row: dict):
#   customerData, _ = rowparse(row).values()
#   return Customer(customerData)

# def newCustomerList(data: list):
#   return CustomerList(data)
