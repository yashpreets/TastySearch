# TastySearch
Search Reviews Based On Keywords input
https://docs.google.com/document/d/19CEm-sU3nO2eU2G8DU8lHFS4MniCZnjDK2Q57b4g2aY/

Installation 
Requires Node and npm
http://blog.teamtreehouse.com/install-node-js-npm-mac

Setup
clone the repo
inside the repo run npm install to install the packages in package.json file.
In global config file set the port on which you want to run default 3900

Starting the server
inside the folder run node app.js

For performing the search use /searchReview Api (METHOD GET && POST BOTH)
http://localhost:3900/searchReview?search=Lord

Sample Response:

{"searchedData":[["product/productId: B000G6RYNE","review/userId: A320QA9HJFUOZO","review/profileName: Zach Morris","review/helpfulness: 7/9","review/score: 5.0","review/time: 1203984000","review/summary: orgasmic","review/text: Kettle Chips are the best potato chip God has ever invented.  I give the Lord thanks every day for delivering unto me such an incredulously delicious blend of ginger and spice, a veritable cornucopia of flavor.  I have actually changed my diet to a strict regiment of the Spicy Thai & Sea Salt and Vinegar flavors, alternating days. I have already lost 5 lbs, not to mention the myriad of other health benefits I have been experiencing. Get your life back - with Kettle Chips."]],"noOfResults":1}

Search Through UI (Just a Basic UI)
http://localhost:3900/searchTab

The DataSet used for testing is inside dataset folder filename finefoods.txt

Sample Load Testing script included in Loadtest folder
