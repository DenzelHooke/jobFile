# Resume Tracker
When I was applying for jobs, I always found it annoying to keep track of 30+ different resumes/cover letters so I made a simple tool that allows you to categorize them by company/position and have it all stored in one central place. 

Utilizes Next.js and React Query for the frontend & Nest.js for the backned. Features user authentication. 

### Technologies Used
- Next.js 13
- Nest.js
- Redux
- React Query
- AWS





### Run project
Frontend
```
cd ./frontend
npm run dev
```
backend
```
cd ./backend
npm run start:dev
```

    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env files. 

#### Frontend


```
cd ./frontend 
```

Create .env file ".env.local"

Add keys: 
- `DEV=false`
- `DEV_SERVER='http://localhost:8001`
- `PROD_SERVER='http://localhost:8001`
----
#### Backend


```
cd ./backend
```

Create .env file ".env"

Add keys: 
- `MONGO_URI=[mongo_uri goes here]`
- `PORT=8001`
- `JWT_SECRET=[jwt secret goes here]`
- `COOKIE_SECRET=[cookie secret goes here]`
- `CLIENT_URL=http://localhost:3000`
- `AWS_ACCESS_KEY_ID=[access key id goes here]`
- `AWS_SECRET_ACCESS_KEY=[access key goes here]`
- `AWS_S3_REGION=[region goes here]`




## Feedback

If you have any feedback, please reach out to me at admin@denzelhooke.com

