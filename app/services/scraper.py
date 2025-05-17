import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
import aiohttp
from services.logger import get_logger

logger = get_logger()
# Define download directory
DOWNLOAD_DIR = Path("./tmp/downloads")
DOWNLOAD_DIR.mkdir(parents=True, exist_ok=True)

async def download_ppp_csv() -> Path:
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(accept_downloads=True)
        page = await context.new_page()
        logger.info("Fetching CSV file from SBA website")
        await page.goto("https://data.sba.gov/organization/")
        await page.wait_for_selector('a[href="/dataset/"]')
        await page.click('a[href="/dataset/"]')
        await page.fill('#field-giant-search', 'ppp foia')
        # 3. Click the search button
        await page.click('button[type="submit"][value="search"]')
        # After clicking search or loading the dataset list
        await page.wait_for_selector('a[href="/dataset/ppp-foia"]')
        await page.click('a[href="/dataset/ppp-foia"]')
        # Click one of the CSV links — e.g., the first CSV link in the resource section
        logger.info("Navigating to first CSV resource page...")
        # Wait for the resource links to load
        # Wait for the resource links to load
        await page.wait_for_selector('section.resources a')

        # Find all anchor tags inside the resources section
        csv_links = await page.query_selector_all('section.resources a')

        # Loop to find the first link that points to a .csv file
        csv_link = None
        for link in csv_links:
            href = await link.get_attribute("href")
            if href and ".csv" in href:
                csv_link = href
                logger.info(f"➡️ Found CSV download link: {href}")
                break

        await browser.close()

        if not csv_link:
            logger.info("❌ No CSV download link found.")
            return
            
        # Download the CSV file
        logger.info("Initiating download of the CSV file...")
        async with aiohttp.ClientSession() as session:
            async with session.get(csv_link) as response:
                if response.status == 200:
                    csv_filename = csv_link.split("/")[-1]
                    saved_path = DOWNLOAD_DIR / csv_filename
                    with open(saved_path, "wb") as f:
                        while True:
                            chunk = await response.content.read(1024)
                            if not chunk:
                                break
                            f.write(chunk)
                    logger.info(f"✅ CSV file downloaded to: {saved_path}")
                else:
                    logger.info(f"❌ Failed to download CSV file. Status code: {response.status}")
                    raise Exception(f"Failed to download CSV file. Status code: {response.status}")

        return saved_path

async def download_ppp_dictionary() -> Path:
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(accept_downloads=True)
        page = await context.new_page()

        logger.info("Fetching PPP Data Dictionary from SBA website")
        await page.goto("https://data.sba.gov/organization/")
        await page.wait_for_selector('a[href="/dataset/"]')
        await page.click('a[href="/dataset/"]')
        await page.fill('#field-giant-search', 'ppp foia')
        # 3. Click the search button
        await page.click('button[type="submit"][value="search"]')
        # After clicking search or loading the dataset list
        await page.wait_for_selector('a[href="/dataset/ppp-foia"]')
        await page.click('a[href="/dataset/ppp-foia"]')
        await page.click('a[title="PPP Data Dictionary.xlsx"]')
        logger.info("Initiating download of the PPP Data Dictionary...")
        async with page.expect_download() as download_info:
            await page.click("text=Download")
        download = await download_info.value

        save_path = DOWNLOAD_DIR / download.suggested_filename
        await download.save_as(str(save_path))

        logger.info(f"✅ File downloaded to: {save_path}")
        await browser.close()
        return save_path



async def main():
    csv_file, dictionary_file = await asyncio.gather(
        download_ppp_csv(),
        download_ppp_dictionary()
    )
    logger.info(f"Downloaded CSV file path: {csv_file}")
    logger.info(f"Downloaded Dictionary file path: {dictionary_file}")

if __name__ == "__main__":
    asyncio.run(main())