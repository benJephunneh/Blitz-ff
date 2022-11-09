class Customer(dict):
  def __init__(self, fieldnames: list):
    self.fieldnames = fieldnames
    for fn in fieldnames:
      self[fn] = ''
    self['userId'] = 1 # 1 == benJephunneh's User entry.  Need importation to create link.
    return super().__init__()

  def __setitem__(self, __key: str, __value) -> None:
    if __key not in self.fieldnames:
      raise KeyError(__key)
    else:
      return super().__setitem__(__key, __value)

  def __repr__(self) -> str:
    return super().__repr__()

  def __str__(self) -> str:
    return f"{self['firstname']} {self['lastname']}\n{self['displayname']}\n{self['email']}, {self['phone']}\n"

  def __eq__(self, __o: object) -> bool:
    return super().__eq__(__o)

  def setCustomer(self, row: dict):
    self['firstname'] = row['First name']
    self['lastname'] = row['Last name']
    self['displayname'] = f"{self['firstname']} {self['lastname']}"
    self['companyname'] = row['Company name']
    self['email'] = row['Email']
    self['phone'] = \
      row['Office phone'] if len(row['Office phone']) in [7, 10] \
        else row['Mobile phone'] if len(row['Mobile phone']) in [7, 10] \
          else row['Home phone']

# def createCustomerList():
#   customers = [dict.fromkeys(customerFieldnames)]
#   return customers
#end createCustomerList


def customerExists(email: str, customers: list):
  index = None
  it = iter((index, c) for index, c in enumerate(customers) if c['Email'] == email)
  return next(it, (None, None))
#end customerExists


def makeCustomer(row: dict, phones: list, locations: list):
  return {
    'firstname': row['Firstname'],
    'lastname': row['Last name'],
    'companyname': row['Company name'],
    'email': row['Email'],
    'phones': locations,
    'locations': locations,
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


def makeCustomers(row: dict, phones: list, newLocations: list, customers: list):
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

