import pymongo
import pandas as pd
import os
from dotenv import load_dotenv
import sys

load_dotenv()
MONGODB_URI = os.getenv("MONGODB_URI")

#Read in Master Tag List
df0 = pd.read_excel("idontmind/script/Master-Tag-List.xlsx", header=None)
for i, word in df0.items():
    master_tag_list = [x.lower() for x in word.tolist()]
master_tag = set(master_tag_list)

#Journal Prompts
df3 = pd.read_excel("idontmind/script/Journal-Prompts.xlsx", header=None)
df3.columns = df3.iloc[0]
df3 = df3[1:]

#Put Tags into Array of Tags
#if there is a space in front of the tag, remove it (only removes spaces at the front)
x3 = df3['Tags'].str.split(',')
for i, arr in x3.items():
    for index, word in enumerate(arr):
        if word.startswith(" "):
            arr[index] = word.lstrip()
df3['Tag'] = x3
df3 = df3.drop('Tags', axis=1)

#If any of the tags was not found in Masterlist, flag it, DO NOT push any new data to MongoDB
tag_not_found = False
for i, arr in x3.items():
    for index, word in enumerate(arr):
        if word.lower() not in master_tag:
            print(word.lower() + " in ", arr, " not found in master_tag list.")
            tag_not_found = True

if tag_not_found:
    print("No data was pushed to MongoDB from Journal Prompt spreadsheet. Please fix before continuing.")
    sys.exit()

#Connect to MongoDB and Update
connection = pymongo.MongoClient(MONGODB_URI)
db = connection['idm-cluster']
collection_name = db['test.Journal-Prompts']
collection_name.drop()

records = df3.to_dict(orient='records')
collection_name.insert_many(records)