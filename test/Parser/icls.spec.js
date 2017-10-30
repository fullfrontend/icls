import {expect} from 'chai';
import Parser from '../../src/Parser/Icls';
import * as samples from '../samples/icls-strings';

describe('Parser.parse', () => {
    let parser;
    beforeEach(() => {
        parser = new Parser();
    });

    it('should return an object with the name', () => {
        const parsed = parser.parse(samples.schemeNode).toJS();

        expect(parsed).to.have.property('name', 'Material Peacock Optimized');
        expect(parsed).to.have.property('version', 142);
    });


    it('should return an object with the first level options', () => {
        const parsed = parser.parse(samples.firstLevelOptionsNode).toJS();

        expect(parsed).to.have.property('name', 'Material Peacock Optimized');
        expect(parsed).to.have.property('version', 142);
        expect(parsed).to.have.property('font_scale', 1.0);
        expect(parsed).to.have.property('line_spacing', 1.2);
        expect(parsed).to.have.property('editor_font_size', 12);
        expect(parsed).to.have.property('editor_font_name', 'Fira Code');
        expect(parsed).to.have.property('editor_ligatures', true);
        expect(parsed).to.have.property('console_font_name', 'Menlo');
        expect(parsed).to.have.property('console_line_spacing', 1.4);

    });


    it('should return an object with the colors', () => {
        const parsed = parser.parse(samples.colorsNode).toJS();

        expect(parsed).to.have.property('colors');
        expect(parsed.colors).to.have.property('added_lines_color', '#5f7210');
        expect(parsed.colors).to.have.property('annotations_color', '#8b999f');
        expect(parsed.colors).to.have.property('caret_color', '#60999d');
        expect(parsed.colors).to.have.property('caret_row_color', '#0c1418');
        expect(parsed.colors).to.have.property('console_background_key', '');
    });

    it('should handle the attribute tag with it\'s sub-childs', () => {
        const parsed = parser.parse(samples.attributesNode).toJS();

        expect(parsed).to.have.property('bnf_illegal');
        expect(parsed.bnf_illegal).to.have.property('foreground', '#d0d0ff');
        expect(parsed).to.have.property('bnf_keyword');
        expect(parsed.bnf_keyword).to.have.property('foreground', '#bbb529');
        expect(parsed.bnf_keyword).to.have.property('background', '#629755');
    });

    it('should handle the attribute tag with it\'s sub-childs and deep keys', () => {
        const parsed = parser.parse(samples.attributesNodeWithDeepKeys).toJS();

        expect(parsed).to.have.property('bash');
        expect(parsed.bash).to.have.property('here_doc');
        expect(parsed.bash.here_doc).to.have.property('background', '#4b694c');
        expect(parsed.bash.here_doc).to.have.property('foreground', '#bc1d36');

        expect(parsed.bash).to.have.property('internal_command');
        expect(parsed.bash.internal_command).to.have.property('foreground', '#2544ff');
    });

    it('shouldn\'t break with an unexpected object', () => {
        const parsed = parser.parse(samples.unexpectedObject).toJS();

        expect(parsed).to.have.property('font_scale', 1);
        expect(parsed).to.have.property('colors');
        expect(parsed.colors).to.have.property('annotations_color', '#8b999f');
    });
});
