import pymongo
import pandas as pd
import os
from dotenv import load_dotenv
import sys

load_dotenv()
MONGODB_URI = os.getenv("MONGODB_URI")
connection = pymongo.MongoClient(MONGODB_URI)
db = connection['idm-cluster']

#Reads in master tag list
df0 = pd.read_excel("idontmind/script/Master-Tag-List.xlsx", header=None)
for i, word in df0.items():
    master_tag_list = [x.lower() for x in word.tolist()]
master_tag = set(master_tag_list)

#Reads in Q&A spreadsheet
df2 = pd.read_excel("idontmind/script/Q&A.xlsx", header=None)
df2.columns = df2.iloc[0]
df2 = df2[1:]

#Make Answered Column a Boolean
df2['Answered'] = df2['Answered?'].apply(lambda x: True if x == 'Yes' or x == "yes" else False)
df2 = df2.drop('Answered?', axis=1)

#Put Tags into Array of Tags
#if there is a space in front of the tag, remove it (only removes spaces at the front)
x2 = df2['Tag'].str.split(',')
for i, arr in x2.items():
    for index, word in enumerate(arr):
        if word.startswith(" "):
            arr[index] = word.lstrip()
df2['Tags'] = x2
df2 = df2.drop('Tag', axis=1)

#If any of the tags was not found in Masterlist, flag it, DO NOT push any new data to MongoDB
tag_not_found = False
for i, arr in x2.items():
    for index, word in enumerate(arr):
        if word.lower() not in master_tag:
            print(word.lower() + " in ", arr, " not found in master_tag list.")
            tag_not_found = True

if tag_not_found:
    print("No data was pushed to MongoDB from Q&A spreadsheet. Please fix before continuing.")
    sys.exit()

#Connect to MongoDB and Update
collection_name = db['test.Q&A']
collection_name.drop()

records = df2.to_dict(orient='records')
collection_name.insert_many(records)

