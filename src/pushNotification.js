/**
 * Created by JS on 25/12/2016.
 */

'use strict';
var FCM = require('fcm-push');
module.exports = (payload) =>{
    var fcm = new FCM(process.env.FCM_SERVER_KEY);
    var message = {
        to: payload.token,
        notification: {
            title: payload.title,
            body: payload.body,
        }
    };
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!");
            console.log(err);
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
};