import React from 'react';
import { mount } from 'enzyme';

describe('Pattern component', () => {
  let Pattern;
  let Match;
  let matchers;

  beforeEach(() => {
    Pattern = require('../Pattern').default;
    Match = require('../Match').default;
    matchers = require('../matchers');
  });

  it('should render no items if there are no matches', () => {
    let wrapper = mount(<Pattern match={{}} />);

    expect(wrapper.children().length).toBe(0);

    wrapper = mount(
      <Pattern match={{ foo: 'bar' }}>
        <Match render={() => 1} />
      </Pattern>
    );

    expect(wrapper.children().length).toBe(0);

    wrapper = mount(
      <Pattern match={{ foo: 'bar' }}>
        <Match foo="baz" render={() => 1} />
      </Pattern>
    );

    expect(wrapper.children().length).toBe(0);

    wrapper = mount(
      <Pattern match={{ foo: 'bar' }}>
        <Match foo="foo" render={() => 0} />
        <Match foo="baz" render={() => 1} />
        <Match foo="foobar" render={() => 2} />
      </Pattern>
    );

    expect(wrapper.children().length).toBe(0);
  });

  it('should render each match that exists', () => {
    let wrapper = mount(
      <Pattern match={{ foo: 'bar' }}>
        <Match foo="bar" render={() => 0} />
      </Pattern>
    );

    expect(wrapper.children().length).toBe(1);

    wrapper = mount(
      <Pattern match={{ foo: 'bar' }}>
        <Match foo="bar" render={() => 0} />
        <Match foo="bar" render={() => 1} />
        <Match foo="bar" render={() => 2} />
      </Pattern>
    );

    expect(wrapper.children().length).toBe(3);
  });

  it('should render the first match if `first` is true', () => {
    const wrapper = mount(
      <Pattern match={{ foo: 'bar' }} first>
        <Match foo="bar" render={() => <p>0</p>} />
        <Match foo="bar" render={() => <p>1</p>} />
        <Match foo="bar" render={() => <p>2</p>} />
      </Pattern>
    );

    expect(wrapper.find(Match).text()).toBe('0');
    expect(wrapper.children().length).toBe(1);
  });

  it('should use the custom `isMatch` provided', () => {
    const isMatch = jest.fn(() => true);
    const match = { foo: 'bar' };
    const children = [
      {
        child: 0,
        render: () => <p>0</p>,
      },
      {
        child: 1,
        render: () => <p>1</p>,
      },
      {
        child: 2,
        render: () => <p>2</p>,
      },
    ];
    const wrapper = mount(
      <Pattern match={match} isMatch={isMatch}>
        {children.map(props => <Match key={props.child} {...props} />)}
      </Pattern>
    );

    expect(wrapper.children().length).toBe(3);
    expect(isMatch).toHaveBeenCalledTimes(3);

    children.forEach(props => {
      expect(isMatch).toHaveBeenCalledWith(match, props);
    });
  });

  it('should render non-Match components', () => {
    const wrapper = mount(
      <Pattern match={{ foo: 'bar' }}>
        <h1 />
        <Match foo="bar" render={() => <h2 />} />
        <h3 />
        <Match foo="baz" render={() => <h4 />} />
        <h4 />
        <Match foo="bar" render={() => <h5 />} />
        <h5 />
      </Pattern>
    );

    expect(wrapper.find('h1').length).toBe(1);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('h3').length).toBe(1);
    expect(wrapper.find('h4').length).toBe(1);
    expect(wrapper.find('h5').length).toBe(2);
  });

  it('should support nested matches with a custom matcher', () => {
    const match = {
      foo: {
        bar: 'baz',
      },
    };
    let wrapper = mount(
      <Pattern match={match} first>
        <Match foo={{ bar: 'baz' }} render={() => <div />} />
      </Pattern>
    );

    expect(wrapper.find('div').length).toBe(0);

    wrapper = mount(
      <Pattern match={match} isMatch={matchers.deepMatch} first>
        <Match foo={{ bar: 'baz' }} render={() => <div />} />
      </Pattern>
    );

    expect(wrapper.find('div').length).toBe(1);
  });
});
