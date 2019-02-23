/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import H3 from 'components/H3';
import Content from 'components/Content';
import messages from './messages';
import Wrapper from './Wrapper';

export default function NotFound() {
  return (
    <article>
      <Content>
        <Wrapper>
          <H3>
            <FormattedMessage {...messages.header} />
          </H3>
        </Wrapper>
      </Content>
    </article>
  );
}
