# LARPUN
LARP Using Node

This project is designed to facilitate LARP Downtimes.
For those unfamilliar with it, LARP (Live Action Role-Play),
is a form of game in which a group of people engage in immersive roleplay
within a set of rules.

Downtimes are traditionally run between play sessions, and are used to progress
time and describe what your character is doing in the weeks or months that
separate play sessions. This takes many forms, usually a mixture of heavily systemic
actions, those fully defined in rules, and more freeform actions, both of which
are submitted to referees, processed, and responded to.

This project aims to aid in this process by automating the simpler actions and
their effects upon character attributes, as well as the simpler aspects (such as
time costs) of more complex actions.

This project showcases primarily the "player" side of that interaction,
and currently has no "referee" frontend, however given that user emails are stored
and character sheets are fairly easy to understand and modify, it is still useable
as either part or the entirety of a Downtime system.

This project is live at https://larpun.herokuapp.com/, however due to character
information being stored locally, it is not reccomended that you use it while also
using the local version, as they both use the same remote user authentication and
signup, but store characters locally, which can cause issues if you try and login
online to a user created locally, or vice versa.

---

#### Website Guide

The website itself is very easy to use, it consists entirely of only two pages,
described as follows:

* *Login/Signup*:  
This page contains two forms, one for creating a new user and character, and the
other for logging in as an existing user.  
-The "*New Character*" form requires an email,
a character name, and a password. Pressing submit will validate the form and
provide an alert stating either success, or giving the reason why the user creation
failed (eg, user with that email already exists)   
-The "*Login*" form simply requires
an email and password that has already been registered as a character. Pressing submit will validate
the form, perform a login action, and, if successful, reroute the user to the *User Page*


* *User Page*:  
This page contains several elements.  
-At the top a "*Character Info*" block exists providing the key attributes of the character  
-Beneath this sits a "*Basic Actions*" block, this provides a number of buttons with descriptions,
each button performs a certain basic action that has effects on the character attributes. Pressing this
button will either perform the action and update the attributes both on the server and on the page, or
if there are not enough resources of the action has failed for another reason, an alert will appear with
the reason  
-The "*Complex Actions*" block contains two text input boxes, each with a submit button. Filling in
the input boxes and pressing submit will submit that text and put it into the relevant character sheet
on the server.  
-Finally a small user guide is placed at the bottom with a more basic version of this guide.


#### API Documentation
The API for this project is designed to be used in conjunction with the website, but could be used
independently.

In order to use any of the other API calls, a `SessionID` and `UserID` must be generated.
The UserID is permanent for a specific User, but the SessionID will only last for a few hours.

In order to generate this information, a `POST` request must be made to `/login`, with a data
block containing `"email"` and `"password"` attributes in the `multipart/form-data` format.  
If the authentication details exist, the response with a JSON object containing `sessionID`
and `userID` objects, which should be stored locally.  
If the details are incorrect, the response will be sent with status code `401: Forbidden`

Characters are stored as JSON objects on the server, containing the following attributes:
* `Name` [String]
* `ProgressionPoints` [Int]
* `TimeUnitsMax` [Int]
* `TimeUnitsCurrent`[Int]
* `ResearchPoints` [Int]
* `PreparedMana`[Int]
* `ResearchActions` [Array of Strings]
* `InvestigationActions` [Array of Strings]

Further API endpoints are listed below:

* `/char/:sessionID`  
Replace "`:sessionID`" with your sessionID. This also serves as session confirmation.  
**On success:** Returns Status Code `200` with a JSON object containing the Character Sheet as a JSON object.  
**On failure:** Returns Status code `400` with an error message


* `/updatevalues/:userID`  
Replace "`:userID`" with your userID. In body send a JSON object containing an updated
version of the Character Sheet, which will replace the original.  
**Always:** Returns Status Code `200`


* `/signup`  
In body send an object containing `email`, `password` and `charname`
attributes. A new user and character will be created with these attributes.  
**On success:** Returns Status Code `201` with `"Creation Successful"` message  
**On failure:** Returns Status Code `422` with an error message


* `/userpage`   
**Always:** Returns HTML for User Page

* `/pingtest`  
**Always:** Returns Status Code `200`


#### Extensions:
Both extensions are fulfilled with cloud deployment to Heroku and integration with the
OKTA remote authentication web service.





