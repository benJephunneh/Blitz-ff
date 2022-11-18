import re
import helperFuncs as hf

class Location(dict):
  def __init__(self, row: dict):
    try:
      _, location = hf.rowparse(row).values()
      return super(Location, self).__init__(location)
    except:
      raise TypeError(f'Insufficient data to create location <row {row["ID"]}>.')

  # def __setitem__(self, __key: str, __value) -> None:
  #   if __key not in self.fieldnames:
  #     raise KeyError(__key)
  #   else:
  #     return super().__setitem__(__key, __value)

  # def __repr__(self) -> str:
  #   return super().__repr__()

  # def __str__(self):
  #   return f"{self['address1']} {self['address2']}\n{self['city']}, {self['state']}  {self['zipcode']}"

  def __eq__(self, location):
    if ((self['zipcode'] == location['zipcode'] and
        self['city'] == location['city'] and
        self['street'] == location['street']) and
       (self['house'] == location['house'] or
       (self['block'] == location['block'] and
        self['lot'] == location['lot'])) or
        self['parcel'] == location['parce']):
      return True
    return False

  def setLocation(self, row: dict):
    addressPattern = re.compile('(?P<house>\d*)\s+(?P<street>.*)')
    ret = addressPattern.findall(row['Street one'])
    house, street = ret[0]
    if len(house) > 0 and len(street) > 0:
      self['house'] = house
      self['street'] = street
    else:
      ret = addressPattern.findall(row['Street two'])
      house, street = ret[0]
      if len(house) > 0 and len(street) > 0:
        self['house'] = house
        self['street'] = street

    self['city'] = row['City']
    self['zipcode'] = row['Postal code']
    self['primary'] = True if row['Primary?'] == 'yes' else False

def locationExists(location: Location, locations: list[Location]):
  index = None
  it = iter(((index, l) for index, l in enumerate(locations)), location)
  return next(it, (None, None))
#end customerExists
#end Location class

