from customer import Customer as C
import helperFuncs as hf
import json

class CustomerList(list):
  userId: 1

  def __init__(self):
    super(CustomerList, self).__init__()

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

  def append(self, customer) -> bool:
    if not isinstance(customer, C):
      # raise TypeError('Items in list must be Customer objects')
      return False
    if hf.customerExists(self, customer):
      return False
    super().append(customer)
    return True

  # def addCustomer(customer: Customer):
  #   if customerExists(customer) return True #

  def toJson(self):
    return json.dumps(self, default=lambda o: o.__dict__)
