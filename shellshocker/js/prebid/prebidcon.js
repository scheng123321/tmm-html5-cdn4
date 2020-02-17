/* 
* Prebid Custom Configuration
* Author: Ascendeum
* Last updated: Dec 31 2019
* SS Dev updated Dec 31 2019
*/
// 'use strict';

// Detect Window Width
const detectWidth = function() {
        return window.screen.width || window.innerWidth || window.document.documentElement.clientWidth || Math.min(window.innerWidth, window.document.documentElement.clientWidth) || window.innerWidth || window.document.documentElement.clientWidth || window.document.getElementsByTagName('body')[0].clientWidth;
    },
// Detect Device Category
    detectDevice = function() {
        var width = detectWidth();
        if(width >= 992) return 'Desktop';
        else if(width >= 768) return 'Tablet';
        else return 'Mobile';
    };

var deviceWidth = detectWidth(),
    deviceName = detectDevice(),
    PREBID_TIMEOUT = 1000,
    FAILSAFE_TIMEOUT = 2000,
    dfpNetwork = 21743024831,
    displayAdLoadCount = 1,
    titleScreenAdCount = 1,
    loadingScreenAdCount = 1,
    adsStart = new Date().getTime(),
    url = new URL(window.location.href),
    debugVal = (url.searchParams.get("pbjs_debug")=='true') ? true : false,
    /* DFP Config */
    googletag = googletag || {},
    pbjs = pbjs || {},
    /* A9 Vars */
    a9Slots = [],
    a9BidsBack = false,
    floortest_no = true;

if(deviceWidth <= 768) PREBID_TIMEOUT = 1500;

googletag.cmd = googletag.cmd || [];

googletag.cmd.push(function() { 
    googletag.pubads().disableInitialLoad();
});

pbjs.que = pbjs.que || [];

/* A9 Init */  
apstag.init({
    pubID: 'f1e42d2d-cc72-4aa3-bafc-56a1ea7df08a',
    adServer: 'googletag'
});



//Floortest KeyVal Targetting
window.floortest_no = floortest_no;
function setFloorTestTargeting(adUnitSlot){
  var randomNum = Math.random();
  var adSlot = googletag.pubads();
  if(adUnitSlot){
    adSlot = adUnitSlot;
  }

  if (randomNum > 0.8){
    //Call on click
    var subRandomNum = Math.random();
    if (subRandomNum > .75){
        adSlot.setTargeting("floortest", "4");
    } else if(subRandomNum > .50){
        adSlot.setTargeting("floortest", "3");
    } else if(subRandomNum > .25){
        adSlot.setTargeting("floortest", "2");
    } else {
        adSlot.setTargeting("floortest", "1");
    }
    window.floortest_no = false;
  } else {
    adSlot.setTargeting("floortest", "false");
  }
}

const adRenderedEvent = () => {
    return googletag.pubads().addEventListener('slotRenderEnded', (event) => {
        vueApp.disaplyAdEventObject(event);
    });
};

//All Respawn banner
var respawnAdSizes = [[970, 250], [970, 90], [728, 90], [300, 250], [300, 100]];
var adUnits = [{
    adunit: "Respawn_Banner",
    code: "div-gpt-ad-ShellShock_Respawn_Banner",
    mediaTypes: {
        banner: { sizes: respawnAdSizes },
    },
    bids: [{
        bidder: "appnexus",
        params: { placementId: 16466913 }
        },{
            bidder: "sovrn",
            params: { tagid: "620451" }
        },{
            bidder: "sovrn",
            params: { tagid: "620452" }
        },{
            bidder: "sovrn",
            params: { tagid: "620453" }
        },{
            bidder: "sovrn",
            params: { tagid: "620454" }
        }, {
            bidder: "openx",
            params: { unit: "540846146", delDomain: "shellshock-d.openx.net" }
        }, {
            bidder: "ix", params: { siteId: "431112", size: respawnAdSizes[0] }
        }, {
            bidder: "ix", params: { siteId: "431112", size: respawnAdSizes[1] }
        }, {
            bidder: "ix", params: { siteId: "431112", size: respawnAdSizes[2] }
        }, {
            bidder: "ix", params: { siteId: "431112", size: respawnAdSizes[3] }
        }, {
            bidder: "ix", params: { siteId: "431112", size: respawnAdSizes[4] }
    }],
}];

