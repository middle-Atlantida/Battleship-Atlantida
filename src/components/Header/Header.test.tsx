import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './index';

describe('components/Header', () => {
    it('to match snapshot', () => {
        const tree = renderer.create(
            <MemoryRouter>
                <Header/>
            </MemoryRouter>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('text match', () => {
        const testText = 'test';

        const { getByText } = render(
            <MemoryRouter>
                <Header title={testText} />
            </MemoryRouter>,
        );

        expect(getByText(testText)).toBeInTheDocument();
    });
});
