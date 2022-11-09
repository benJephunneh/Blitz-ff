class Location(dict):
  def __init__(self, fieldnames: list):
    self.fieldnames = fieldnames
    for f in fieldnames:
      self[f] = ''
    self['state'] = 'FL'
    return super().__init__()

  def __setitem__(self, __key: str, __value) -> None:
    if __key not in self.fieldnames:
      raise KeyError(__key)
    else:
      return super().__setitem__(__key, __value)

  def __repr__(self) -> str:
    return super().__repr__()

  def __str__(self):
    return f"{self['address1']} {self['address2']}\n{self['city']}, {self['state']}  {self['zipcode']}"

  def __eq__(self, location):
    if (self['zipcode'] == location['zipcode'] and
        self['city'] == location['city'] and
       (self['address1'] == location['address1'] or
        self['address1'] == location['address2'] or
        self['address2'] == location['address1'] or
        self['address2'] == location['address2'] or
       (self['lot'] == location['lot'] and # or?
        self['block'] == location['block']) or
        self['parcel'] == location['parcel'])):
      return True
    return False

  def setRow(self, row: dict):
    self['address1'] = row['Street one']
    self['address2'] = row['Street two']
    self['city'] = row['City']
    self['zipcode'] = row['Postal code']
    self['primary'] = True if row['Primary?'] == 'yes' else False
#end Location class

