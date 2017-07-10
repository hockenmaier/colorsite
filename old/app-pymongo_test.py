# In this doc I replaced a few pieces of the docker example with the template info from the
# flask intro found at https://code.tutsplus.com/tutorials/an-introduction-to-pythons-flask-framework--net-28822
# This needs to be cleaned, some dependencies are not needed and the html variable is unused now.

from Flask_PyMongo import Flask, render_template, pymongo
from pymongo import MongoClient
import datetime

# from redis import Redis, RedisError
# import os
# import socket

# Connect to Redis
# redis = Redis(host="redis", db=0, socket_connect_timeout=2, socket_timeout=2)

app = Flask(__name__)
# mongo = PyMongo(app)
client = MongoClient('localhost',27017)

db = client.test_database
collection = db.test_collection

post = {"author": "Brian",
         "text": "My first blog post!",
         "tags": ["mongodb", "python", "pymongo"],
         "date": datetime.datetime.utcnow()}

posts = db.posts
post_id = posts.insert_one(post).inserted_id
post_id

@app.route("/")
def home():
    return render_template('home.html')
    # return html.format(name=os.getenv("NAME", "world"), hostname=socket.gethostname(), visits=visits)


@app.route("/results")
def results():
    return render_template('results.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, debug=True)

'''
from flask import Flask, render_template
 
app = Flask(__name__)      
 
@app.route('/')
def home():
  return render_template('home.html')
 
if __name__ == '__main__':
  app.run(debug=True)
'''