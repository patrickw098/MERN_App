module.exports = {
    isEmpty: function(value){
        return (value === undefined || value === null || (typeof value === 'object' && Object.keys(value).length === 0) || (typeof value === 'string' && value.trim().length === 0));
    },

    //assumes that loc is stored in an object 
    getDistMiles(loc1, loc2){
        // var R = 6371e3; // metres
        var R = 3963; //miles
        var φ1 = loc1.lat.toRadians();
        var φ2 = loc2.lat.toRadians();
        var Δφ = (loc2.lat - loc1.lat).toRadians();
        var Δλ = (loc2.lon - loc1.lon).toRadians();

        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        var d = R * c;
    }

}