import {expect} from 'chai';
import store from '../../src/model/store';

describe('store', () => {

    beforeEach(() => {
        store.reset();
    });

    describe('set', () => {
        it('should be able to set a key/value', () => {
            store.set('foo', 'bar');
            expect(store._store).to.have.property('foo', 'bar');
        });

        it('should be able to set a multi level key', () => {
            store.set('foo.bar', 42);
            expect(store._store).to.have.property('foo');
            expect(store._store.foo).to.have.property('bar', 42);
        });

        it('should be able to set a multi level key', () => {
            store.set('foo.bar.deep', 42);
            expect(store._store).to.have.property('foo');
            expect(store._store.foo).to.have.property('bar');
            expect(store._store.foo.bar).to.have.property('deep', 42);
        });

        it('should be able to set multiple multi level key', () => {
            store.set('foo.bar.deep', 42);
            store.set('foo.baz.deep', 43);
            expect(store._store).to.have.property('foo');
            expect(store._store.foo).to.have.property('bar');
            expect(store._store.foo).to.have.property('baz');
            expect(store._store.foo.bar).to.have.property('deep', 42);
            expect(store._store.foo.baz).to.have.property('deep', 43);
        });

    });

    describe('get', () => {
        it('should be able to recover a value from the store', () => {
            store._store = {'foo': 'bar'};
            expect(store.get('foo')).to.equal('bar');
        });

        it('should be able to read a multi level key from the store', () => {
            store._store = {'foo': {'bar': {'deep': 42}}};

            let value = store.get('foo.bar');
            expect(value).to.have.property('deep', 42);
        });

        it('should be able to read a multi level key from the store', () => {
            store._store = {'foo': {'bar': {'deep': 42}}};
            expect(store.get('foo.bar.deep')).to.equal(42);
        });

        it('should return the whole store if no key is given', () => {
            store._store = {'foo': 'bar', 'foo2': 42};
            let value = store.get();
            expect(value).to.have.property('foo', 'bar');
            expect(value).to.have.property('foo2', 42);
        });

        it('should return the default value if the key is undefined', () => {
            store._store = {};
            expect(store.get('foo.bar', 42)).to.equal(42);
        });
    });

    describe('reset', () => {
        it('should empty the store', () => {
            store._store = {'foo': 'bar'};
            store.reset();
            expect(store._store).not.to.have.property('foo');
        });
    });

});
