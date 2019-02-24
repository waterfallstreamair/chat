// Main App
export class Slack {
  constructor() {
    const instance = this.constructor.instance;
    if (instance) {
      return instance;
    }

    this.constructor.instance = this;

    this.userID = null;
    this.users = new Map();
    this.chats = new Map();
    this.channels = new Map();
  }

  static getInstance() {
    return new Slack();
  }

  get user() {
    return this.users.get(this.userID);
  }

  set user(newuser) {
    this.userID = newuser.id;
    this.users.set(newuser.id, newuser);
  }

  isLogged() {
    return this.userID && this.users.has(this.userID);
  }

  login(username, name) {
    this.logout();
    this.addUser(username, name);
    this.userID = username;
  }

  logout() {
    this.users.delete(this.userID);
    this.userID = null;
  }

  addUser(username, name) {
    if (this.users.has(username)) {
      throw new Error('user already exists');
    }
    const newuser = new Slack.User({ username, name });
    this.users.set(newuser.id, newuser);
  }

  addChannel(title, listusernames) {
    if (this.channels.has(title)) {
      throw new Error('This channel already exists');
    }

    const newchannel = new Slack.Chat({ title, users: listusernames });
    this.channels.set(newchannel.id, newchannel);
  }

  addChat(listusernames) {
    if (this.chats.has(Slack.Chat.generateID(listusernames))) {
      throw new Error('This chat already exists');
    }

    const newchannel = new Slack.Chat({ users: listusernames });
    this.chats.set(newchannel.id, newchannel);
  }

  save() {
    window.localStorage.setItem('slack_user', this.userID);
    window.localStorage.setItem('slack_users', JSON.stringify([...this.users]));
    window.localStorage.setItem('slack_chats', JSON.stringify([...this.chats]));
    window.localStorage.setItem(
      'slack_channels',
      JSON.stringify([...this.channels]),
    );
  }

  load() {
    const _userID = window.localStorage.getItem('slack_user');
    this.userID = _userID;
    const _users = JSON.parse(window.localStorage.getItem('slack_users'));
    if (_users && _users.length) {
      this.users.clear();
      for (const u of _users) {
        const u1 = u[1];
        try {
          this.addUser(u1.username, u1.name);
        } catch (e) {}
      }
    }

    const _channels = JSON.parse(window.localStorage.getItem('slack_channels'));
    if (_channels && _channels.length) {
      this.channels.clear();
      for (const u of _channels) {
        const newchannel = new Slack.Chat(u[1]);
        this.channels.set(newchannel.id, newchannel);
      }
    }

    const _chats = JSON.parse(window.localStorage.getItem('slack_chats'));
    if (_chats && _chats.length) {
      this.chats.clear();
      for (const u of _chats) {
        const newchat = new Slack.Chat(u[1]);
        this.chats.set(newchat.id, newchat);
      }
    }
  }
}

// Model Objects

Slack.Object = class {
  constructor() {
    this.id = null;
  }

  init(opts = {}) {
    if ('id' in opts) {
      this.id = opts.id;
    }
  }
};

Slack.User = class extends Slack.Object {
  constructor(opts = {}) {
    super();
    this.username = null;
    this.name = null;

    this.init(opts);
  }

  init(opts = {}) {
    super.init(opts);
    if ('username' in opts) {
      this.username = opts.username;
      this.id = this.username;
    }
    if ('name' in opts) {
      this.name = opts.name;
    }
  }

  toString() {
    return this.name;
  }
};

Slack.Chat = class extends Slack.Object {
  constructor(opts = {}) {
    super();
    this.is_channel = false;
    this.is_private = false;
    this.messages = [];
    this.users = [];

    this.init(opts);
  }

  init(opts = {}) {
    super.init(opts);

    this.users = [];
    if ('users' in opts) {
      this.users = opts.users;
    }

    if ('title' in opts) {
      this.title = opts.title;
      this.id = this.title;
      this.is_channel = true;
    } else {
      this.id = Slack.Chat.generateID(this.users);
    }

    this.messages = [];

    if ('messages' in opts) {
      for (const m of opts.messages) {
        this.messages.push(new Slack.Message(m));
      }
    }
  }

  toString() {
    if (is_channel) {
      return this.title;
    }
    const c = new Set();
    for (const username of opts.listusers) {
      c.add(Slack.getInstance().users.get(username).name);
    }
    return [...c].sort().join(', ');
  }

  static generateID(listusers) {
    const c = new Set();
    for (const username of listusers) {
      c.add(username);
    }
    return [...c].sort().join('|');
  }

  addMessage(text) {
    const m = new Slack.Message();
    m.userID = Slack.getInstance().userID;
    m.chatID = this.id;
    m.text = text;
    this.messages.push(m);
  }
};

Slack.Message = class extends Slack.Object {
  constructor(opts = {}) {
    super();
    this.userID = null;
    this.chatID = null;
    this.text = null;
    this.date = new Date();
    this.id = this.date.getTime();
    this.init(opts);
  }

  init(opts = {}) {
    super.init(opts);
    if ('text' in opts) {
      this.text = opts.text;
    }
    if ('date' in opts) {
      this.date = new Date(opts.date);
    }
    if ('chatID' in opts) {
      this.chatID = opts.chatID;
    }
    if ('userID' in opts) {
      this.userID = opts.userID;
    }
  }
};
