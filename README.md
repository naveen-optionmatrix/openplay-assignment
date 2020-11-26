Task: The application has been designed to register the users and show events associated with the diary for the authenticated users.  
  
Steps to follow:  
1. Incase, if the system has the Docker installed:  
	i. Open the Command Prompt, Go to the Solution and just run, "docker-compose up --build -d"  
	ii. You will be able to access the website on "http://localhost:4200/"  
	iii. Once the application is tested, you can close the Docker containers using "docker container stop $(docker container ls -q)"  
	iv. Incase of any errors, please clear the previous Docker Volumes and check whether you are not running any other applications on the ports 4200, 8080 and 3306  
  
2. If Docker is not installed, you can run the application without Docker as follows:  
	i. Please install node, mysql and angular-cli in the computer, if it not installed  
	ii. Start the Mysql server  
	iii. Open the Command Prompt, Enter the "backend" folder and run "npm i".  
	iv. Once all the node modules are installed, run command "node server.js" and keep the command prompt open  
	v. Now open new command prompt, go to the "frontend" folder and run "npm i"  
	vi. Once all the node modules are installed, run command "ng serve -o"  
	vii. Now the application will open a new tab of your browser with the url "http://localhost:4200/"  
  
Note: Please ensure you have sufficient privileges while installing the above modules in your computer  