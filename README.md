SCHEDULE WITH ME
Live link: https://schedule-with-me.netlify.com/

Description: Inspiried by remote pair-programming, which proves that we tend to work more productively in groups, this mini app will allow users to create an event and let other users join them. Say no to procrastination.



API Documentation:
1) Users
        i. get api/ 
        ii. post api/ - register a new user
2) Auth
        post api/login - login
        post api/refresh - the user exchanges a valid JWT for a new one with a later expiration
3) Events
        i. get api/ - retrieve events of the chosen week
        ii. post api/ post a new schedule
        iii. put api/:_id/join   find by _id, update the event by adding the logged in user's username and id to the list of joiners
        iv. put api/:_id/unjoin same as iii.
        v. delete api/:_id find by _id, delete selected event
        

        
