const DEFAULT_EXPIRATION = 3600;
const redis = require('redis');
const redisClient = redis.createClient()

redisClient.on('connect', () => {
    console.log('connected redis successfully')
});
redisClient.on("error", (err) => {
    console.log('Error in redis:', err);
});

const getOrSetToRedis = async (key,Model,cb)=>{
    return new Promise((resolve,reject)=>{
        redisClient.get(key,async(error,data)=>{

            if(error) 
                return reject(error);

            if(data) 
                return resolve(JSON.parse(data));
            
            const freshData = await cb(Model);
            const password = freshData.password;
            console.log(Model);
            redisClient.setex(key,DEFAULT_EXPIRATION,JSON.stringify(freshData));
            return resolve(freshData);
        });
    })
};

const clearRedis = async (key, Model)=>{

    await redisClient.get(key,(error,data)=>{
        if(error)
        {
            console.log(error);
            return;
        }

        if(!data){
            console.log('Empty key',data);
        }
        redisClient.del(key,(error,result)=>{
            if(error){
                console.log(error);
                return;
            }

            console.log('Key deleted',result);
        })
    });
}

module.exports = {getOrSetToRedis, clearRedis}