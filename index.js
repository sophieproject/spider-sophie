const puppeteer = require('puppeteer');
const $ = require('cheerio');
const Database = require('better-sqlite3');
const db = new Database('./urls.db', {
	verbose: console.log
});

async function crawl() {
  var result = db.prepare(`SELECT * FROM toCrawl`).all()
    var url = result[0].url
    puppeteer
  .launch()
  .then(function(browser) {
    return browser.newPage();
  })
  .then(function(page) {
    return page.goto(url).then(function() {
      return page.content();
    });
  })
  .then(function(html) {
    var rank = 0
    $('h1', html).each(function() {
      for (i = 0; i < $(this).length; i++) {
        console.log($(this)[i].text())
    }
    });
    $('h2', html).each(function() {
      for (i = 0; i < $(this).length; i++) {
        console.log($(this)[i].text())
    }
    });
    $('h3', html).each(function() {
      for (i = 0; i < $(this).length; i++) {
        console.log($(this)[i].text())
    }
    });
    $('h4', html).each(function() {
      for (i = 0; i < $(this).length; i++) {
        console.log($(this)[i].text())
    }
    });
    $('h5', html).each(function() {
      for (i = 0; i < $(this).length; i++) {
        console.log($(this)[i].text())
    }
    });
    $('p', html).each(function() {
      for (i = 0; i < $(this).length; i++) {
        console.log($(this)[i].text())
    }
    });

    $('a', html).each(function() {
      for (i = 0; i < $(this).length; i++) {
        if ($(this)[i].attribs.href === undefined) return
        if ($(this)[i].attribs.href.charAt(0) == "/") {
          var result = db.prepare(`SELECT url FROM crawled WHERE url = ?`).get(url + $(this)[i].attribs.href);
          if (result === undefined) {
          db.prepare(`INSERT INTO toCrawl (url) VALUES(?);`).run(url + $(this)[i].attribs.href);
          }
        } else if ($(this)[i].attribs.href.charAt(0) == "h") {
          var result = db.prepare(`SELECT url FROM crawled WHERE url = ?`).get($(this)[i].attribs.href);
          if (result === undefined) {
          db.prepare(`INSERT INTO toCrawl (url) VALUES(?);`).run($(this)[i].attribs.href);
          }
        }
    }
    });
    db.prepare(`INSERT INTO crawled (url) VALUES(?);`).run(url);
    db.prepare(`DELETE FROM toCrawl WHERE url = ?`).run(url);
    db.close();
    process.exit();
  })
  .catch(function(err) {
    console.log(err)
    db.prepare(`DELETE FROM toCrawl WHERE url = ?`).run(url);
    db.close;
    process.exit();
  });
  return;
  }

crawl();