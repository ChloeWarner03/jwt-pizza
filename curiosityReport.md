# Curiosity Report: Amazon EventBridge

## Why I Was Curious About Amazon EventBridge

My dad, Daniel Warner, is a software developer for the National Park 
Service. When I was visiting him, I got to sit in on a presentation 
from an AWS representative. They spent a lot of time talking about 
Amazon EventBridge. I didn't really understand what it was, why it 
was needed, or what its purpose was and I wanted to learn more. I 
wanted to actually figure out how it worked, so I decided to make 
it my curiosity report topic.

## What Is Amazon EventBridge?

Amazon EventBridge is a serverless event bus. That means it listens 
for things that happen which are called events and then it will automatically route 
them to other services, making it so then you do not have the manually trigger it. 
This allows for there to be more automatic processes and you do not need to
manage the servers as much.

I learned that na event is just something that occurs. For example, a file being 
uploaded, a database being updates, or even just when a user is clicking buttons. Eventbridge is the middleman, it directs where things go and basically says when 
THIS happens, do THAT. 
 
The main components to Eventbridge are:
- Event Bus: which is a pipeling that recieves and routes events
- Rules: which are filters that decide which events to act on and where it needs to 
send them
- Targets: which are the services that recieve the event and then do something with it. FOr example, a Lamdba function. 

It can support events from AWS service, personal application along with 3rd party providers. Making it flexible for a lot of different users that would like to use it. 


## Why It's Great

The biggest thing that stood out to me is that nothing has to be 
manually triggered. You set up the rule once and it will work automatically.
Making it so in real time it will work every time the event happens. Allowing there to be less waiting or extra code needed to combine the services together. Along with this I learned that it will scale automatically, you can have 1 event fire or a bunch and it will handle it the same way. 

## Cool Facts

## Challenges
At first learning about it was difficult but by taking it step by step and adding to what I already learned it because clearer what it was used for and helped me decide on how I wanted to test and impliment this technology. When I was doing my experiment it was hard to figure out how to use it in AWS and exactly how to get started. During the experiment I had some problem with my file that took a while to figur out and then figuiring out the right settings to make th event fire took soem trial and error as well. I had to learn where everything in AWS was located and figure out how Eventbridge connected to S3 and Lamdba which took a little bit to figutre out as well. 

## Connection to the Course

While I have taken this course we have been workign with CI pipelines where pushing the code to GITHUB makes it so then it will automatically trigger a test run. Eventrbidge has the same idea as the CI pipleine. When soemthing happens, soemthing else will automatically be triggeres or respond. The main difference between the two I think is that Eventrbridge works at the infrasture level and not just at the code level. You could imagine using it in a pipeline to trigger tests or aleets when a artifact gets uploaded to S3.


## My Experiment

To actually understand EventBridge I built a small experiment I 
called the which is a gam event logger. I am familiar with games and 
usually in games when soemthing happens soemthing else is triggered so it seemed fitting for my experiment. The idea that I came up with was a simulate a game where when I uploaded a file to the S3 it would represent a player action adn then Eventbridge would route that event to a landba function that would then respond. Kinda like a game announcer. 

The architecture for it:
S3 (file upload) → EventBridge (rule) → Lambda (game announcer)

The steps that I took:
1. Created a Lamdba function called eventbridge-test.
2. Created a S3 bucket with the Eventbridge notifcations allowed.
3. Created an Eventbridge rule that I called game-event-rule that was listening for object created events from the S3 that would then target the Lambda function.
4. Uploaded files that were names things like player1_killed dragon.txt that would trigger the rule
5. The Lamda code read the filename and responded correctly

Results:
When I uploaded player1_killed_dragon2.txt, the Lambda fired in under 2ms and printed the full announcer sequence in CloudWatch logs. I was so excited when it worked after getting the issues fixed. 
![CloudWatch logs showing the dragon slayer output](logskilldragon.png)
![EventBridge rule configuration](eventbridgerules.png)
![S3 bucket with uploaded file](bucket.png)

## What I Think

## Conclusion









## Topic Overview (what is it and how it works)

Definition:
- Event: a thing that happens, paritucaly on of importance
    - Event-driven architectures drive reliability and scalability
    - enable interaction between services

Amazon EventBridge is a serverless event bus that helps you build event-driven applications by connecting application components using data from a variety of sources. It routes the data to targets. It is a simple and consistant way to ingest, filter, transform and deliver events in real time wihout making it so then you need to manage underlying infrasturcture. 







can inlcude :

## Why its great
## Challenges
## Tools
## Connection to our Course
## Cool Facts
## What I think

## My Experiment

## Diagram

## Example Use Case

## Conclusion/Final Thoughts