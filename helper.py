import json
import csv
#from connection import write_table, read_table,update_table
# user_master_csv = "./data/user_master.csv"
# stores_csv = "./data/stores.csv"
# store_to_seller_csv = "./data/store_to_seller.csv"
# store_to_category_csv = "./data/store_to_category.csv"
# items_csv = "./data/items.csv"
# orders = "./data/orders.csv"

admins = "./admins.csv"
persons = "./persons.csv"


def read_csv(csv_name):
    rows = []
    with open(csv_name, 'r') as csvfile:
        csvreader = csv.DictReader(csvfile)
        for dictionary in csvreader:
            rows.append(dict(dictionary))
    return rows


def write_csv(csv_name, data):
    with open(csv_name, 'a', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(data)

# print(read_csv(persons))


def read_persons():
    return read_csv(persons)


def read_admins():
    return read_csv(admins)


def write_person(data):
    return write_csv(persons, data)
