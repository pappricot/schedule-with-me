#SCHEDULE WITH ME

Live link: https://schedule-with-me.netlify.com/

Client github repo: https://github.com/pappricot/schedule-with-me-client

Server github repo: https://github.com/pappricot/schedule-with-me-server

##Description
Inspiried by remote pair-programming, which proves that we tend to work more productively in groups, this mini app will allow users to create an event and let other users join them. Say no to procrastination.

Log in / Landing page:
![screenshot 30](https://user-images.githubusercontent.com/18382129/43613360-f51f7366-9663-11e8-9b2e-555384077ffe.png)

Registration for new user:
![screenshot 31](https://user-images.githubusercontent.com/18382129/43613388-0b1af366-9664-11e8-9cf6-18cacdde9352.png)

Navigation bar and upcoming sessions (get appended when other users request to join the session(event)):
![screenshot 29](https://user-images.githubusercontent.com/18382129/43613441-32bc16ca-9664-11e8-9ca4-d13c3bf9707f.png)

Calendar where cells are clickable to create, delete your sessions and request, cancel request to join other sessions:
![screenshot 32](https://user-images.githubusercontent.com/18382129/43613477-508b5ff8-9664-11e8-98ae-e2efa240518d.png)


##API Documentation
<ul>
    <li> Users
       <ul>     
        <li>i. get api/   </li> 
        <li>ii. post api/ - register a new user</li>
       </ul>
    </li>
    <li>Auth
       <ul>
        <li>post api/login - login</li>
        <li>post api/refresh - the user exchanges a valid JWT for a new one with a later expiration</li>
       </ul>
     </li>
     <li>Events
      <ul>
        <li>i. get api/ - retrieve events of the chosen week</li>
        <li>ii. post api/ post a new schedule</li>
        <li>iii. put api/:_id/join   find by _id, update the event by adding the logged in user's username and id to the list of joiners</li>
        <li>iv. put api/:_id/unjoin same as iii.</li>
        <li>v. delete api/:_id find by _id, delete selected event</li>
       </ul>
      </li>
</ul>

        

        
