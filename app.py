<<<<<<< HEAD
from flask import Flask, jsonify

import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import pandas as pd
from config import password

# SET UP THE DATABASE

# variables to populate the database connection string
db_user = 'postgres'
db_password = password
db_host = 'localhost'
db_port = 5432
# This database must already exist
db_name = "youtube_database"

engine = create_engine(f'postgres://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}')

# reflect exisiting database into a new model
Base = automap_base()

# reflect tables
Base.prepare(engine, reflect=True)
results = Base.classes.youtube_table

# making a change to reset cache

# Flask SET UP

app = Flask(__name__)

# Flask Routes
@app.route('/')
def home():


    session = Session(engine)

    session_results = pd.read_sql(session.query(results.title, results.categoryId, results.view_count, results.likes, results.dislikes).statement, con=engine).to_dict(orient='records')
    session.close()

    return jsonify(session_results)


if __name__ =='__main__':
    app.run(debug=True)
=======
# import necessary libraries
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

from flask_sqlalchemy import SQLAlchemy

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

db = SQLAlchemy(app)

@app.route("/")
def home():
    return render_template("index.html", data=db)



if __name__ == "__main__":
    app.run()
>>>>>>> 7d4359f8bda608f9fae1036260550dcc6b5b8772
