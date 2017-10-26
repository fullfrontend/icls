import {expect} from 'chai';
import convert from '../../src/commands/convert';

describe('command convert', () => {
    it('should throw an error', () => {
        expect(convert)
            .to
            .throw('To implement');
    });
});
