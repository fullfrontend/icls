import {expect} from 'chai';
import {autoCast, castString, isColor, isFloat, isInt} from '../../src/lib/utils';


describe('autoCast utility', () => {
    it('should cast to an integer', () => {
        expect(autoCast('42')).to.equal(42);
    });

    it('should cast to a float', () => {
        expect(autoCast('42.0')).to.equal(42.0);
        expect(autoCast('42.42')).to.equal(42.42);
    });

    it('should cast to a boolean', () => {
        expect(autoCast('true')).to.be.true;
        expect(autoCast('True')).to.be.true;

        expect(autoCast('false')).to.be.false;
        expect(autoCast('False')).to.be.false;
    });

    it('should return a string if no other type matches', () => {
        expect(autoCast('foo')).to.equal('foo');
    });
});

describe('castString utility', () => {
    it('should return a lowercase string', () => {
        expect(castString('FOO')).to.equal('foo');
        expect(castString('foo')).to.equal('foo');
        expect(castString('fOo')).to.equal('foo');
    });

    it('should return a string', () => {
        expect(castString(42)).to.equal('42');
        expect(castString(42.42)).to.equal('42.42');
        expect(castString(true)).to.equal('true');
        expect(castString(false)).to.equal('false');
    });
});

describe('isInt utility', () => {
    it('should work as expected', () => {
        expect(isInt('187')).to.be.true;
        expect(isInt(187)).to.be.true;
        expect(isInt('-2')).to.be.true;
        expect(isInt(-'1')).to.be.true;
        expect(isInt('1.2')).to.be.false;
        expect(isInt('foo')).to.be.false;
    });
});

describe('isFloat utility', () => {
    it('should work as expected', () => {
        expect(isFloat('0.2')).to.be.true;
        expect(isFloat(0.2)).to.be.true;
        expect(isFloat('.2')).to.be.true;
        expect(isFloat('-.2')).to.be.true;
        expect(isFloat(-'.2')).to.be.true;
        expect(isFloat(-.2)).to.be.true;
        expect(isFloat('u.2')).to.be.false;
        expect(isFloat('2')).to.be.false;
        expect(isFloat('0.2u')).to.be.false;
        expect(isFloat('foo')).to.be.false;
    });
});

describe('isColor utility', () => {
    it('should work as expected', () => {
        expect(isColor('#ffffff')).to.be.true;
        expect(isColor('ffffff')).to.be.true;
        expect(isColor('#fFfFfF')).to.be.true;
        expect(isColor('fFfFfF')).to.be.true;
        expect(isColor('#012344')).to.be.true;
        expect(isColor('012344')).to.be.true;

        expect(isColor('#01244')).to.be.false;
        expect(isColor('01244')).to.be.false;
        expect(isColor('#01244G')).to.be.false;
        expect(isColor('01244G')).to.be.false;
    });
});
