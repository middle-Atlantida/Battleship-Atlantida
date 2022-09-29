import React from 'react';

import renderer from 'react-test-renderer';

import { Image } from './index';

describe('components/Image', () => {
    it('to match snapshot', () => {
        const tree = renderer.create(<Image src="test" alt="test" />).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
