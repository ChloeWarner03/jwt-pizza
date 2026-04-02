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

I learned that an event is just something that occur. For example, a file being uploaded, 
a database being updated, or even just a user clocking buttons. Eventbridge is the middleman, 
it directs where things go and basically says when THIS happens, do THAT. 

The core components are:
- **Event Bus: the pipeline that receives and routes events**
- **Rules:filters that decide which events to act on and where to send them**
- **Targets:the services that receive the event and do something with it (like a Lambda function)**

EventBridge supports events from AWS services, your own applications, 
and third-party SaaS providers, making it a flexible backbone for 
event-driven architectures.

## Why It's Great

The biggest thing that stood out to me is that nothing has to be 
manually triggered. You set up the rule once and it just works — 
automatically, in real time, every time the event happens. There's 
no polling, no waiting, no extra code to wire services together.

It also scales automatically. Whether one event fires or a million, 
EventBridge handles it without you doing anything differently.

## Cool Facts

## Challenges

## Connection to the Course

## My Experiment

To actually understand EventBridge I built a small experiment I 
called the **Game Event Logger**. The idea was to simulate a game 
where uploading a file to S3 represents a player action, and 
EventBridge routes that event to a Lambda function that responds 
like a game announcer.

**The architecture:**
S3 (file upload) → EventBridge (rule) → Lambda (game announcer)

**Setup steps:**
1. Created a Lambda function (`eventbridge-test`) in Python 3.12
2. Created an S3 bucket with EventBridge notifications enabled
3. Created an EventBridge rule (`game-event-rule`) listening for 
   `Object Created` events from S3, targeting the Lambda function
4. Uploaded files named things like `player1_killed_dragon.txt` 
   to trigger the rule

**The Lambda code read the filename and responded accordingly:**
- `dragon` → "A dragon has been slain! +500 XP. ACHIEVEMENT 
  UNLOCKED: Dragon Slayer 🐉"
- `treasure` → "Treasure found! +200 Gold awarded!"
- `boss` → "BOSS BATTLE INITIATED! Prepare for combat!"

**Results:**

When I uploaded `player1_killed_dragon2.txt`, the Lambda fired 
in under 2ms and printed the full announcer sequence in CloudWatch 
logs. Seeing it actually work was really satisfying — especially 
after troubleshooting the filename issues to get it right.

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