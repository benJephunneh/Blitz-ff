import collections
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
      'block': '',
      'lot': '',
      'parcel': '',
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
  if len(em) < 3: # len should minimally be x@x
    return False

  # emailPattern = re.compile("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")
  # emailPattern = re.compile('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')
  emailPattern = re.compile("^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
  if emailPattern.search(em):
    return True
  return False

def isValidZipcode(zc: str) -> bool:
  zcPattern = re.compile('[0-9]{5}([ \-]\d{4})?')
  if zcPattern(zc):
    return True
  return False

def streetparse(row: dict):
  addressPattern = re.compile('([0-9]*)\s?(.*)')
  housePattern = re.compile('^[0-9]+$')
  a1 = addressPattern.findall(row['Street one'])
  a2 = addressPattern.findall(row['Street two'])
  # print(a1, a2)
  try:
    if isinstance(a1, collections.abc.Sequence):
      h1, s1 = a1[0]
    else:
      h1, s1 = a1
    if housePattern.search(h1):
      # print(h1)
      ho, st = h1, s1
    else:
      try:
        if isinstance(a2, collections.abc.Sequence):
          h2, s2 = a2[0]
        else:
          h2, s2 = a2
        if housePattern.search(h2):
          # print(h2)
          ho, st = h2, s2
        else:
          ho, st = h1, s1
      except:
        pass
  except:
    pass
  finally:
    return ho, st

def validateCustomer(c: dict) -> bool:
  if (len(c['firstname']) == 0 and \
      len(c['lastname']) == 0 and \
      len(c['companyname']) == 0) or \
      len(c['phone']) not in [7, 10] or \
      not isValidEmail(c['email']):
     return False
  return True

def validateLocation(l: dict) -> bool:
  if (len(l['house']) == 0 and len(l['street']) == 0 and len(l['city']) == 0) and \
     (len(l['house']) == 0 and len(l['street']) == 0 and len(l['zipcode']) == 0) and \
     (len(l['block']) == 0 and len(l['lot']) == 0 and len(l['street']) == 0 and len(l['city']) == 0) and \
     (len(l['block']) == 0 and len(l['lot']) == 0 and len(l['street']) == 0 and len(l['zipcode']) == 0) and \
      len(l['parcel']) == 0 and \
      not isValidZipcode(l.zipcode):
    return False
  return True

def customerExists(cl: list, c: dict):
  return c in cl

def locationExists(ll: list, l: dict):
  for e in ll:
    if e == l:
      return True

  return False

  # it = iter((ii, el) for ii, el in enumerate(ll) \
  #   if el['house'] == l['house'] and \
  #      el['street'] == l['street'] and \
  #      el['city'] == l['city'] and \
  #      el['zipcode'] == l['zipcode'] and \
  #      el['block'] == l['block'] and \
  #      el['lot'] == l['lot'] and \
  #      el['parcel'] == l['parcel'])

  # return next(it, (None, None))

# def newCustomer(row: dict):
#   customerData, _ = rowparse(row).values()
#   return Customer(customerData)

# def newCustomerList(data: list):
#   return CustomerList(data)