//Title AdUnits
var titleAdUnitsSizes = [[200, 200], [250, 250], [300, 250]];
var titleAdUnits = [{
    adunit: "ShellShockers_TitleScreen",
    code: "div-gpt-ad-ShellShockers_TitleScreen",
    mediaTypes: {
        banner: { sizes: titleAdUnitsSizes }
    },
    bids: [{
        bidder: "appnexus",
        params: { placementId: 18025487 }
    }, {
        bidder: "openx",
        params: { 
            unit: "540932260",
            delDomain: "shellshock-d.openx.net"
        }
    }, {
        bidder: "ix", params: { siteId: "441403", size: titleAdUnitsSizes[0] }
    }, {
        bidder: "ix", params: { siteId: "441403", size: titleAdUnitsSizes[1] }
    }, {
        bidder: "ix", params: { siteId: "441403", size: titleAdUnitsSizes[2] }
    }]
}];


//ChickenNugget AdUnits
var nuggetAdSizes = [[970, 250], [970, 90], [728, 90], [320, 50], [300, 250], [300, 100]];
var chickenNuggetAdUnits = [{
    adunit: "ShellShockers_Chicken_Nugget_Banner",
    code: "div-gpt-ad-ShellShockers_Chicken_Nugget_Banner",
    mediaTypes: {
        banner: { sizes: nuggetAdSizes }
    },
    bids: [{
        bidder: "appnexus",
        params: { placementId: 18025494 }
    }, {
        bidder: "openx",
        params: { unit: "540932263", delDomain: "shellshock-d.openx.net" }
    }, {
        bidder: "ix", params: { siteId: "431109", size: nuggetAdSizes[0] }
    }, {
        bidder: "ix", params: { siteId: "431109", size: nuggetAdSizes[1] }
    }, {
        bidder: "ix", params: { siteId: "431109", size: nuggetAdSizes[2] }
    }, {
        bidder: "ix", params: { siteId: "431109", size: nuggetAdSizes[3] }
    }, {
        bidder: "ix", params: { siteId: "431109", size: nuggetAdSizes[4] }
    }, {
        bidder: "ix", params: { siteId: "431109", size: nuggetAdSizes[5] }
    }]
}];

//Loading AdUnits
var loadingAdSizes = [[970, 250], [970, 90], [728, 90], [300, 250], [300, 100]];
var loadingAdUnits = [{
    adunit: "ShellShock_LoadingScreen",
    code: "div-gpt-ad-ShellShock_LoadingScreen",
    mediaTypes: {
        banner: { sizes: loadingAdSizes }
    },
    bids: [{
        bidder: "appnexus",
        params: { placementId: 17514968 }
    },{
        bidder: "sovrn",
        params: { tagid: "655160" }
    },{
        bidder: "sovrn",
        params: { tagid: "655161" }
    },{
        bidder: "sovrn",
        params: { tagid: "655162" }
    },{
        bidder: "sovrn",
        params: { tagid: "655163" }
    }, {
        bidder: "openx",
        params: { 
            unit: "540893697",
            delDomain: "shellshock-d.openx.net"
        }
    }, {
        bidder: "ix", params: { siteId: "431113", size: loadingAdSizes[0] }
    }, {
        bidder: "ix", params: { siteId: "431113", size: loadingAdSizes[1] }
    }, {
        bidder: "ix", params: { siteId: "431113", size: loadingAdSizes[2] }
    }, {
        bidder: "ix", params: { siteId: "431113", size: loadingAdSizes[3] }
    }, {
        bidder: "ix", params: { siteId: "431113", size: loadingAdSizes[4] }
    }]
}];

// Start HB
function loadAscAdDisplay() {
    if(displayAdLoadCount > 1){
        refreshAd(adUnits); //refresh ad 

    } else {
        prCall(adUnits);

    }

    displayAdLoadCount ++;
}

// Start title screen header bidding
function loadTitleAdDisplay() {
    if(titleScreenAdCount > 1){
        refreshAd(titleAdUnits); //refresh ad 

    } else {
        prCall(titleAdUnits);

    }

    titleScreenAdCount ++;
}

// Loading screen display ad
function displayLoadingScreenAd() {
    if(loadingScreenAdCount > 1){
        refreshAd(loadingAdUnits); //refresh ad 

    } else {
        prCall(loadingAdUnits);

    }

    loadingScreenAdCount ++;
}

// Start the nugget ad. No need for the nugget to refresh
function loadNuggetDisplayAd() {
    prCall(chickenNuggetAdUnits);
}

