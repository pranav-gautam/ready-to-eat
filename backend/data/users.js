import bcrypt from 'bcryptjs';



const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Shubhansu Jain',
        email: 'shub@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Siddhart Tiwari',
        email: 'kt@example.com',
        password: bcrypt.hashSync('123456', 10),
    },

]

export default users;