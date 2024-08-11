# SamrakshIT - The Protector

Our Web application solves the given problem statement on Disaster Management and Prevention in the following ways:
1. **Admin and User authentication**- as this website is for disaster management, it is not compulsary for the users to sign in whereas admin signin is compulsary
2. after sign in of admins, the web page asks permission to use admin's location and the admin can set
   i) latitude and longitude of the disaster area
   
   ii) type of disaster {pops up on the map}
   
   iii) Intensity of disaster- pre-caution(yellow), moderate(orange) and severe(red)
   
   iv) radius - admin can set the radius around the disaster prone area in terms of kilometers
   
4. **home page** has the following feature:
   
   i) Call for volunteers who can help the peeple in need
   
   ii) *downloadable contact information of essential services so that users can use it when they are offline*
   
   iii) *donation box* where users can donate essential items such as clothing and hygine products
   
   iv) *monetary donation*
   
   v) educational video on natural disasters that are most frequent in India
   
   vi) disaster management and prevention specific Chat-bot "RakshIT" - it answers to questions that users have regarding disasters, primary health actions such as CPr and          more
   
   vii) *quick links* to Disaster preparedness tips by NHS, disaster response by NDRF, recovery methonds by NDIM.
   
   viii) we have made provisions to detect user location and checking if they are in the disaster area marked by the admin, but due to some eroors, we were unable to deploy 
         it.
   
3. Database(using mongoDB): admins can view volunteers and users such that we have a proper headcount of people in disaster prone area
   

---for using it on localhost---
## Login details:
1) Make sure to install NodeJS, MongoDB & mongoCompass from the official website
2) Open the folder using VSCODE
3) Clone it in that folder
4) cmd: npm i
5) cmd: npm i concurrently --save-dev
6) npm run startBoth
7) localhost:3000

## to run admin map: 
1) cmd: pip install -r requirements.txt
2) run the app.py

## Recovery commands untill homwpage with no integration
git switch -c temp-branch
git switch main
git reset --hard 3c60841
git push origin main --force
