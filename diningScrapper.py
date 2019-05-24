from flask import Flask, Blueprint, jsonify, request
from bs4 import BeautifulSoup
import re
import pandas as pd
import os
import time
import requests
import html2text
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


def parseHTMLtoTextString(html):
    dataString = str(html)
    parseData = html2text.html2text(dataString)
    return parseData


@app.route("/getMenu", methods=['POST'])
def getMenu():
    # pull JSON data from POST request made by frontend
    requestedMenu = request.get_json()
    # variables for park, resturant name and meal period to allow for data from webform
    park = requestedMenu['park']
    restaurant = requestedMenu['restaurant']
    period = requestedMenu['period']

    # build URL for scrapping
    url = (
        "https://disneyworld.disney.go.com/dining/"
        + park
        + "/"
        + restaurant
        + "/menus/"
        + period
        + "/"
    )

    # use request to gather url from POST payload and get website for scrapping
    result = requests.get(url)
    page_soup = BeautifulSoup(result.content, "lxml")

    menu = page_soup.find("section", {"class": "menu"})

    # All menu HTML retrieved, Time to parse
    menu = parseHTMLtoTextString(menu)

    # pass gathered menu to frontend via JSON object
    return jsonify({"menu": menu})
