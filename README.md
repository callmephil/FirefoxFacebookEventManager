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
### Priority High
* [x] Implement Async / Await
* [x] (Bug Fix) Return Correct Array to Phase 2
#### Phase 2
* [x] Auto Open urls on new Tab | 1 hours
#### Phase 3
* [ ] Import URL LIST From CSV | Estimated 3 hours

#### Priority Medium
* [x] Add Timer between requests | 4 hours
* [ ] Calculate Timer between requests
* [ ] Remove Tabs limit Restriction
* [ ] Implement Try/Catch debugging

#### Priority Low
* [ ] U.I For Extension
* [ ] Implement Cache System (For non interesting events)

### Done
* [x] Research & Test ~ 21 hours
* [x] Firefox Extension files | 30 minutes
* [x] Main Event Page Scrapping | 3 hours
* [x] Main Event Page Subpages links Scrapping | 3 hours
* [x] All Links Analysis | 2 hours
* [x] Analysis Filtering on already Interrested Events | 30 minutes
* [x] Confirm Working Data | 5 minutes / test

### Postponed
* [x] Re-work Stage functions | 8 hours ~ Unexpected -!- `Unresolved` -!-  

## <Rescoping the project>
- Sat 26 6:00 P.M 