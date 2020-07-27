(function(){var worker=new Worker(getWorkerPath());var nextJobID=0;var workerCallbacks={};function solve(prefix,difficulty,cb){var id=nextJobID++;worker.postMessage([id,"solve",prefix,difficulty]);workerCallbacks[id]=cb;}
worker.onmessage=function(e){var data=e.data;var id=data[0];workerCallbacks[id].apply(null,data.slice(1));}
function getWorkerPath(){return window.location.protocol+"//"+window.location.host+window.location.pathname+"pow_worker.js";}
window.m28=window.m28||{};window.m28.pow={solve:solve};})();