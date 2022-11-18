from location import Location as L
import helperFuncs as hf

class LocationList(list):
  userId: 1

  def __init__(self):
    super(LocationList, self).__init__()

  def append(self, location) -> bool:
    if not isinstance(location, L):
      return False
    if hf.locationExists(self, location):
      return False
    super().append(location)
    return True
