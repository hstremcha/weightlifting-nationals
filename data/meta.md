# Data source and wrangling process

rovinces file ne_10m_admin_states_provinces.shp clipped to extend of Canada and converted to GeoJSON using QGIS 3.2.0:

`canada-provinces.geojson`

2014 USAW Nationals data downloaded on 24MAY19 from: `https://www.teamusa.org/usa-weightlifting/resources/results-archive#2014/`, start list downloaded as a pdf file.
-team listed, not state

2015 USAW Nationals data downloaded on 24MAY19from: `https://www.teamusa.org/USA-Weightlifting/Events/2015/August/13/National-Championships`, start list downloaded as pdf file.

2016 USAW Nationals data downloaded on 24MAY19 from: `https://www.teamusa.org/~/media/USA_Weightlifting/Documents/2016-Events/2016-National-Championships/05_04_16/01_Nationals_Olympic_Trials_Startlist.pdf?la=en`, the start list was downloaded as a pdf.
        
2017 USAW Nationals data downloaded on 24MAY19 from: `https://webpoint.usaweightlifting.org/wp15/Events2/ViewEvt.wp?EventID=72434&isPopup=&Tab=Results`

2018 USAW Nationals data downloaded on 24MAY19 from : `https://webpoint.usaweightlifting.org/wp15/Events2/ViewEvt.wp?EventID=107989&isPopup=&Tab=Results`

2019 USAW Nationals data downloaded on 24MAY19 from:`https://webpoint.usaweightlifting.org/wp15/Events2/ViewEvt.wp?EventID=202863&isPopup=&Tab=Results`

Census data from: `https://factfinder.census.gov/faces/tableservices/jsf/pages/productview.xhtml?src=bkmk`

The 2014 raw data had lifters listed by team affiliation, not state, so the team list was cross referenced against USAW's list of registered teams here: `https://www.teamusa.org/usa-weightlifting/clubs-lwc/find-a-club`.  Any lifters listed as unattached were researched by other meet results the same year that listed their team/ state affiliation.  2 data points were unable to be unlocated.  The remaining years all had lifter's states in the raw data. 

Data downloaded as pdfs were exported into spreadsheets, and all years were combined into one spreadsheet available in the data folder as "Master List.xslx."  Using Microsoft excel, the master list was made into a pivot table, and extracted the raw number of lifters per state per year. 

Census estimates were available for 2014, 2015, 2016, & 2017 from the Census Bureau, and the 2017 population estimates were used for calculating 2018 and 2019 percentages as well.  Once population data was downloaded form the Census Bureau, the percentage of lifters to their state population was calculated and plotted.
