/**
 * Created by JS on 25/12/2016.
 */

require('dotenv').config();
const queue = process.env.QUEUE;
const open = require('./helpers/amqp');
const pushNotification = require('./pushNotification');

(async () => {
    try{
        const connection = await open;
        const ok = await connection.createChannel();
        const channel = await ok;
        await channel.assertQueue(queue);
        await channel.consume(queue, async function (notifications) {
            let jsonMessage;
            let ret = true;
            if (notifications !== null) {
                try {
                    jsonMessage = JSON.parse(notifications.content.toString());
                } catch (e) {
                    ret = false;
                    console.error('JSON.parse fail', e);
                    await channel.nack(notifications, false, false);
                }
                if (ret)
                    ret = await pushNotification(jsonMessage);
                if (ret)
                    await channel.ack(notifications);
                else{
                    await channel.nack(notifications, false, false);
                }
            }
        })
    }catch (err){
        console.log(err);

    }

})();
