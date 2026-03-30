# Curiosity Report: Amazon EventBridge

## Why I Was Curious About Amazon EventBridge

My dad, Daniel Warner, is a software developer for the National Park 
Service. When I was visiting him, I got to sit in on a presentation 
from an AWS representative. They spent a lot of time talking about 
Amazon EventBridge. I didn't really understand what it was, why it 
was needed, or what its purpose was — and that stuck with me. I 
wanted to actually figure out how it worked, so I decided to make 
it my curiosity report topic.

## What Is Amazon EventBridge?

Amazon EventBridge is a serverless event bus. That means it listens 
for things that happen — called events — and automatically routes 
them to other services without you having to manually trigger 
anything or manage any servers.

An event is just something that occurs, like a file being uploaded, 
a database being updated, or a user clicking a button. EventBridge 
sits in the middle and says "when THIS happens, do THAT."

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