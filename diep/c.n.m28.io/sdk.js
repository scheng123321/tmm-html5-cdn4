m28n=(function(window){var BASE_URL="https://api.n.m28.io";var isSecure=window.location.protocol!="http:";function findServers(endpoint,options,cb){if(typeof options=='function'){cb=options;options={};}else{options=options||{};}
var version=options.version;get(BASE_URL+"/endpoint/"+endpoint+"/findEach/"+(version?"?version="+version:""),cb);}
function findRegionPreference(regions,options,cb){if(typeof options=='function'){cb=options;options={};}
options=options||{};options.points=options.points||10;if(typeof options.timeout==="undefined"){options.timeout=isSecure?7000:5000;}
findServers("latency",null,function(err,r){if(err)return cb(err);var points={};var wss=[];for(var region in r.servers){(function(region){if(regions.indexOf(region)==-1)return;var info=r.servers[region];var host=isSecure?(info.id+".s.m28n.net"):(info.ipv4||("["+info.ipv6+"]"));var protocol=(isSecure?"wss:":"ws:");var ws=new WebSocket(protocol+"//"+host);wss.push(ws);ws.binaryType='arraybuffer';ws.onopen=function(){var u8=new Uint8Array(1);u8[0]=0x00;ws.send(u8.buffer);}
ws.onmessage=function(message){var u8=new Uint8Array(message.data);if(u8[0]==0x00){points[region]=(points[region]||0)+1;if(points[region]>=options.points)return done();ws.send(message.data);}}
ws.onerror=function(err){console.warn(err);}
ws.onclose=function(){var i=wss.indexOf(ws);if(i!=-1){wss.splice(i,1);if(wss.length==0){done();}}}})(region);}
if(wss.length==0){return cb("No latency servers in selected regions");}
var timeout;var done=function(){done=function(){};clearTimeout(timeout);for(var i=0;i<wss.length;++i){try{var ws=wss[i];ws.onopen=null;ws.onmessage=null;ws.onerror=null;ws.onclose=null;ws.close();}catch(e){}}
var arr=[];for(var region in points){arr.push({region:region,points:points[region]});}
arr.sort(function(a,b){return b.points-a.points;});var regions=arr.map(function(obj){return obj.region;});if(regions.length==0){return cb("Latency testing failed, no servers replied to probes in time");}
cb(null,regions);};timeout=setTimeout(done,options.timeout);});}
function findServerPreference(endpoint,options,cb){if(typeof options=='function'){cb=options;options={};}
findServers(endpoint,options,function(err,r){if(err)return cb(err);if(!r)return cb("Unknown error");if(!r.servers)return cb("Invalid response");var availableRegions=[];for(var region in r.servers){availableRegions.push(region);}
if(availableRegions.length==0){cb("Couldn't find any servers in any region");return;}
if(availableRegions.length==1){for(var region in r.servers){cb(null,[r.servers[region]]);return;}}
findRegionPreference(availableRegions,options,function(err,regionList){if(err)return cb(err);var serverList=regionList.map(function(region){return r.servers[region];});cb(null,serverList);});});}
function findServerByID(id,cb){if(typeof id!="string")throw new Error("ID must be a string");if(!/^[0-9a-zA-Z]+$/.test(id)){setTimeout(function(){cb("Invalid server ID");},0);return;}
get(BASE_URL+"/server/"+id,cb);}
function get(url,cb){ajax(url,"GET",null,cb);}
function post(url,body,cb){ajax(url,"POST",typeof body=='string'?body:JSON.stringify(body),cb);}
function ajax(url,method,body,cb){var r=new XMLHttpRequest();r.open(method,url,true);r.onerror=function(err){if(cb)cb(err);cb=null;}
r.onreadystatechange=function(){if(r.readyState!=4)return;var obj;try{obj=JSON.parse(r.responseText);}catch(e){if(cb)cb("Failed to parse body. Error: \""+(e.message||e).toString()+"\". Content: "+r.responseText);cb=null;return;}
if(r.status>=200&&r.status<=299&&!obj.error){if(cb)cb(null,obj);}else{if(cb)cb(obj.error||"Non 2xx status code");}
cb=null;};r.send(body);}
return{findServers:findServers,findRegionPreference:findRegionPreference,findServerPreference:findServerPreference,findServerByID:findServerByID,setBaseURL:function(v){BASE_URL=v;},};})(window);