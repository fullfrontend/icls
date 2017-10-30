import {expect} from 'chai';
import preview from '../../src/Command/preview';

describe('command preview', () => {
    it('should throw an error', () => {
        expect(preview)
            .to
            .throw('To implement');
    });
});
