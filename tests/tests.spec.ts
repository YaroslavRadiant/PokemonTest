import {test, expect} from '@playwright/test'

test('Go to pokemon page', async ({page}) => {
  await page.goto('http://localhost:3000/')
  await page.waitForTimeout(3000)
  await page.click('text=bulbasaur')
  await page.waitForTimeout(3000)
  await expect(page).toHaveURL('http://localhost:3000/pokemon/1')
  await expect(page.isVisible('text=bulbasaur')).toBeTruthy()
})

test('Search pokemon', async ({page}) => {
  await page.goto('http://localhost:3000/')
  await page.waitForTimeout(3000)
  await page.getByLabel('Find by name or id').fill('1')
  await page.locator('.MuiButton-sizeMedium').click()
  await page.waitForTimeout(3000)
  await expect(page).toHaveURL('http://localhost:3000/pokemon/1')
  await expect(page.isVisible('text=bulbasaur')).toBeTruthy()
})

test('Search invalid pokemon', async ({page}) => {
  await page.goto('http://localhost:3000/')
  await page.waitForTimeout(3000)
  await page.getByLabel('Find by name or id').fill('123456')
  await page.locator('.MuiButton-sizeMedium').click()
  await page.waitForTimeout(3000)
  await expect(page).toHaveURL('http://localhost:3000/pokemon/123456')
  await expect(page.isVisible('text=Invalid pokemon name')).toBeTruthy()
})

test('Search pokemons by type', async ({page}) => {
  await page.goto('http://localhost:3000/')
  await page.waitForTimeout(3000)
  await page.locator('#demo-simple-select').click()
  await page.click('text=rock')
  await page.waitForTimeout(3000)
  await page.click('text=geodude')
  await page.waitForTimeout(3000)
  await expect(page.isVisible('text=geodude')).toBeTruthy()
})
