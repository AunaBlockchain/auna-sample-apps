#!/usr/bin/env python3
# encoding: utf-8
from flask import Flask

from src.controllers.controller import *
from src.models.model           import *
from src.routes.router          import *


app = Flask(__name__)
app.register_blueprint(router)

if __name__ == '__main__':
    app.run(debug=True, host=config['host'], port=config['port'])    