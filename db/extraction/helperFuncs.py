import re
from typing import Iterator
from customer import Customer
from collections.abc import MutableSequence

def rowparse(row: dict):
  fn = row['First name']
  ln = row['Last name']
  cn = row['Company name']
  pr = True if row['Primary?'] == 'yes' else False
  ph = phoneparse(row)
  em = row['Email']

  addressPattern = re.compile('(\d*)\s+(.*)')
  ret = addressPattern.findall(row['Street one'])
  ho, st = ret[0]
  if len(ho) == 0 and len(st) == 0:
    ret = addressPattern.findall(row['Street two'])
    ho, st = ret[0]

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

def newCustomer(row: dict):
  customerData, _ = rowparse(row).values()
  return Customer(customerData)

def newCustomerList(data: list):
  return CustomerList(data)

class CustomerList(list):
  userId: 1

  def __init__(self, customer):
    super(CustomerList, self).__init__(customer)

  # def __repr__(self) -> str:
  #   return f"<{self.__class__.__name__} {self._list}>"

  # def __iter__(self) -> Iterator[Customer]:
  #   return super().__iter__()

  # def __setitem__(self, index, customer: Customer):
  #   super().__setitem__(index, customer)

  # def __getitem__(self, index):
  #   return self._list[index]

  # def __delitem__(self, index):
  #   del self._list[index]

  # def __len__(self):
  #   return len(self._list)

  # def insert(self, index, customer: Customer):
  #   super().insert(index, customer)

  # def append(self, customer: Customer):
  #   super().append(customer)

  # def addCustomer(customer: Customer):
  #   if customerExists(customer) return True

