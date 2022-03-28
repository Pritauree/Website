const mongoose = require('mongoose');

const friendsSchema = new mongoose.Schema({
    name: String,
    dob: String,
    imageurl: String,
    hobbies: [String]
})

const Friends = mongoose.model('Friend', friendsSchema) // First parameter corresponds to the name of the collection

readFriends = async (options={}) =>
{
    if (Object.entries(options).length == 0)
       return Friends.find().lean();
   
   else if (options.name)
   
       return Friends.findOne(options).lean();
   
   else
       return undefined;
}

createFriends = async (data) =>
{
    let FriendsDoc = new Friends(data);
    await FriendsDoc.save();
}

deleteFriends = async(name) =>
{
    const friend = await Friends.findOne({ name: name});
    await friend.remove();
}

updateFriends = async(data) =>
{
    var id = data._id;
    console.log(id);
    console.table(data);
    await Friends.findByIdAndUpdate({_id: id}, {...data})
}

exports.readFriends = readFriends;
exports.createFriends = createFriends;
exports.deleteFriends = deleteFriends;
exports.updateFriends = updateFriends;