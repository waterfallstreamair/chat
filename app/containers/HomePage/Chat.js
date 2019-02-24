import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Toggle = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-flow: row nowrap;
  align-items: flex-start;
  color: #fff;
  font-size: 2em;
  font-weight: bold;
  padding-right: 0.3em;
  padding-left: 0.1em;
  cursor: pointer;
`;

export const MobileColumn = ({ mobile, children }) => {
  const Styled = styled.div`
  width: ${mobile ? '2em' : '20em'};
  min-width: ${mobile ? '2em' : '20em'};
  display: flex;
  justify-content: flex-start;
  flex-flow: column nowrap;
  align-items: stretch;
  padding-top: 1em;
  padding-right: 0em;
  border-right: solid 1px #cfcfcf;
  background-color: #3F0E40;
  color: rgb(197,183,198);
  overflow: hidden;
`;
 return (<Styled>{children}</Styled>);
};

export const Strong = styled.strong`
  color: #fff;
  font-size: 1.2em;
`;

export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: row nowrap;
  align-items: flex-start;
  align-content: center;
  padding-right: 1em;
  padding-left: 2em;
  margin-top: 1.5em;
  cursor: pointer;
`;

export const Image = styled.img`
  height: 1.5em;
`;

export const SmallImage = styled.img`
  height: 1em;
  margin-right: 0.3em;
`;

export const Message = styled.input`
  width: 95%;
  height: 3em;
  border-left: solid 1px #ccc;
  margin-left: 1.5em;
  padding: 0.5em;
`;

export const NotSelected = styled.div`
  padding-left: 2em;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const Selected = styled.div`
  background-color: rgb(17, 100, 163);
  color: white;
  padding-left: 2em;
`;

export const Left = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-flow: column nowrap;
  align-items: flex-start;
  width: 30em;
`;

export const Center = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-flow: column nowrap;
  align-items: center;
  margin-left: 2em;
  margin-top: 2em;
  width: 100%;
  padding-top: 2em;
`;

export const Input = styled.input`
  width: 30em;
  height: 4em;
  border: solid 1px #eee;
  border-radius: 0.5em;
  margin-bottom: 0.5em;
  padding: 0.4em;
  &:hover {
    background-color: #eee;
  }
`;

export const Table = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-flow: column nowrap;
  align-items: stretch;
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-flow: row wrap;
  align-items: flex-start;
  height: auto;
  margin-bottom: 2em;
  margin-left: 0.5em;
`;

export const MessageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: row nowrap;
  align-items: center;
  align-content: stretch;
  height: 3em;
  color: #999;
  border: solid 1px #cccccc;
  border-radius: 0.5em;
  font-weight: bold;
  margin: 0.5em;
  padding-left: 1.5em;
  padding-right: 0.5em;
`;

export const User = styled.span`
  font-weight: bold;
`;

export const Text = styled.div`
  width: 100%;
`;

export const Date = styled.span`
  color: #ccc;
  font-size: 0.8em;
  margin-left: 0.5em;
`;

export const Actions = styled.div`
  width: 2em;
`;

const Chat = ({ items, onMessage }) => (
  <Table>
    {items &&
      items.map(e => {
        console.log({ items, e });
        return (
          <Row key={`title-${e.id}`}>
            <img src="/ava.png" />
            <div>
            <User>{e.userID}</User>
            <Date>{e.date.toLocaleTimeString()}</Date>
            <Text>{e.text}</Text>
            </div>
          </Row>
        );
      })}
      <MessageWrapper>+
      <Message placeholder="Message" onKeyPress={onMessage} />
      <Actions>@ :)</Actions>
      </MessageWrapper>
  </Table>
);

export default Chat;
