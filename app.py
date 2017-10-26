# In this doc I replaced a few pieces of the docker example with the template info from the
# flask intro found at https://code.tutsplus.com/tutorials/an-introduction-to-pythons-flask-framework--net-28822
# This needs to be cleaned, some dependencies are not needed and the html variable is unused now.

from flask import Flask, render_template
from flask_pymongo import PyMongo
from pymongo import MongoClient
from datetime import datetime

# from redis import Redis, RedisError
# import os
# import socket

# Connect to Redis
# redis = Redis(host="redis", db=0, socket_connect_timeout=2, socket_timeout=2)
print 'starting app'
app = Flask(__name__)
print 'hooking up client to colorsite database'
client = MongoClient('192.168.99.100', 27017)
db = client.colorsite
print 'inserting'

db.colors.insert_one(
            {
                "metadata": {
                    "color": "FFFFFF",
                    "IP": "127.0.0.1",
                    "timestamp": datetime.now(),
                    "iteration" : 'oh heerrro'
                }
            }
        )


insertlist = range(1,50)
for i in insertlist:
    db.colors.insert_one(
            {
                "metadata": {
                    "color": "FFFFFF",
                    "IP": "127.0.0.1",
                    "timestamp": datetime.now(),
                    "iteration" : "iteration is now " + str(i)
                }
            }
        )


print 'done'
@app.route("/")
def home():
    return render_template("home.html")
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