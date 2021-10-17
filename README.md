# GI Dailies
__Version 1.0a-alpha__

GI Dailies is a chrome extension that will automatically grab your daily signin bonus from the webpage while you are surfing the web. Never miss another daily again! 

## Compatibility
|#  | Browser                 | Version       |
|-- | :---------------------- | :------------ |
|1  | Chrome                  | `v52 and Up`    |
|2  | Internet Explorer 11    | `NEVER`      |

## Screencaptures
TBD

## Installation
1) Navigate to `chrome://extensions/` on the **Chrome** App
2) Unzip the **GI Dailies** compress file into the applicable folder
3) Remove any old installations of **GI Dailies** if it exists
4) Turn on **Developer mode** found in the upper right hand corner of the Chrome tab
5) Press the **Load Unpacked** button and look for the folder you unzip earlier
6) Huzzah! You should be up and running. As you are surfing the web, the Daily checkin screen should appear within seconds.
7) After this, the timer will reset every 12AM Shanghai timezone (UTC+8) the next day

## Future Roadmaps
1) Pass messages from my background scripts to the content scripts so it knows to only run the script if a certain message was passed to it
1) Clean up the code
1) Better looping. Instead of using sleep to wait for state change, we should use a loop
1) Better testing

## ChangeLog
Build     | Description
----------|------------
0.1-alpha | Initial release. Working prototype.
0.2-beta  | Added flow handling for Mihoyo verification modal and fix bugs
0.3-beta  | Added more delay
1.0-alpha  | Major version release. Triggers on Shanghai Midnight (+8 UTC)
