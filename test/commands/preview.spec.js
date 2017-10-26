import {expect} from 'chai';
import preview from '../../src/commands/preview';

describe('command preview', () => {
    it('should throw an error', () => {
        expect(preview)
            .to
            .throw('To implement');
    });
});
