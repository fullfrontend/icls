import {expect} from 'chai';
import Store from '../../src/Model/Store';

describe('Store.constructor', () => {
    it('should return an instance of Store', () => {
        let store = new Store();
        expect(store).to.be.instanceOf(Store);
    });

    it('should populate the store with the given object', () => {
        let store = new Store({
            foo: 'bar',
            baz: 42
        });

        expect(store._store).to.have.property('foo', 'bar');
        expect(store._store).to.have.property('baz', 42);
    });
});

describe('Store.reset', () => {
    let store;
    beforeEach(() => {
        store = new Store();
    });

    it('should empty the store', () => {
        store._store = {
            'foo': 'bar'
        };
        store.reset();
        expect(store._store).not.to.have.property('foo');
    });
});

describe('Store.set', () => {
    let store;
    beforeEach(() => {
        store = new Store();
    });

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

describe('Store.get', () => {
    let store;
    beforeEach(() => {
        store = new Store({
            'foo': {
                'bar': {
                    'baz': 42
                }
            },
            'foobar': 'raboof',
            'foobaz': 'zaboof'
        });
    });


    it('should be able to recover a value from the store', () => {
        expect(store.get('foobar')).to.equal('raboof');
    });

    it('should be able to read a multi level key from the store', () => {
        let value = store.get('foo.bar');
        expect(value).to.have.property('baz', 42);
    });

    it('should be able to read a multi level key from the store', () => {
        expect(store.get('foo.bar.baz')).to.equal(42);
    });

    it('should return the whole store if no key is given', () => {
        let value = store.get();
        expect(value).to.have.property('foobar', 'raboof');
        expect(value).to.have.property('foobaz', 'zaboof');
    });

    it('should return the default value if the key is undefined', () => {
        expect(store.get('unknown', 42)).to.equal(42);
    });
});

describe('Store.toJS', () => {
    let store;
    beforeEach(() => {
        store = new Store({
            'foo': {
                'bar': {
                    'baz': 42
                }
            },
            'foobar': 'raboof',
            'foobaz': 'zaboof'
        });
    });

   it('should return the store', () => {
       let value = store.toJS();

       expect(value).to.have.property('foo');
       expect(value.foo).to.have.property('bar');
       expect(value.foo.bar).to.have.property('baz', 42);
       expect(value).to.have.property('foobar', 'raboof');
       expect(value).to.have.property('foobaz', 'zaboof');
   });

});
