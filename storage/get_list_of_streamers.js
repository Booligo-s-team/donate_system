const createError = require('http-errors');
const connection = require('../lib/database');
const cache =  require('../lib/cache');
/**
 * Getting a list of streamers.
 * @param {integer} page - page number the user wants to see.
 * @param {integer} size - the amount of streamers the user wants to see.
 * @param {function} callback - this is the function that will be executed after calling the main function (get_streamer_by_id) and executing its code contents.
 * returns {function} callback(results),results = it's data(what we get as a result of the main function) that will be used in the callback.
 */
function get_list_of_streamers(page,size,callback){
    const start_index = (page - 1) *size ;
    const sql = `SELECT * FROM personal_streamer_donations LIMIT ${start_index},${size}`;
    if (cache.has_propety(sql)) {
        callback(null,cache.get_cache()[sql]);
    }else {
        const query = connection.query(sql, (err, results) => {
            if (err) {
                callback(createError(err),null);
            }else
                cache.get_cache()[sql] = results;
            callback(null,results);
        });
    }
}
module.exports.get_list_of_streamers = get_list_of_streamers;
