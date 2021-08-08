class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection("chats");
    this.unsub;
  }

  async addChat(message) {
    const now = new Date();
    const chat = {
      message: message,
      username: this.username,
      room: this.room,
      createdAt: firebase.firestore.Timestamp.fromDate(now),
    };
    //save the chat doc to db
    const response = await this.chats.add(chat);
    return response;
  }

  getChats(cb) {
    this.unsub = this.chats
      .where("room", "==", this.room)
      .orderBy("createdAt")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((p) => {
          if (p.type === "added") {
            //upadte ui
            cb(p.doc.data());
          }
        });
      });
  }

  updateName(username) {
    this.username = username;
    localStorage.setItem("username", username);
  }

  updateRoom(room) {
    this.room = room;
    if (this.unsub) {
      this.unsub();
    }
  }

 
}
