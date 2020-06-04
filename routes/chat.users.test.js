var {ChatUsers} = require('./chat.users');

describe('ChatUsers', () => {
    var users;

    beforeEach(() => {
        users = new ChatUsers();
        users.users = [{
            id: '1',
            name: 'Ash',
            room: 'Baseball'
        },
        {
            id: '2',
            name: 'Bill',
            room: 'Baseball'
        },
        {
            id: '3',
            name: 'Bob',
            room: 'Football'
        }]
    });

    it('Should add new user', () => {
        var users = new ChatUsers();
        var user = {
            id: '123',
            name: 'Joe',
            room: 'Football'
        }
        var resUser = users.addChatUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('Should return names for baseball', () => {
        var userList = users.getChatUserList('Baseball');
        expect(userList).toEqual(['Ash', 'Bill']);
    });

    it('Should return names for Football', () => {
        var userList = users.getChatUserList('Football');
        expect(userList).toEqual(['Bob']);
    });

    it('Should find user', () => {
        var userID = '2';
        var user = users.getChatUser(userID);
        expect(user.id).toBe(userID);
    });

    it('Should remove user', () => {
        var userID = '1';
        var user = users.removeChatUser(userID);
        expect(user.id).toBe(userID);
        expect(users.users.length).toBe(2);
    });

});