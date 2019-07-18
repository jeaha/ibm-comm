## Overview
IBM has a corporate communications team which publishes news headlines to the internal homepage for roughly half a million employees, consultants, and business partners. This project implements a simple recommendation system to match relevant news headlines to internal employees.

## Assumptions
Assume that the employee records are stored in a file, and the news headlines are stored in another file.  Both files are generated, and may contains 5,000 to 10,000 employee records and 500 to 3,000 headline records.  

This services should have a public API that takes the publication date as input and outputs every news headline published on this day to its list of matched employees.  Additional filter is added such that only subscribed headlines are published.

### Quick Start

1. Will be added after deploy to cloud.


## Getting started (Running locally)

1. Download: `git clone https://github.com/jeaha/simple-recommend.git` 
2. cd to simple-recommend 
3. Install dependencies: `npm install` 
4. Build Project: from terminal view window, `npm run build` 
5. Run Project locally: from terminal view window, `npm run dev` 
6. Access APIs : from browser window, `http://localhost:5000/api/docs/` 

## APIs
- Mange employees
    - List all employees : `GET /employees` 
    - List all employes for a given subscription type : `GET /employees/subscription/{subscriptionType}` (i.e. politics, finance, sports)
    - Load more employees: `POST /employees` (Not implmented)
- Manage headlines
    - List all headlines : `GET /headlines` 
    - List all headlines for a given category( for matching subscription type) : `GET /headlines/category/{category}`  (i.e. politics, finance, sports)
    - List all headlines for a given date : `GET /headlines/date/{date}`  (i.e. 08/15/1972)
    - Load more headlines: `POST /headlines` (Not implmented)
- recommendation
    - List all headlines for a given date and a subscription type : `GET /headlines/date/{date}/category/{category}`
        - This will return the list of employees and headlines employee should be notified of 

# Test

Run test locally: from terminal view window, `npm run test` 

# TODO

1. Performance: Run with maximum records  
2. error checking 
3. additional APIs
4. Swagger verification - diabled for now