/* Refresh Ad */
function refreshAdBid(refreshAdUnitCodes, allAdUnits) {
    pbjs.que.push(function() {
        /* A9 Request Bids */
        var callA9Slots = [];
        var a9SlotLen = a9Slots.length - 1;
        var allAdUnitsLen = allAdUnits.length - 1;
        var refreshSlots = [];

        for (var j = 0; j <= allAdUnitsLen; j++) {
            for (var i = a9SlotLen; i >= 0; i--) {
                if(a9Slots[i].slotID == allAdUnits[j]['code']) callA9Slots.push(a9Slots[i]);
            }
        }

        if(callA9Slots && (callA9Slots.length > 0)){
            apstag.fetchBids({
                slots: callA9Slots,
                timeout: PREBID_TIMEOUT
            }, function(bids) {
                /* A9 Set Bids */
                apstag.setDisplayBids();
                if(debugVal) console.log('BDS back, refresh', bids);
            }); 
        }
        
        pbjs.requestBids({
            timeout: PREBID_TIMEOUT,
            adUnitCodes: refreshAdUnitCodes,
            bidsBackHandler: function() {
                if(apstag) apstag.setDisplayBids();
                pbjs.setTargetingForGPTAsync(refreshAdUnitCodes);

                for (var j = 0; j <= allAdUnitsLen; j++) {
                    allAdUnits[j]['refreshcount'] = allAdUnits[j]['refreshcount']+1;
                    allAdUnits[j]['slot'].setTargeting('refreshIteration', (allAdUnits[j]['refreshcount']).toString() ); //Set Slot Tartgeting
                    refreshSlots.push(allAdUnits[j]['slot']);
					setFloorTestTargeting(allAdUnits[j]['slot']); //floor_test targeting
                }

                if(debugVal) { console.log('Refreshing Ad Unit Codes - '+JSON.stringify(refreshAdUnitCodes)); }
                googletag.pubads().refresh(refreshSlots);
            }
        });
    });
}


//Refresh Ad
function refreshAd(adunits){
    var refreshAdunitsCodes = [];
    var refreshAdunits = [];
    var len = adunits.length;
    for (var i = 0; i < len; i++) {
        if(elementInViewport(adunits[i]['code'])){
            refreshAdunitsCodes.push(adunits[i]['code']);
            refreshAdunits.push(adunits[i]);
        }
    }
    if(refreshAdunitsCodes.length > 0){
        refreshAdBid(refreshAdunitsCodes, refreshAdunits);
    }
}

// //Check Element Visibility
function elementInViewport(elId) {
    if(debugVal) { console.log('check if element in view: '+elId) }
    var el = document.getElementById(elId);
    if(el){
        const elBounding = el.getBoundingClientRect();
        return (
            elBounding.top >= 0 &&
            elBounding.left >= 0 &&
            elBounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            elBounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}

function prCall(adunits) {
    googletag.cmd.push(function() {
        var slots = [];
        //Prebid Ad Units
        if(adunits){
            for (var i = 0, len = adunits.length; i < len; i++) {
                adunits[i]['slot'] = googletag.defineSlot('/'+dfpNetwork+'/'+adunits[i].adunit, adunits[i].mediaTypes.banner.sizes, adunits[i].code).addService(googletag.pubads());
                googletag.display( adunits[i].code );
                slots.push(adunits[i]['slot']);
            }
        }

        // get newly generated IDs - or you can store them in array above of course
        var slotCodes = slots
            .map( function( slot ) { return slot.getSlotElementId() || ''; } )
            .filter( function( id ) { return id; } );


        pbjs.que.push(function() { 
            pbjs.setConfig({
                debug: debugVal,
                cache: { url: false },
                priceGranularity: "high",
                bidderSequence: "random"
            });
            pbjs.addAdUnits(adUnits);
            pbjs.requestBids({
                adUnitCodes: slotCodes,
                bidsBackHandler: function(bidResponses) {
                    pbjs.setTargetingForGPTAsync( slotCodes );
                    googletag.pubads().refresh( slots );
                },
                timeout: PREBID_TIMEOUT
            });
        });
        // pbjs.timeStart = adsStart; 

        /* A9 Slots */
        if(adUnits){
            if(apstag){
                for (var i = 0, len = adUnits.length; i < len; i++) {
                    a9Slots.push({
                        slotID: adUnits[i].code, 
                        slotName: dfpNetwork+'/'+adUnits[i].adunit, 
                        sizes: adUnits[i].mediaTypes.banner.sizes
                    });
                }
            }
        }

        /* A9 Request Bids */
        apstag.fetchBids({
            slots: a9Slots,
            timeout: PREBID_TIMEOUT
        }, function(bids) {
            /* A9 Set Bids */
            apstag.setDisplayBids();
            if(debugVal) console.log('BDS back',(new Date()).getTime()-adsStart,bids);
            a9BidsBack = true;
        });


        // Define non prebid adunits to DFP
        googletag.cmd.push(function() {
            //Floortest targeting
            setFloorTestTargeting(false);

            // Init DFP
            googletag.pubads().enableSingleRequest();
            googletag.pubads().collapseEmptyDivs();
            googletag.enableServices();
        });

    });
}