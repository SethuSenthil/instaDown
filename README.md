# InstaDown - the ultimate iOS Shortcut to download instagram posts (beta)
##### Works on private accounts and multi-image posts!

## Download the iOS shortcut from :

## Setting up the server :
If you know what your doing don't follow these steps lol! These are for the average user.

#### Important security info
If your using someone elses server make sure you trust them.
Your PASSWORD IS NOT STORED ON THE SERVER. However you authentication cookies are, to make the process speedy.
When the password is sent to the server, it uses AES256 bit encryption (aka military grade encryption).

###  Option 1
Use the server provided on the shortcut. This requires no setup.

### Option 2 [YOUR COMPUTER WILL ALWAYS NEED TO BE ON ]
Step 1) [Install Node JS (doesn't really matter what version)](https://nodejs.org/en/)
Step 2) Download this repo and extract it
Step 3) Instal dependencies
       a) Open the terminal or command prompt in the folder you unzipped by typing `cd <drag and drop the unzipped folder`
       b) type `npm i` and enter
Step 4) type `npm start` and enter
Step 5) Open a new terminal or command prompt window any type  `npm install -g localtunnel`
Step 6) Type `lt --port 3221`
Step 7) Never close these terminal windows or turn off your computer
Step 6) Change the URL in the shortcut

### Option 3 [WARNING: SLOW & SHUTS DOWN AFTER 5 MINS OF INACTIVITY]
Step 1) https://glitch.com/
Step 2) Click new project
Step 3) Click clone repo
Step 4) Paste this webpages current URL
Step 5) Click live app and copy the URL
Step 6) Change the URL in the shortcut


## Setting up the iOS shortcut
Step 1) Make up a key. This is your password into thr server. We recommend you DO NOT make this the same as your instagram password or username.
More info: This key is then used to encrypt your password

Step 2) Go to https://instacrypto.glitch.me/THE-KEY-YOU-MADE-UP-FROM_STEP-1/YOUR-INSTAGRAM-PASSWORD
Step 3) Copy the blob of text that it returns and paste that in for the "password" in the dictionary
Step 4) Enter in your Instagram username where it says "username" in the dictionary
Step 5) Enter the key you made up in the first step where it says "key"

How to use:
Step 1) Pull up an Instagram post, any inst post.
Step 2) Click share post and share it to the shortcut
P.S: It might take a while to run it the first time since it needs to grant permissions and save your auth.

Step 3) Check your recants!
