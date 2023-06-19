TODO APPLICATION
 is a streamlined todo application built using Elasticsearch and Node.js, offering users a powerful task management solution. With Elasticsearch's advanced search capabilities and real-time indexing, Todo enables users to effortlessly add, update, and delete tasks. The application supports efficient searching based on user IDs, task names, and descriptions, ensuring a personalized and organized task management experience.

Introduction:
Todo is designed to simplify task management, providing a user-friendly interface and leveraging Elasticsearch and Node.js for enhanced performance and functionality. The application allows users to create, update, and delete tasks with ease, while Elasticsearch's advanced search capabilities enable efficient searching based on user IDs, task names, and descriptions.

Key Features:

Task Creation and Management: Users can easily create and manage tasks, including details such as task names, descriptions, and completion status.

Efficient Search Functionality: Todo utilizes Elasticsearch's powerful search capabilities to enable quick and precise searching based on user IDs, task names, and descriptions.

Real-time Indexing: Tasks are immediately available for search and retrieval after creation or update, thanks to Elasticsearch's real-time indexing feature.

Scalability and Performance: Todo leverages Elasticsearch's distributed architecture to handle large volumes of tasks efficiently, ensuring optimal performance as the number of tasks grows.

User Identification: Users can associate tasks with unique user IDs, allowing for personalized task management and organization.

Steps to run application
step 1 : clone the repository by following below command
git clone git@github.com:amber-ahmed/todo.git
//to run client application
step 2 : move to client folder by below command
cd client
step 3 : install libraries by following command
npm i
it will install all libraries that are presend in the package.json
step 4 : run app by below command
npm start
//steps to run server
step 5 : goto server folder by below command
cd ../server //if you are already in client folder
step 6 : create .env file by below command
touch .env
step 7 : add the following variables
PORT = 5003
DB_URI = <your mongodb uri string>
REDIS_PASSWORD = <redis password>
REDIS_PORT = 10971
REDIS_HOST = <redis host url>
ELASTIC_ID = <elastic client id>
ELASTIC_USERNAME = <elastic username>
ELASTIC_PASSWORD = <elastic password>
//replace with your credentials
step 7 :  install libraries by following command
npm i
step 8 : run server by following below command
npm run server
Now your server will start and your application is live, you can use it now.
