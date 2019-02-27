/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Column from '../../components/Column';
import H3 from '../../components/H3';
import H1 from '../../components/H1';
import Content from '../../components/Content';
import { Slack } from './slackapp';
import Chat, {
  Center,
  Input,
  Selected,
  NotSelected,
  Left,
  Image,
  SpaceBetween,
  Strong,
  SmallImage,
  MobileColumn,
  Toggle,
  ChatUser,
} from './Chat';

export class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      chats: null,
      channels: null,
      user: null,
      step: 'messages',
      selected: 'general',
      messages: null,
      mobile: false,
      toggle: false,
    };
    this.slack = Slack.getInstance();
    this.name = null;
    this.fullname = null;
    this.channel = null;
    this.chat = null;
  }

  componentDidMount() {
    window.addEventListener('resize', e => {
      if (window.visualViewport.width < 800) {
        this.setState({
          mobile: true,
          toggle: true,
        });
      } else {
        this.setState({
          mobile: false,
          toggle: false,
        });
      }
    });
    this.slack.load();
    try {
      this.slack.addUser('fullname1', 'name1');
      this.slack.addUser('fullname2', 'name2');
      this.slack.addUser('fullname3', 'name3');
      this.slack.addChannel('general', [...this.slack.users].map(e => e[0]));
      this.slack.addChannel('random', [...this.slack.users].map(e => e[0]));
      this.slack.addChat(['Slackbot']);
    } catch (e) {
      console.log({ e });
    }

    if (!this.slack.isLogged()) {
      this.setState({ step: 'login' });
    }
    const { users, chats, channels } = this.slack;
    this.setState({
      users,
      chats,
      channels,
    });
  }

  onLogin = () => {
    console.log({
      name: this.name.value,
      fullname: this.fullname.value,
    });
    try {
      this.slack.login(this.fullname.value, this.name.value);
      this.slack.save();
      this.setState({ step: 'messages' });
    } catch (e) {
      console.log({ e });
    }
    try {
      this.selectChannel('general').addMessage('Hello');
    } catch (e) {
      console.log({ e });
    }
  };

  onAddChannel = () => {
    this.setState({ step: 'addChannel' });
  };

  onSubmitChannel = () => {
    try {
      this.slack.addChannel(
        this.channel.value,
        [...this.slack.users].map(e => e[0]),
      );
      this.slack.save();
      this.setState({
        step: 'messages',
        channels: this.slack.channels,
      });
    } catch (e) {
      console.log({ e });
    }
    this.setState({ step: 'messages' });
  };

  selectChannel = id => {
    this.setState({
      selected: id,
      messages: this.slack.channels.get(id).messages,
    });
    return this.slack.channels.get(id);
  };

  selectChat = id => {
    this.setState({
      selected: id,
      messages: this.slack.chats.get(id).messages,
    });
  };

  onMessage = event => {
    if (event.charCode === '13') {
      if (this.slack.channels.has(this.state.selected)) {
        this.slack.channels
          .get(this.state.selected)
          .addMessage(event.target.value);
        this.setState({
          messages: this.slack.channels.get(this.state.selected).messages,
        });
      } else {
        this.slack.chats
          .get(this.state.selected)
          .addMessage(event.target.value);
        this.setState({
          messages: this.slack.chats.get(this.state.selected).messages,
        });
      }
      this.slack.save();
      event.target.value = '';
    }
  };

  toggleMobile = () => {
    this.setState(prev => ({
      mobile: !prev.mobile,
    }));
  };

  addChatStart = () => {
    this.setState({
      step: 'addChat',
    });
  };

  onSubmitChat = () => {
    try {
      this.slack.addChat([...this.chat.value.split(',')]);
      this.slack.save();
      this.setState({
        step: 'messages',
        chats: this.slack.chats,
      });
    } catch (e) {
      console.log({ e });
    }
    this.setState({ step: 'messages' });
  };

  addChatUser = id => {
    this.chat.value = [
      ...new Set([...this.chat.value.split(','), id].filter(e => e)),
    ].join(',');
  };

  render() {
    const {
      users,
      chats,
      channels,
      step,
      selected,
      messages,
      mobile,
      toggle,
    } = this.state;
    console.log({ state: this.state });
    let user = null;
    try {
      user = this.slack.user;
    } catch (e) {
      console.log({ e });
    }
    console.log({ user });
    return (
      <article>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="An application" />
        </Helmet>
        {step === 'login' && (
          <Content>
            <Center>
              <img src="/image.png" />
              <div>
                <Input
                  required
                  ref={r => (this.name = r)}
                  placeholder="name"
                  title="Your name"
                />
              </div>
              <div>
                <Input
                  required
                  ref={r => (this.fullname = r)}
                  placeholder="fullname"
                  title="Your full name"
                />
              </div>
              <Input
                onClick={this.onLogin}
                type="button"
                value="Submit"
                title="Submit data"
              />
            </Center>
          </Content>
        )}
        {step === 'addChannel' && (
          <Content>
            <Center>
              <Left>
                <h2>Create a channel</h2>
                Name
              </Left>
              <div>
                <Input
                  required
                  ref={r => (this.channel = r)}
                  placeholder="general"
                  title="New channel name"
                />
              </div>
              <Input
                onClick={this.onSubmitChannel}
                type="button"
                value="Create Channel"
              />
            </Center>
          </Content>
        )}
        {step === 'addChat' && (
          <Content>
            <Center>
              <Left>
                <h2>Direct Messages</h2>
              </Left>
              <div>
                <Input
                  disabled
                  ref={r => (this.chat = r)}
                  placeholder="users"
                  title="New chat users"
                />
              </div>
              <Left>
                {users &&
                  [...users].map(e => {
                    const [k, v] = e;
                    return (
                      <ChatUser key={k} onClick={() => this.addChatUser(k)}>
                        <img src="/ava.png" />
                        {`${v.name} - ${k}`}
                      </ChatUser>
                    );
                  })}
              </Left>
              <Input
                onClick={this.onSubmitChat}
                type="button"
                value="Create Chat"
              />
            </Center>
          </Content>
        )}
        {step === 'messages' && (
          <Content>
            <MobileColumn mobile={mobile}>
              {toggle && <Toggle onClick={this.toggleMobile}>=</Toggle>}

              <SpaceBetween>
                <Strong>
                  Klassroom <img src="/dropdown.png" />
                </Strong>
                <Image src="/notify.png" />
              </SpaceBetween>
              <NotSelected>
                <SmallImage src="/green-circle.png" />
                {(user && user.username) || ''}
              </NotSelected>
              <H3>
                <Image src="/all-threads.png" />
                All Threads
              </H3>
              <SpaceBetween onClick={this.onAddChannel}>
                <strong>Channels</strong>
                <Image src="/plus.png" />
              </SpaceBetween>
              {channels &&
                [...channels].map(e => {
                  const [k, v] = e;
                  return k === selected ? (
                    <Selected key={v.title}># {v.title}</Selected>
                  ) : (
                    <NotSelected
                      onClick={() => this.selectChannel(k)}
                      key={v.title}
                    >
                      # {v.title}
                    </NotSelected>
                  );
                })}
              <H3 onClick={this.onAddChannel}>+ Add a channel</H3>
              <SpaceBetween onClick={this.addChatStart}>
                <strong>Direct Messages</strong>
                <Image src="/plus.png" />
              </SpaceBetween>
              {chats &&
                [...chats].map(e => {
                  const [k, v] = e;
                  return k === selected ? (
                    <Selected key={v.title}>{k}</Selected>
                  ) : (
                    <NotSelected onClick={() => this.selectChat(k)} key={k}>
                      {k}
                    </NotSelected>
                  );
                })}
              <SpaceBetween>
                <div>
                  + <Strong>Invite people</Strong>
                </div>
              </SpaceBetween>
              <SpaceBetween>
                <strong>Apps</strong>
                <Image src="/plus.png" />
              </SpaceBetween>
            </MobileColumn>

            <Chat items={messages} onMessage={this.onMessage} />
          </Content>
        )}
      </article>
    );
  }
}

export default HomePage;
