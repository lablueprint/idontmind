# IDONTMIND Spreadsheet Python Automation
A program which upon running, updates the idontmind spreadsheet.

## Building
Create your python virtual environment.
```shell
python3 -m venv env
```
Activate your python env.
On MacOS:
```shell
source env/bin/activate
```
Make sure you have the following sheets in your script directory. 

Journal-Articles.xlsx
Journal-Prompts.xlsx
Master-Tag-List.xlsx
Q&A.xlsx

Each of these files should be a separate sheet, i.e. Journal-Artciles.xlsx should not have a Journal-Articles sheet, Journal-Prompts sheet, Master-Tag-List sheet, etc. They should be in their own separate .xlsx files. (See requirements for spreadsheet formatting)

Install the following dependencies: 
```shell
pip install pymongo
pip install pandas
pip install python-dotenv
pip install openpyxl
```

## Running
Depending on your python version, run:
```shell
python3 your_script.py
python your_script.py
```

## Cleaning up
Deactivate virtual environment.

```shell
deactivate
```

Requirements for spreadsheet formatting:
1. For journal articles, columns MUST be in the order: Content Type, Title, Author, Tag, Link, and then each excerpt in a separate column after
- Tags must be comma separated
2. For Q&A, columns MUST be in the order: Questions, Tag, Answered?, Answer, Who Answered, List of all the tags used
- NOTE: List of all tags used MUST be in the first row and nowhere else
3. For journal prompts, columns MUST be in the order of journal prompt, and then tags







