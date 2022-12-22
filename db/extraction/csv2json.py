import csv
import json
from textwrap import indent

def csv2json(csvFilePath, jsonFilePath):
  data_dict = {}

  with open(csvFilePath, encoding='utf-8') as csvFileHandler:
    csvReader = csv.DictReader(csvFileHandler)

    for rows in csvReader:
      key=rows['First name']

  with open(jsonFilePath, 'w', encoding='utf-8') as jsonFileHandler:
    jsonFileHandler.write(json.dumbs(data_dict, indent=4))

csvFilePath = input('Enter the absolute path of the csv file: ')
jsonFilePath = input('Enter the absolute path of the JSON file: ')

csv2json(csvFilePath, jsonFilePath)
