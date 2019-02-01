# Firefox Facebook Event Manager Extension

An Extension for firefox, that allow you to regroup all facebook events pages that you like into one.
The project is part of the www.hikcal.com project. 

## Installation
1. Clone this repository on your computer
2. Run `about:debugging` in firefox search bar
    > ! This will open a new page 
3. Click Load Temporary Add-On... And Select any file inside the cloned folder.
    > ! You should now see "Facebook Event Manager" as a loaded Extension.
4. Open the file `manifest.json` 
> 1. Search for `"matches": ["..."],`
> 2. Edit the link, once done save the file and reload the addon.
> 3. Once Reloaded get to that link. the addon should render there and nowhere else.
> 4. You know the Addon Loaded because there's Red Border on that page

[Tutorial in Video here](https://youtu.be/8YndtIYHMqU?t=212 "Tutorial in Video (Youtube)")

## Progression
### Priority High V.1.0
* [ ] Solve the `T` mystery `!!!`
* [ ] Re-Work HTML parsing process + (Understand why some  are skipped)
* [ ] Solve bugs listed in ErrorsLog
* [ ] Import URL LIST from external File | Estimated 3 hours

#### Priority Medium
* [ ] U.I For Extension
* [ ] Add Filtering Options

#### Priority Low
* [ ] Implement Shortcut [Interrested, UnInterrested]
* [ ] Implement Cache System (For non interesting events) | `Note: Urls changes store title text instead`

### Completed Task // V.0.5 | Deprecated
* [x] Research & Test ~ 21 hours
* [x] Firefox Extension files | 30 minutes
* [x] Main Event Page Scrapping | 3 hours
* [x] Main Event Page Subpages links Scrapping | 3 hours
* [x] All Links Analysis | 2 hours
* [x] Analysis Filtering on already Interrested Events | 30 minutes
* [x] Confirm Working Data | 5 minutes / test
* [x] Implement Async / Await
* [x] (Bug Fix) Return Correct Array to Phase 2
* [x] Auto Open urls on new Tab | 1 hours
* [x] Re-work Stage functions | 8 hours ~ Unexpected -!- `Unresolved` -!-  

> Real Time Spent 5 Days

### Completed Task // V.1.0
> Fully Re-thinked the Process
* [x] Convert Old Urls to mobile format
* [x] Add New Urls | Remove duplicates 
* [x] Fetch URL once per page || Optimization 
* [x] Handle Promise Correctly || Optimization
* [x] Implement Try/Catch debugging
* [x] Implement ErrorLogs 
* [x] Implement Timer
* [x] Calculate Timer Between requests
* [x] Implement Timer configuration
* [x] Remove Tabs limit Restriction
* [x] Implement Small Config + Removed Magic numbers
    > Interval | Logs | SubUrls

> Real Time Spent 1 Day

### Test Result :
#### // V.0.5
- URL Count : 1071
- URL Result Count : 87 => `Crash`
- Time : 7 minutes
- Interval : 300 ms
- ErrorLog : No
#### // V.1.0
- URL Count : 1071
- URL Result Count : 3571 => `Success`
- Time : 30 Minutes
- Interval : 300 ms
- ErrorLog : Yes | `149`
> Note : Re-running the test gives different result


#### Rescoping the project
- Sat 26 6:00 P.M 

#### Re-Work Algorithm From Scratch
- 1/2/2019 12:00 A.M > Commit Time.