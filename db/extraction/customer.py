from csv import DictReader
import location as l
import pandas as pd
import helperFuncs as hf

class Customer(dict):
  # firstname = ''
  # lastname = ''
  # companyname = ''
  # email = ''
  # phone = ''
  # locations: list
  # Consider, instead of creating customer objects with attached data, Prisma doesn't need that level of organization.
  # Create customer data.
  # Create location data, with customerId (for Prisma).
  # Create invoices, etc.

  def __init__(self, row: dict):
    try:
      customer, _ = hf.rowparse(row).values()
      # fn, ln, cn, ph, em = customer.values()
      # self.firstname = fn
      # self.lastname = ln
      # self.companyname = cn
      # self.phone = ph
      # self.email = em
      return super(Customer, self).__init__(customer)
    except:
      raise TypeError(f'Insufficient data to create customer <row {row["ID"]}>.')

  # def __setitem__(self, __key: str, __value) -> None:
  #   # if __key not in self.fieldnames:
  #   if __key not in self._data:
  #     raise KeyError(__key)
  #   else:
  #     return super().__setitem__(__key, __value)

  # def __repr__(self) -> str:
  #   return f"<{self.__class__.__name__}, {self.firstname} {self.lastname}>"

  # def __str__(self) -> str:
  #   fn, ln, _, ph, em = self._dict.values()
  #   if len(ph) == 7:
  #     return f"{fn} {ln}\n{ph[0:3]}.{ph[3:]}\n{em}"
  #   return f"{fn} {ln}\n({ph[0:3]}) {ph[3:6]}.{ph[6:]}\n{em}"

  def __eq__(self, c): # -> bool
    if not isinstance(c, Customer):
      return False
    return self.get('email') == c.get('email')
    # return selfEmail == cEmail
    # if self.email == c.email: # and
    #   return True
    # return False

  #   return super().__eq__(__o)

  def setCustomer(self, row: dict):
    self['firstname'] = row['First name']
    self['lastname'] = row['Last name']
    # self['displayname'] = f"{self['firstname']} {self['lastname']}"
    self['companyname'] = row['Company name']
    self['email'] = row['Email']
    self['phone'] = \
      row['Office phone'] if len(row['Office phone']) in [7, 10] \
        else row['Mobile phone'] if len(row['Mobile phone']) in [7, 10] \
          else row['Home phone']

  # def addLocation(self, fieldnames: list[str], row: dict):
  #   loc = l.Location(fieldnames)
  #   loc.setLocation(row)
  #   self.locations.append(loc)

  # def locationExists(self, location):
  #   it = iter((index, loc) for index, loc in enumerate(self.locations) if loc == location)
  #   return next(it, (None, None))

# def createCustomerList():
#   customers = [dict.fromkeys(customerFieldnames)]
#   return customers
#end createCustomerList


# def customerExists(email: str, customers: list[Customer]):
#   index = None
#   it = iter((index, c) for index, c in enumerate(customers) if c['Email'] == email)
#   return next(it, (None, None))
#end customerExists

def makeCustomer(row: dict):
  fn = row['First name']
  ln = row['Last name']
  cn = row['Company name']
  em = row['Email']

  # make customer
  # return customer
  return {
    'firstname': fn,
    'lastname': ln,
    'companyname': cn,
    'email': em,
    # 'phones': phones,
    # 'locations': locations,
  }
#end makeCustomer


def fillCustomerBlanks(row: dict, customer: dict):
  if not customer['firstname']:
    customer['firstname'] = row['First name']
  if not customer['lastname']:
    customer['lastname'] = row['Last name']
  if not customer['companyname']:
    customer['companyname'] = row['Company name']

  return customer
#end fillCustomerBlanks


def makeCustomerList(customerCsvFile: str):
  customerList = []

  with open(customerCsvFile, 'r') as readFile:
    csvDr = DictReader(readFile)

    for row in csvDr:
      c = Customer()
      c.setCustomer(row)

  email = row['Email'] if row['Email'] else None
  if not email: # Without an email, cannot identify unique customer:
    return customers

  index, c = customerExists(email, customers)
  if not index: # No customer match:
    newCustomer = makeCustomer(row, phones, locations)
    customers.append(newCustomer)
    return customers
  else: # A customer already exists:
    fn = row['Firstname']
    ln = row['Last name']
    cn = row['Company name']

    c['firstname'] = fn if not c['firstname'] else c['firstname']
    c['lastname'] = fn if not c['lastname'] else c['lastname']
    c['companyname'] = fn if not c['companyname'] else c['companyname']
    c['email'] = fn if not c['email'] else c['email']

    locations = c['locations']
    for l in locations:
      customers[index] = c

  return customers
#end makeCustomer

