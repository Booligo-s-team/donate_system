const createError = require('http-errors');
const caches = require('./get_list_of_streamers');
const connection = require('../routes/db');

function delele_cache(){
    for(var key in caches.cache){
        delete caches.cache[key];
    }
}

function update_db(values,callback){
    const sql = "INSERT INTO donates(donater,amount,currency,streamer) VALUES ?";
    const query = connection.query(sql, values, (err, results) => {
        if (err) {
            callback(createError(err),null);
        }else
            delele_cache();
        callback(null,results);
    });
}
module.exports.update_db = update_db;
