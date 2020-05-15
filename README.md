***This application is still in development and will likely have more modifications frequently made*** 

This application was developed using MERN Stack
Web address for deployed application: 
	Url: 

	PORT: 9000
Link to Github Repositories: 
	Academic: https://github.com/ualbany-csi518/term-project-leeemmanuel38.git
	
	Personal: https://github.com/leeemmanuel38/PersonalProfile.git



Instructions on how to run this application: 

* the server for this application uses concurrently and nodemonNpm to run clien and server
* to run server alone run the command: npm run start
* to run client alone run the command: npm run client
* for full stack application run the commmand: npm run dev 

Necessary files to run application: 

* in the server/.env folder these files are required: 
	AWSAccessKeyId=<Your access keys Id>
	AWSSecretKey=<Your secret key>
	bucket=<Your buck name>

	Access=<Mongodb Atlas access link>
	
* in server/database.js folder:
	connect database using link to remote database

* in order to modify the profile page you must be registered as an admin 



Back-End file structure within this application 

*Server
	* bin/www
	**models
		* myblog.js (database schema for submitting user description)
		
		* users.js (database schema for creating new user and authenticating current users)
	**passport
		* index.js (calls authentication strategies for user information)
		
		* LoginStrategy.js (authenticates the user on login)
		
		* SignupStrategy.js (authenticates the user on sign up)
	**routes
		* api.js (end-point for saving user description data in database)
		
		* remove_data.js (end-point for removing user data from database)
		
		* users.js (end-point for storing users in database) 
	**app.js (main server file)
	
	**awsCtrl.js (communicates to aws cloud service)
	
	**database.js (connects to MongoDB Atlas using mongoose)
	
	