##Disaster Explorer
JS web app for exploring disaster concentration across the world. Supports searching by date range and type of disaster.

##Data
The data is fetched from The International Disaster Database via scraping the results page with a NodeJS script. The code is located under ./data in the project root.

To fetch the data yourself make sure to execute `npm install` in the ./data directory to install the dependencies then execute the script via `node fetch_convert.js`

##License
The code is released under the [GNU General Public License 3](http://www.gnu.org/copyleft/gpl.html).
