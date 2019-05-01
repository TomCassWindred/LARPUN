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

---

####Website Guide

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
--The "*Complex Actions*" block contains two text input boxes, each 






