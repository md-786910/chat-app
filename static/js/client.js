
const socket = io("https://wechating-app.herokuapp.com/");
const chatform = document.getElementById("chat-form");
const right = document.querySelector(".right");

const { username, room } = Qs.parse(location.search.slice(1));
// console.log(username, room)

socket.emit("joinChat", { username, room });

socket.on("message", message => {
    // console.log(message)

    outputMessage(message);

    right.scrollTo = right.scrollHeight;
})
// get room and user

socket.on("roomUser", ({ users, room }) => {
    // console.log(users)
    // console.log(users, room)
    outputRoomUser(room);
    outputUser(users);
})

chatform.addEventListener("submit", (e) => {
    e.preventDefault();
    let msg = e.target.elements.msg.value;
    socket.emit("chatMessage", msg)

    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
})

function outputMessage(message) {
    // console.log("out ", message)
    let div1 = document.createElement("div");
    div1.classList.add("message");
    div1.innerHTML = `<pre><p class="dateTime"><span>${message.username}  </span>${message.time}</p></pre>
    <p> ${message.text}</p>`
    right.append(div1)

}

// room name to dom and user 

function outputRoomUser(room) {
    // let roomdiv = document.createElement("div");
    // roomdiv.classList.add("user")
    // roomdiv.innerHTML = ` <p id="Room">${room}</p>`

    document.querySelector(".roomname").innerHTML = room;
}

const userList = document.querySelector(".username")
function outputUser(users) {
    userList.innerHTML = `
${users.map(user => `<p>${user.username}</p>`).join("")}`;

}
