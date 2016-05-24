(function(){
   console.log("started");

   if ('serviceWorker' in navigator) {
          console.log('found serviceworker');
          navigator.serviceWorker.register('service-worker.js');
   }
})();