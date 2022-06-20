// eslint-disable-next-line import/no-extraneous-dependencies
import { launch } from 'puppeteer'

function sleep(time: number) {
  return new Promise((res) => {
    setTimeout(res, time)
  })
}

async function start(url: string) {
  console.error(launch)
  const browser = await launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] }) // 启动无头浏览器
  console.error(browser)
  const page = await browser.newPage()
  await page.setViewport({ width: 375, height: 812 })
  await page.goto(url)
  await page.setCookie({
    name: 'x-auth-token',
    value:
      'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYWNiNjE4NTI5ODM1ZjcxOCIsInVzZXJJZCI6MTAwMDAwMzI2MiwiZXhwIjoxNjc4NDUzODg0LCJpYXQiOjE2NDY5MTc4ODQsImlzcyI6ImFjYjYxODUyOTgzNWY3MTgiLCJzdWIiOiJhY2I2MTg1Mjk4MzVmNzE4In0.oFYtb3z1jFk-VzxtJWvRatn5ElerArpy_A_wz5Ay6WNOvAClF3zX4Cs8ymSYt0Z4K2hhS2oqJO-vE-K1rLkxuolakKhLxlDkfIK_ofvfK5p93azAAjGKnopmHY2_XS7YbJJznmt0AhIiQWC6zOfxABQ45k20hntHvBOXFewoyySD_Sd_yYE02VXpozBg33AWQF8ey1BWCvrIh2BNXbCY0Hbj2zKn-iHAKpo2rH04dgDiMns2sfyhtlt1XVAMpGs0sgnjqbqXrlE_ODUjxG5NXtOK3Gfj5jtXvB4-wpj3dpurHa_vWl0vnbucN4kY66jUuCeGYmCNmzN_aKKCa1G3ZA',
  })
  // 延迟5秒钟
  await sleep(5000)
  await page.screenshot({ path: 'example.png' })
  await browser.close()
}

const url = 'https://t1-m.dewu.com/h5-growth/wish-tree'

start(url)
