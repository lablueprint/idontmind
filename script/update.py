import pymongo
import pandas as pd
import os
from dotenv import load_dotenv

load_dotenv()
MONGODB_URI = os.getenv("MONGODB_URI")

#Journal Entries
df1 = pd.read_excel("idontmind/script/Journal-Articles.xlsx", header=0)
df1.columns = df1.iloc[0]
df1 = df1[1:]
print(df1.columns)

#Put Excerpts into Array of Excerpts
last_column_index = len(df1.columns)-1
df1['Exerpts'] = df1.apply(lambda row: row[5:last_column_index + 1].tolist(), axis=1)
df1 = df1.drop(df1.columns[5:last_column_index + 1], axis=1)

#Put Tags into Array of Tags
df1['Tags'] = df1['Tag'].str.split(',')
df1 = df1.drop('Tag', axis=1)
print(df1)

#Connect to MongoDB and Update
connection = pymongo.MongoClient(MONGODB_URI)
db = connection['idm-cluster']
collection_name = db['test.journal-articles']
collection_name.drop()

records = df1.to_dict(orient='records')
collection_name.insert_many(records)

#Q&A
df2 = pd.read_excel("idontmind/script/Q&A.xlsx", header=None)
df2.columns = df2.iloc[0]
df2 = df2[1:]
print(df2.columns)

#Make Answered Column a Boolean
df2['Answered'] = df2['Answered?'].apply(lambda x: True if x == 'Yes' or x == "yes" else False)
df2 = df2.drop('Answered?', axis=1)

#Put Tags into Array of Tags
df2['Tags'] = df2['Tag'].str.split(',')
df2 = df2.drop('Tag', axis=1)
print(df2)

#Connect to MongoDB and Update
collection_name = db['test.Q&A']
collection_name.drop()

records = df2.to_dict(orient='records')
collection_name.insert_many(records)

#Journal Prompts
df3 = pd.read_excel("idontmind/script/Journal-Prompts.xlsx", header=None)
df3.columns = df3.iloc[0]
df3 = df3[1:]
print(df3.columns)

#Put Tags into Array of Tags
df3['Tag'] = df3['Tags'].str.split(',')
df3 = df3.drop('Tags', axis=1)
print(df3)

#Connect to MongoDB and Update
collection_name = db['test.Journal-Prompts']
collection_name.drop()

records = df3.to_dict(orient='records')
collection_name.insert_many(records)