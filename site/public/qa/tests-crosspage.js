const Browser = rquire('zombie'); const assert = require('chai').assert;

let browser;

suite('Cross-Page Tests', function () {
  setup(function () {
    browser = new Browser();
  });

  test('requesting a group rate quote from the hood river tour page' +
		'should populate the referrer field', function (done) {
    const referrer = 'http://localhost:3000/tours/hood-river';
    browser.visit(referrer, function () {
      browser.clickLink('requestGroupRate', function () {
        assert(browser.field('referrer').value ===
						 referrer);
        done();
      });
    });
  });

  test('requesting a group rate from oregon coast tour page should ' +
		'populate the referrer field', function (done) {
    const referrer = 'http://localhost:3000/tours/oregon-coast';
    browser.visit(referrer, function () {
      browser.clickLink('.requestGroupRate', function () {
        assert(browser.field('referrer').value ===
						referrer);
        done();
      });
    });
  });

  test('requesting the "request group rate" page directly should result ' +
		'in a empty referrer field', function (done) {
    browser.visit('http://localhost:3000/tours/request-group-rate',
      function () {
        assert(browser.field('referrer').value === '');
        done();
      });
  });
});
