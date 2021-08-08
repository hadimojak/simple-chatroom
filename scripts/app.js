const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const usernameForm = document.querySelector(".new-name");
const updateMessage = document.querySelector(".update-mssg");
const chatRooms = document.querySelector(".chat-rooms");

chatRooms.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute("id"));
    chatroom.getChats((chat) => {
      chatUI.render(chat);
    });
  }
});

usernameForm.addEventListener("submit", (e) => {
  e.preventDefault(true);
  const newName = usernameForm.name.value.trim();
  chatroom.updateName(newName);
  usernameForm.reset();

  updateMessage.innerText = ` your name was updated to ${newName}`;
  setTimeout(() => {
    updateMessage.innerText = "";
  }, 3000);
});

newChatForm.addEventListener("submit", (e) => {
  e.preventDefault(true);
  const message = newChatForm.message.value.trim();
  chatroom
    .addChat(message)
    .then(() => {
      newChatForm.reset();
    })
    .catch((err) => {
      console.log(err);
    });
});

//check if local storage have that name

const usename = localStorage.username ? localStorage.username : "anonimus";

const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("gaming", usename);

chatroom.getChats((data) => {
  chatUI.render(data);
});
