import React from 'react';
import FormatMessage from './index';
import { IntlProvider } from 'react-intl';
import { mount } from 'enzyme';

function setup(props) {
  return mount(
    <IntlProvider locale={'en'} messages={{ 'test.title': 'Test' }}>
      <FormatMessage {...props} />
    </IntlProvider>
  );
}

describe('This Format message should', () => {
  it('should render without crashing', () => {

    const props = {
      id: 'test.title',
      values: { testNumber: 1 },
      defaultMessage: 'missing translation test.title'
    };

    const wrapper = setup(props);

    expect(wrapper.find('IntlProvider').exists()).toBe(true);
    expect(wrapper.find('FormatMessage').exists()).toBe(true);
    expect(wrapper.find('FormattedMessage').exists()).toBe(true);
  });

  it('should render IntlProvider component', () => {
    const props = {
      id: 'test.title',
      values: { testNumber: 1 },
      defaultMessage: 'missing translation test.title'
    };

    const wrapper = setup(props);
    const { locale, messages } = wrapper.find('IntlProvider').props();

    expect(locale).toBe('en');
    expect(messages['test.title']).toBe('Test');
  });

  it('should render FormatMessage component', () => {
    const props = {
      id: 'test.title',
      values: { testNumber: 1 },
      defaultMessage: 'missing translation test.title'
    };

    const wrapper = setup(props);
    const { id, values, defaultMessage } = wrapper.find('FormatMessage').props();

    expect(id).toBe('test.title');
    expect(values).toEqual({ testNumber: 1 });
    expect(defaultMessage).toBe('missing translation test.title');
  });

  it('should render FormattedMessage component', () => {
    const props = {
      id: 'test.title',
      values: { testNumber: 1 },
      defaultMessage: 'missing translation test.title'
    };

    const wrapper = setup(props);
    const { id, values, defaultMessage } = wrapper.find('FormattedMessage').props();

    expect(id).toBe('test.title');
    expect(values).toEqual({ testNumber: 1 });
    expect(defaultMessage).toBe('missing translation test.title');
    expect(wrapper.text()).toBe('Test');
  });

  it('should render FormattedMessage component with default props', () => {
    const props = {
      id: 'test.title'
    };

    const wrapper = setup(props);
    const { id, values, defaultMessage } = wrapper.find('FormattedMessage').props();

    expect(id).toBe('test.title');
    expect(values).toEqual({ });
    expect(defaultMessage).toBe('missing translation test.title');
    expect(wrapper.text()).toBe('Test');
  });
});

describe('This FormattedMessage Route', () => {
  it('should have valid snapshot', () => {
    const props = {
      id: 'test.title',
      values: { testNumber: 1 },
      defaultMessage: 'missing translation test.title'
    };

    const wrapper = setup(props);
    expect(wrapper).toMatchSnapshot();
  });
});
