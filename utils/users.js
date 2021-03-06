
const users = [];

// join user to the chat

function userJoin(id, username, room) {
    const user = { id, username, room };
    users.push(user);
    return user;
}

function getCurrentUser(id) {
    return users.find(user => user.id === id);
}


// when user leave

function userLeave(id) {

    const index = users.findIndex(user => user.id === id);
    if (index != -1) {
        return users.splice(index, 1)[0];
    }
}

// get room user

function getRoomUser(room) {

    return users.filter((user) => user.room === room)
}
module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUser
}