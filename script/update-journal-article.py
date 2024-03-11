import pymongo
import pandas as pd
import os
from dotenv import load_dotenv
import sys

load_dotenv()
MONGODB_URI = os.getenv("MONGODB_URI")

#Read in Master Tag List
df0 = pd.read_excel("./Master-Tag-List.xlsx", header=None)
for i, word in df0.items():
    master_tag_list = [x.lower() for x in word.tolist()]
master_tag = set(master_tag_list)

#Journal Entries
df1 = pd.read_excel("./Journal-Articles.xlsx", header=0)
df1.columns = df1.iloc[0]
df1 = df1[1:]

#Put Excerpts into Array of Excerpts
last_column_index = len(df1.columns) - 1

# Define a function to extract non-empty values from a row
def extract_non_empty(row):
    return [value for value in row[5:last_column_index + 1] if pd.notna(value)]

# Apply the function to create the 'Exerpts' column
df1['Exerpts'] = df1.apply(extract_non_empty, axis=1)

# Drop the columns with non-empty values
df1 = df1.drop(df1.columns[5:last_column_index + 1], axis=1)

#if there is a space in front of the tag, remove it (only removes spaces at front)
x = df1['Tag'].str.split(',')
for i, arr in x.items():
    for index, word in enumerate(arr):
        if word.startswith(" "):
            arr[index] = word.lstrip()
df1['Tags'] = x
df1 = df1.drop('Tag', axis=1)

#If any of the tags was not found in Masterlist, flag it, DO NOT push any new data to MongoDB
tag_not_found = False
for i, arr in x.items():
    for index, word in enumerate(arr):
        if word.lower() not in master_tag:
            print(word.lower() + " in ", arr, " not found in master_tag list.")
            tag_not_found = True

if tag_not_found:
    print("No data was pushed to MongoDB from Journal Article spreadsheet. Please fix before continuing.")
    sys.exit()

#Connect to MongoDB and Update
connection = pymongo.MongoClient(MONGODB_URI)
db = connection['test']
collection_name = db['articles']
collection_name.drop()

records = df1.to_dict(orient='records')
collection_name.insert_many(records)