import json
from location import Location as L
import helperFuncs as hf

class LocationList(list):
  userId: 1

  def __init__(self):
    super(LocationList, self).__init__()

  def append(self, location: L) -> bool:
    if not isinstance(location, L):
      print(f'Invalid location: <{location}>')
      return False

    if hf.locationExists(self, location):
      print('Location already in the list.')
      return False
    super().append(location)
    print('Location appended.')
    return True

  def toJson(self):
    return json.dumps(self, default=lambda o: o.__dict__)
