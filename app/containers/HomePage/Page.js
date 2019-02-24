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
import Chat, { Center, Input, Selected, NotSelected, Left } from './Chat';

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
    };
    this.slack = Slack.getInstance();
    this.name = null;
    this.fullname = null;
    this.channel = null;
  }

  componentDidMount() {
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

  componentWillUnmount() {
    // this.slack.save()
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
    try{
      this.selectChannel('general').addMessage('Hello')
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
  };

  selectChannel = id => {
    this.setState({
      selected: id,
      messages: this.slack.channels.get(id).messages,
    })
    return this.slack.channels.get(id);
  };
  
  selectChat = id => {
    this.setState({
      selected: id,
      messages: this.slack.chats.get(id).messages,
    })
  };

  onMessage = event => {
    if (event.charCode == '13') {
      this.slack.channels
        .get(this.state.selected)
        .addMessage(event.target.value);
      this.slack.save()
      this.setState({
        messages: this.slack.channels.get(this.state.selected).messages,
      })
      event.target.value = ''
    }
  };

  render() {
    const { chats, channels, step, selected, messages } = this.state;
    console.log({ state: this.state });
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
                <Input required ref={r => this.name = r} placeholder="name" 
                  title="Your name"
                />
              </div>
              <div>
                <Input required ref={r => this.fullname = r} 
                placeholder="fullname" title="Your full name" />
              </div>
              <Input onClick={this.onLogin} type="button" value="Submit"
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
                <Input required ref={r => this.channel = r} 
                  placeholder="general" title="New channel name" />
              </div>
              <Input onClick={this.onSubmitChannel} type="button" 
                value="Create Channel" />
            </Center>
          </Content>
        )}
        {step === 'messages' && (
          <Content>
            <Column>
              <H1>Klassroom</H1>
              <H3 onClick={this.onAddChannel}>Channels +</H3>
            {channels &&
                [...channels].map(e => {
              const [k, v] = e;
              return k === selected ? (
                    <Selected key={v.title}># {v.title}</Selected>
                  ) : (
                    <NotSelected onClick={() => this.selectChannel(k)} key={v.title}>
                      # {v.title}
                    </NotSelected>)
            }
            )}
              <H3>Direct Messages +</H3>
              {chats &&
                [...chats].map(e => {
                  const [k, v] = e;
                  return k === selected ? (
                    <Selected key={v.title}>{k}</Selected>
                  ) : (
                    <NotSelected onClick={() => this.selectChat(k)} key={k}>
                      {k}
                    </NotSelected>)
                })}
            </Column>
            <Chat items={messages} onMessage={this.onMessage} />
          </Content>
        )}
      </article>
    );
  }
}

export default HomePage;
