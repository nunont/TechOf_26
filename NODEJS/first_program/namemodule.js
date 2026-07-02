

exports.hello = (first, last) => {
    return `Hello ${first} ${last}`;
}

exports.message = (sender, message, subject) => {
    console.log(`${subject}, you got a message from 
        ${sender}:${message}`)
}