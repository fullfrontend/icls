import {expect} from 'chai';
import convert from '../../src/Command/convert';

describe('command convert', () => {
    it('should throw an error', () => {
        expect(convert)
            .to
            .throw('To implement');
    });
});
