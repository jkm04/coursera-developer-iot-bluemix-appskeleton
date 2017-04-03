function Service(appClient) {
  this.appClient = appClient;
}
var oldTemp=29;
var responseString = 'Hello Coursera';
Service.prototype.connect = function() {
  this.appClient.on('connect', function() {
    this.appClient.subscribeToDeviceEvents();
  }.bind(this));
this.appClient.connect();
 this.appClient.on('deviceEvent', function(deviceType, deviceId, eventType, format, payload) {
       var payloadtemp = JSON.parse(payload);
       if(payloadtemp.d.hasOwnProperty('temperature')){
          console.log('Temperature Recieved is ' + payloadtemp.d.temperature);
          this.handleTempEvent(parseInt(payloadtemp.d.temperature));
      }
    }.bind(this));
};

Service.prototype.handleTempEvent = function(temp) {
if(oldTemp>=29 && temp<29){
oldTemp=temp;        
this.warningOn();
    }else if(oldTemp<=29 && temp>29){
oldTemp=temp;
        this.warningOff();
    }

}

Service.prototype.warningOn = function() {
        var myData={'screen' : 'on'};
        myData = JSON.stringify(myData);
        //var publish=new Service(this.appClient)
        this.publishDeviceCommand("RaspberryPi","b827ebbeaccc", "display", "json", myData);
       
    };

Service.prototype.warningOff = function() {
        var myData={'screen' : 'off'};
        myData = JSON.stringify(myData);
        //var publish=new Service(this.appClient)
        this.appClient.publishDeviceCommand("RaspberryPi","b827ebbeaccc", "display", "json", myData);
       
    };

module.exports = Service;
