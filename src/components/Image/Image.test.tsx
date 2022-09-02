import React from 'react';
import renderer from 'react-test-renderer';
import { Image } from './index';

describe('components/Image', () => {
    it('to match snapshot', () => {
        const tree = renderer.create(
            <Image src="test" alt="test" />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});

// it('hello jest', () => {
//   const tree = renderer.create(
//     <Button onClick={() => ''}>Hello, Jest!</Button>
//   ).toJSON();
//   expect(tree).toMatchSnapshot();
// });

// test('hello jest', () => {
//   const wrapper = mount(<Button>Hello, Jest!</Button>);
//   expect(wrapper.text()).toMatch('Hello, Jest!');
// });
