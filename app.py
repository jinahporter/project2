# import necessary libraries
import os
import pandas as pd
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
# from flask_sqlalchemy import SQLAlchemy
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from config import dbuser, dbpassword, dbhost, dbport, dbname

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

# try:
#     db_uri = os.environ['DATABASE_URL']
# except KeyError:
#     db_uri = "Insert Local Database"

# print(db_uri)
# app.config['SQLALCHEMY_DATABASE_URI'] = db_uri

# db = SQLAlchemy(app)

# Connect session or connection to db
# session = Session(engine)
# connection = engine.connect()

# Connect to Database - Alternative
engine = create_engine(
    # f"postgres://{dbuser}:{dbpassword}@{dbhost}:{dbport}/{dbname}")
    f'postgresql://{dbuser}:{dbpassword}@database-1.cvmfiiilpm7y.us-east-1.rds.amazonaws.com:{dbport}/{dbname}')

##### Open a session/connection #####
session = Session(engine)
connection = engine.connect()
##### Perform a query to retrieve all the data #####
df = pd.read_sql(f"SELECT * FROM youtube_table", connection)
##### Close the session/connection #####
connection.close()
session.close()


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/data/<country>")
def data(country):
     ##### Open a session/connection #####
    session = Session(engine)
    connection = engine.connect()

    ##### Perform a query to retrieve the data and sort by country #####
    singleCountry_youtubeVids = pd.read_sql(
        f"SELECT * FROM youtube_table WHERE country = '{country}'", connection)

    ##### Convert df to json #####
    singleCountry_youtubeVids = singleCountry_youtubeVids.to_dict(
        orient='records')

    ##### Close the session/connection #####
    connection.close()
    session.close()

    ##### Return a json which could be parsed further using js #####
    return jsonify(singleCountry_youtubeVids)

    # df_filtered_country = df.loc[df.country == country, :]


# route to sum categories for bar plot
@app.route("/forTable")
def forTable(metric):

    ##### perform query to get df with top 10 of data and country selected #####
    # df_likes = functions.likes(df)
    # df_country = df.loc[df.country == '{country}', :]
    # df_country = df_country
    # Table_df = df_country.sort_values(
    #     'likes', axis=0, descinding=True).head(10)
    singleCountry_youtubeVids = singleCountry_youtubeVids.sort_values(
        'likes', axis=0, descinding=True).head(10)

    ##### Convert df to dict #####
    Table_df = Table_df.to_dict(
        orient='records')

    ##### Return a json which could be parsed further using js #####
    return jsonify(Table_df)


# route to sum categories for bar plot
@app.route("/forbarchart")
def forbarchart():

    ##### perform query to get df with top 10 of data and country selected #####
    barChart_df = df.groupby('categoryId').sum()[:, 3]

    ##### Convert df to dict #####
    barChart_df = barChart_df.to_dict(
        orient='records')

    ##### Return a json which could be parsed further using js #####
    return jsonify(barChart_df)


if __name__ == "__main__":
    app.run(debug=True)
