> ## Documentation Index
> Fetch the complete documentation index at: https://gologin.com/docs/llms.txt
> Use this file to discover all available pages before exploring further.

# Using a Browser Session

Once connected to a Cloud Browser session, you control it entirely through your automation library (Puppeteer or Playwright). Gologin does not provide built-in action methods — all browser interactions are standard library calls.

## Navigation

```javascript Puppeteer theme={null}
await page.goto('https://example.com', { waitUntil: 'domcontentloaded' });
console.log(await page.title());
console.log(page.url());
```

```python Playwright theme={null}
await page.goto('https://example.com', wait_until='domcontentloaded')
print(await page.title())
print(page.url)
```

## Clicking and typing

```javascript Puppeteer theme={null}
await page.click('#search-input');
await page.type('#search-input', 'hello world');
await page.click('#submit-button');
```

```python Playwright theme={null}
await page.click('#search-input')
await page.type('#search-input', 'hello world')
await page.click('#submit-button')
```

## Waiting for elements

```javascript Puppeteer theme={null}
await page.waitForSelector('.results', { timeout: 5000 });
```

```python Playwright theme={null}
await page.wait_for_selector('.results', timeout=5000)
```

## Extracting text

```javascript Puppeteer theme={null}
const text = await page.$eval('.price', el => el.innerText);
```

```python Playwright theme={null}
text = await page.locator('.price').inner_text()
```

## Taking a screenshot

```javascript Puppeteer theme={null}
await page.screenshot({ path: 'screenshot.png' });
```

```python Playwright theme={null}
await page.screenshot(path='screenshot.png')
```

## Working with multiple pages

```javascript Puppeteer theme={null}
const page2 = await browser.newPage();
await page2.goto('https://example.com/other');
```

```python Playwright theme={null}
page2 = await browser.new_page()
await page2.goto('https://example.com/other')
```


Built with [Mintlify](https://mintlify.com).