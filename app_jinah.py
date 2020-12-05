from flask import (
    Flask, 
    jsonify, 
    render_template,
    request)

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import pandas as pd
import os
from config import password

# SET UP THE DATABASE

# variables to populate the database connection string
pg_user = 'postgres'
password=password
db_name = 'youtube_database'
connection_string = f'{pg_user}:{password}@localhost:5432/{db_name}'
engine=create_engine(f'postgresql://{connection_string}')

# reflect existing database into a new model
Base = automap_base()

# reflect tables
#Base.prepare(engine, reflect=True)
#youtube_results = Base.classes.youtube_table

# making a change to reset cache

# Flask SET UP

app = Flask(__name__)

# Flask Routes
@app.route('/')
def home():
    return render_template("index.html")


@app.route("/data/<country>")
def data(country):
     ##### Open a session/connection #####
    session = Session(engine)
    connection = engine.connect()

    ##### Perform a query to retrieve the data and precipitation scores #####
    singleCountry_youtubeVids = pd.read_sql(
        f"SELECT * FROM youtube_table WHERE country = '{country}'", connection)

    ##### Convert df to json #####
    singleCountry_youtubeVids = singleCountry_youtubeVids.to_dict(orient='records')

    ##### Close the session/connection #####
    connection.close()
    session.close()

    ##### Return a json which could be parsed further using js #####
    return jsonify(singleCountry_youtubeVids)


if __name__ =='__main__':
    app.run(debug=True)