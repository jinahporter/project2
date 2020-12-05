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

try:
    db_uri = os.environ['DATABASE_URL']
except KeyError:
    db_uri = "Insert Local Database"

print(db_uri)
app.config['SQLALCHEMY_DATABASE_URI'] = db_uri

# db = SQLAlchemy(app)

# Connect session or connection to db
# session = Session(engine)
# connection = engine.connect()

# Connect to Database - Alternative
connection_string2 = f'{dbuser}:{dbpassword}@database-1.cvmfiiilpm7y.us-east-1.rds.amazonaws.com:{dbport}/{dbname}'
engine = create_engine(f'postgresql://{connection_string2}')


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/data/<country>")
def data(country):
     ##### Open a session/connection #####
    session = Session(engine)
    connection = engine.connect()

    ##### Perform a query to retrieve the data and precipitation scores #####
    singleCountry_youtubeVids = pd.read_sql(
        "SELECT * FROM youtube_table WHERE country = 'MX'", connection)
    print(singleCountry_youtubeVids.head())

    ##### Convert df to json #####
    singleCountry_youtubeVids = singleCountry_youtubeVids.head().to_dict(orient='records')

    ##### Close the session/connection #####
    connection.close()
    session.close()

    ##### Return a json which could be parsed further using js #####
    return jsonify(singleCountry_youtubeVids)

    # return render_template("index.html", singleCountry_youtubeVids=singleCountry_youtubeVids)


if __name__ == "__main__":
    app.run(debug=True)
