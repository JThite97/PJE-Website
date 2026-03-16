const urls = [
  'https://logo.clearbit.com/tyrolit.com',
  'https://logo.clearbit.com/quakerhoughton.com',
  'https://logo.clearbit.com/ewacalloys.com',
  'https://logo.clearbit.com/groz-tools.com',
  'https://logo.clearbit.com/shell.com'
];

async function test() {
  for (const url of urls) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      console.log(`${res.status} - ${url}`);
    } catch (e) {
      console.log(`ERR - ${url}`);
    }
  }
}
test();
