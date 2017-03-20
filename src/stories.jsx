import React from 'react';
import { storiesOf } from '@kadira/storybook';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

import About from 'components/About';
import Card, {
  CardBlock,
  CardColumns,
  CardDeck,
  CardFooter,
  CardGroup,
  CardHeader,
  CardImage,
  CardImageOverlay,
  CardLink,
  CardQuote,
  CardTitle,
  CardSubtitle,
  CardText,
  variants,
} from 'components/bootstrap/Card';
import LoadingIndicator from 'components/LoadingIndicator';

/**
 * Shortcut to add a story.
 * @param {string} name Component name
 * @param {string} [description] Title to give the story
 * @param {function} render Function that returns a React component to render
 * @return {Object} Story instance
 */
function addStory(name, description = 'Default appearance', render) {
  return storiesOf(name, module).add(description, render);
}

/**
 * Shortcut to add a basic story.
 * @param {string} name Component name
 * @param {Object} Component React component
 * @param {Object} [props] Props to pass to component
 * @param {string} [text] Component child content
 * @return {Object} Story instance
 */
function addSimpleStory(name, Component, props = {}, text) {
  return addStory(name, 'Default appearance',
                  () => <Component {...props}>{text}</Component>);
}

addSimpleStory('About', About);

const cardStory = addSimpleStory('Card', Card, { block: true }, 'Card')
  .add('Inverse', () => (
    <Card
      block
      inverse
      style={{
        background: '#333',
      }}
    >
      <CardText>Card</CardText>
    </Card>
  ));

variants.forEach((variant) => {
  cardStory.add(`Variant: ${variant}`, () => (
    <Card block inverse={variant !== 'secondary'} variant={variant}>
      <CardText>Card</CardText>
    </Card>
  ))
    .add(`Outline variant: ${variant}`,
      () => <Card block outline variant={variant}>Card</Card>,
    );
});

cardStory.add('Complete example', () => (
  <Card>
    <CardHeader>Card header</CardHeader>
    <CardBlock>
      <CardTitle>Card title</CardTitle>
      <CardSubtitle>Card subtitle</CardSubtitle>
      <CardText>Card text</CardText>
      <CardQuote>
        Card quote
        <footer>
          <cite>Michael Scott</cite>
          , Regional Manager
        </footer>
      </CardQuote>
    </CardBlock>
    <CardBlock>
      <CardLink href="#">Card link</CardLink>
      <CardLink href="#">Second link</CardLink>
    </CardBlock>
    <CardFooter>Card footer</CardFooter>
  </Card>
));

addStory('CardColumns', 'Complete example', () => {
  let i = 0;

  return (
    <CardColumns>
      {Array(12).fill().map(() => {
        const card = (
          <Card key={i} style={{ minHeight: 26 * (i + 1) }}>Card {i + 1}</Card>
        );

        i += 1;

        return card;
      })}
    </CardColumns>
  );
});
addStory('CardDeck', 'Complete example', () => (
  <CardDeck>
    <Card>Card 1</Card>
    <Card>Card 2</Card>
    <Card>Card 3</Card>
  </CardDeck>
));
addStory('CardGroup', 'Complete example', () => (
  <CardGroup>
    <Card>Card 1</Card>
    <Card>Card 2</Card>
    <Card>Card 3</Card>
  </CardGroup>
));
addStory('CardImage', 'Complete example', () => (
  <Card style={{ maxWidth: 202 }}>
    <CardImage position="top" src="https://unsplash.it/200" />
    <CardBlock>Top</CardBlock>
    <CardImage src="https://unsplash.it/200/300" />
    <CardBlock>Bottom</CardBlock>
    <CardImage position="bottom" src="https://unsplash.it/200/250" />
  </Card>
));
addStory('CardImageOverlay', 'Complete example', () => (
  <Card inverse style={{ maxWidth: 202 }}>
    <CardImage src="https://unsplash.it/200/250" />
    <CardImageOverlay>
      <CardText>
        CardImageOverlay
      </CardText>
    </CardImageOverlay>
  </Card>
));

addSimpleStory('LoadingIndicator', LoadingIndicator);
