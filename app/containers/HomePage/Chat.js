import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Message = styled.input`
  width: 100%;
  height: 3em;
  border: solid 1px #ccc;
  border-radius: 0.5em;
  position: absolute;
  bottom: 0em;
`;

export const Selected = styled.div`
  background-color: #ccc;
  color: white;
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
`;

export const Table = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-flow: column nowrap;
  align-items: stretch;
  margin-left: 2em;
  margin-top: 2em;
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-flow: row nowrap;
  align-items: stretch;
  height: auto;
  margin-bottom: 2em;
  
`;

export const HeadRow = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-flow: row nowrap;
  align-items: stretch;
  height: 1.5em;
  color: #cccccc;
  border-bottom: solid 1px #ff9999;
  font-weight: bold;
`;

export const Cell = styled.span`
  width: 25em;
  padding: 0.5em;
  height: auto;
`;

export const Line = styled.div`
  width: 100%;
  height: auto;
  padding-left: 0.5em;
`;

const Chat = ({ items, onMessage }) => (
  <Table>
    <HeadRow>
      <Cell key="messages"></Cell>
    </HeadRow>
    {items &&
      items.map(e => {
        console.log({ items, e });
        return (
          <Row key={`title-${e.id}`}>
            <Line>
            <Cell key="user">{e.userID}</Cell>,
            <Cell key="date">{e.date.toLocaleString()}</Cell>
            <div>{e.text}</div>
            </Line>
          </Row>
        );
      })}
    <Message placeholder="message" onKeyPress={onMessage} />
  </Table>
);

export default Chat;
