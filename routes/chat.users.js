class ChatUsers {
    constructor() {
        this.users = [];
    }

    addChatUsers(id, name, room) {
        var user = { id, name, room };
        this.users.push(user);
        return user;
    }

    removeChatUsers(id) {
        var user = this.getUser(id);

        if(user){
            this.users = this.users.filter(user => user.id !== id);
        }

        return user;
    }

    getChatUsers(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    getChatUsersList(room) {
        var users = this.users.filter((user) => user.room === room);
        var namesArr = users.map(user => user.name);
        return namesArr
    }

}

module.exports = { ChatUsers }