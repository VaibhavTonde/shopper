import bcrpt from 'bcrypt';

const users = [
    {
        name: 'user1',
        email: 'user1@abc.com',
        password: bcrpt.hashSync('123456', 10),
        contactNumber: 1234567890,
        userRole: 'customer',
    },
    {
        name: 'user2',
        email: 'user2@abc.com',
        password: bcrpt.hashSync('123456', 10),
        contactNumber: 1234567891,
        userRole: 'customer',
    },
    {
        name: 'admin1',
        email: 'admin1@abc.com',
        password: bcrpt.hashSync('123456', 10),
        contactNumber: 1234567891,
        userRole: 'admin',
    }
]

export default users;
