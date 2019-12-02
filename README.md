# Summergeeks Assignment
Entry Management System for Summergeeks Internship

## Solution Approach
> The problem statement demands entry management software for keeping the track of visitors entry visiting an office having multiple hosts and visitors.\
>I have created an API for CRUD operations required for entry management software using NodeJs, Express, and MongoDB.
GUI is created using ReactJs in ServerSide.

![Image](https://github.com/thesid01/Summergeeks-Assignment/blob/master/entry_management_api/Design.png)


## Prerequisite
```
NodeJs (Installed)
MongoDB(Installed)
Nexmo(API for sending SMS)
Nodemailer(npm Module)
E-mail account
```

## How to run
```
1. Download this repo
2. Extract it to a folder
3. Make sure your MongoDB server is running on your PC.
4. cd Summergeeks-Assignment/entry_management_api
5. cd config
6. Change config.js file according to your config values
    *  Use your Gmail Username and password
    *  Use your Nemxo API_KEY and SECRET_KEY
7. cd ../
8. run npm install
9. run npm start

### Node server started at localhost:3000

10. cd Summergeeks-Assignment/entry_management_gui
11. cd src
12. Change config.json file according to your server URL 
     and change url state by your server url.
13. cd ../
14. run npm install
15. run npm start

### GUI server started at localhost:3001

```

 # Summergeeks Assignment GUI

This is a UI for **Summergeeks Assignment**, created using ReactJs

**URL**: *https://summergeeks-assignment-api.herokuapp.com*

(Remember to use https otherwise CORS Problem may occur)


## CORS Problems which may occur with solution
>CORS (cross-origin-resource-sharing)

![Image](https://github.com/thesid01/Summergeeks-Assignment/blob/master/entry_management_gui/cors-errorpng.png) 
If problem occurs CORS is blocking the connection to API, So what you have to do is Allow access to your UI URL from API ([LINK](https://github.com/thesid01/Summergeeks-Assignment/blob/master/entry_management_api) in app.js File


# Summergeeks Assignment API
URL : https://summergeeks-assignment-api.herokuapp.com/

**summergeeks_assignment_api** is a [API](https://summergeeks-assignment-api.herokuapp.com/) defined for Entry Management Software for Summergeeks Assignment


## Models Used (MongoDB)

```
HostSchema = {
  name: String,
  email: String,
  phoneNumber: String,
  address : String,
  visitors : [String],
  timestamp : Date
}

VisitorSchema = {
  name: String,
  email: String,
  phoneNumber: String,
  checkIn: { type: Date, default: Date.now },
  checkOut: Date,
  hostId : String
}
```

## Usage (Routes Used)

```
POST_REQUESTS
Add_Host( To add a host) : /host/add
Add_Visitor( To add a visitor)  : /visitor/add/:host_id

GET_REQUESTS
Show_Hosts( Show all hosts)  : /additional/show-hosts
Check_Host_Existence( To check the existence host)  : /additional/check-host/:host_id 
Checkout( To checkout a visitor)  : /visitor/Checkout/:visitor_id
Show_visitors (show all visitors) : /additional/get-visitors
```

## How to Use Nodemailer
In [Config](https://github.com/thesid01/Summergeeks-Assignment/blob/master/entry_management_api/config/config.js) file change **XXXXXX** to your username and password for Gmail account

>For using Gmail services 

(**Must**) Enable [Less Secure App](https://myaccount.google.com/lesssecureapps?pli=1)

Still, If you are unable to send mail, enable [Display Unlock Captcha](https://accounts.google.com/DisplayUnlockCaptcha)

If you want to use nodemailer with other services, check out the [official Site](https://nodemailer.com/usage/)

>For using Yahoo services 

Go to settings > account security > create a new app for account you will get a password for your app
I recommend using Yahoo because it's easy to setup

## How to Use Nexmo

Create a account on [Nexmo](https://www.nexmo.com/)

Now change your API_KEY and SECRET_KEY with **XXXXX** in  [Config](https://github.com/thesid01/Summergeeks-Assignment/blob/master/entry_management_api/config/config.js)  file.

For More addons Follow official [instructions](https://developer.nexmo.com/documentation)


>#### Note for NodeMailer
>This git repo is hosted on Heroku and working fine but mail service may not work because for sending mail I have used my personal Gmail Account and if free hosting gets down and then I have to authenticate my Gmail account using display Unlock Captcha. *But you can use your personal account for sending mail.*


>### Note for Nexmo
>All SMS Conversation API only allows to send SMS to only white-listed numbers for free, Since my Nexmo Account is on trial so numbers which I don't have in my White-list cannot receive SMS through this API.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update the tests as appropriate.

## License

