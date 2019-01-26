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
* [ ] Scan Event Page to get Data
* [ ] Import URL LIST From CSV
* [ ] Export Data To File
#### Phase 2
* [ ] Render Data 
@Todo @Todo

#### Priority Medium
* [ ] Implement Cache System (For non interesting events)

#### Priority Low
* [ ] U.I For Extension

### Done
* [x] Firefox Extension files
* [x] Main Event Page Scrapping
* [x] Main Event Page Subpages links Scrapping
* [x] All Links Analysis
* [x] Analysis Filtering on already Interrested Events
* [x] Confirm Working Data