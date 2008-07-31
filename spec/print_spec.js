Screw.Unit(function() {
  describe("Print", function() {
    describe('when given undefined', function() {
      it("returns 'undefined'", function() {
        expect($.print(undefined)).to(equal, 'undefined');
      });
    });
    
    describe('when given null', function() {
      it("returns 'null'", function() {
        expect($.print(null)).to(equal, 'null');
      });
    });
    
    describe('when given a number', function() {
      it("returns the string representation of the number", function() {
        expect($.print(1)).to(equal, '1');
        expect($.print(1.01)).to(equal, '1.01');
        expect($.print(-1)).to(equal, '-1');
      });
    });
    
    describe('when given a boolean', function() {
      it("returns the string representation of the boolean", function() {
        expect($.print(true)).to(equal, 'true');
        expect($.print(false)).to(equal, 'false');
      });
    });
    
    describe('when given a string', function() {
      it("returns the string, quoted", function() {
        expect($.print('asdf')).to(equal, '"asdf"');
      });
      
      describe('when the string is longer than the [max_string] option', function() {
        it("returns the string, truncated", function() {
          expect($.print('asdf', { max_string: 3 })).to(equal, '"asd..."');
        });        
      });
      
      describe('when the strings has quotes or escaped characters', function() {
        it("returns the string, with quotes and escaped characters escaped", function() {
          expect($.print('as"df')).to(equal, '"as\\"df"');
          expect($.print('as\tdf')).to(equal, '"as\\tdf"');
        });        
      });
    });
    
    describe('when given a function', function() {
      it("returns the function's signature", function() {
        expect($.print(function() {})).to(match, /function\s*\(\)/);
        expect($.print(function foo() {})).to(match, /function\s*foo\(\)/);
        expect($.print(function foo(bar) {})).to(match, /function\s*foo\(bar\)/);
      });        
    });

    describe('when given an element', function() {
      it("returns the string representation of the element", function() {
        expect($.print($('<div></div>').get(0))).to(equal, '<div>');
        expect($.print($('<div foo="bar"></div>').get(0))).to(equal, '<div>');
      });
    });

    describe('when given an array', function() {
      it("returns the printed elements, comma separated, encircled by square brackets", function() {
        expect($.print([])).to(equal, '[]');
        expect($.print([1])).to(equal, '[ 1 ]');
        expect($.print([1, 2, 3])).to(equal, '[ 1, 2, 3 ]');
      });
      
      describe('when the array is longer than the [max_array] option', function() {
        it("returns the printed array, truncated", function() {
          expect($.print([1, 2, 3, 4], { max_array: 2 })).to(equal, '[ 1, 2, 2 more... ]');
        });
      });
      
      describe('when the array has arrays as its elements', function() {
        it("returns the recursively printed array", function() {
          expect($.print([[]])).to(equal, '[ [] ]');
          expect($.print([ [1, 2, 3], 4 ])).to(equal, '[ [ 1, 2, 3 ], 4 ]');
        });
      });

      describe('when the array has objects as its elements', function() {
        it("returns recursively printed array", function() {
          expect($.print([{}])).to(equal, '[ {} ]');
          expect($.print([ { foo: 'bar' }, 'baz' ])).to(equal, '[ { foo: "bar" }, "baz" ]');
        });
      });
    });

    describe('when given a jQuery', function() {
      it("returns the printed array of elements engirthed in '$()' ", function() {
        expect($.print($('<div></div>'))).to(equal, '$([ <div> ])');
      });
    });
    
    describe('when given an object', function() {
      it("returns the keys and values of the object, enraptured with curly braces", function() {
        expect($.print({})).to(equal, '{}');
        expect($.print({ foo: 1, bar: 2 })).to(equal, '{ foo: 1, bar: 2 }');
      });
      
      describe('when the values of the object are non-primitive', function() {
        it("recursively prints the keys and values", function() {
          expect($.print({ foo: [1, 2] })).to(equal, '{ foo: [ 1, 2 ] }');
        });
        
        describe('when the object has circular references', function() {
          it("returns elipses for circularities", function() {
            var circular = {};
            circular[0] = circular;
            expect($.print(circular)).to(equal, '{ 0: { 0: ... } }');
          });
        });
      });
    });
  });
});