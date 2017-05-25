# Chef-System
Chef System is an App Develop Over IONIC 2 Framework to manage a Restaurant
![](https://raw.githubusercontent.com/obenm/Chef-System/master/ChefSystem.png)

Welcome to the Chef-System wiki!

# Description
Chef-System is a complete Application where you can manage the bills from a restaurant through of your cellphone. The app is not finished yet, but works consist in 3 different apps, first one is and Admin Interface developed for fake waiters for example, they can open a table to create a Bill, then clients login with the generated access code into Mobile Application and orders products. Server is to communicate and past data between 2 applications and database.

# Software Requirements
	Android, iOS => XCode for Test, Windows UWP / Phone, NodeJS, MongoDB
	Internet connection or use Local Server

# App Info
	Version: 1.00
	Developer: Octavio Benitez
	Dates: Start at Apr 15 2017

# System Structure
*	Mobile Application:
		Mobile Application is first one, where the user login to request products to the chefs or waiters. Use REST API Services to post and get data from the server.

*	Admin Application:
		Is where the chefs or waiters interacting with the client, In this interface, we can create Bills, see the orders, see a Map of the tables of our restaurant, see the total, add tips, etc.
	
*	Server:
		It's running in the background, include models of Mongo Databases to save the information, to control them and retrieve according the service requested.

# How to use it:
When I Finish the Application, the Methods to Login will be the following:
Once that the server are running, you have to login in Admin Interface to create a bill and can login in Mobile Application.
*	Admin Interface:
		Access Code: Jajaja

*	Main Commands:
		node server.js
		mongod
		ionic serve 
		ionic serve --lab (optional)
		

