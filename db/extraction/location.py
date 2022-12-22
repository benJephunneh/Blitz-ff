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
  #   return f"{self.get('address1')} {self.get('address2')}\n{self.get('city')}, {self.get('state')}  {self.get('zipcode')}"

  def __eq__(self, location):
    if (self.get('street') == location.get('street') and len(self.get('street')) > 0) and \
       (self.get('city') == location.get('city') and len(self.get('city')) > 0) and \
      ((self.get('house') == location.get('house') and len(self.get('house')) > 0) or
      ((self.get('block') == location.get('block') and len(self.get('block')) > 0) and
       (self.get('lot') == location.get('lot') and len(self.get('lot')) > 0)) or
       (self.get('parcel') == location.get('parcel') and len(self.get('parcel')) > 0)):
       return True
    return False
    # if self.get("parcel") == location.get("parcel") or \
    #   (self.get("zipcode") == location.get("zipcode") and \
    #    self.get("city") == location.get("city") and \
    #    self.get("street") == location.get("street") and \
    #   (self.get("house") == location.get("house") or \
    #   (self.get("block") == location.get("block") and \
    #    self.get("lot") == location.get("lot")))):
    #   return True
    # return False

  def setLocation(self, row: dict):
    addressPattern = re.compile('(?P<house>\d*)\s+(?P<street>.*)')
    ret = addressPattern.findall(row['Street one'])
    house, street = ret[0]
    if len(house) > 0 and len(street) > 0:
      self["house"] = house
      self["street"] = street
    else:
      ret = addressPattern.findall(row['Street two'])
      house, street = ret[0]
      if len(house) > 0 and len(street) > 0:
        self["house"] = house
        self["street"] = street

    self["city"] = row['City']
    self["zipcode"] = row['Postal code']
    self["primary"] = True if row['Primary?'] == 'yes' else False

def locationExists(location: Location, locations: list[Location]):
  index = None
  it = iter(((index, l) for index, l in enumerate(locations)), location)
  return next(it, (None, None))
#end customerExists
#end Location class

