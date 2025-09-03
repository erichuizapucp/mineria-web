import requests
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By


options = Options()
options.add_argument("--headless")  # Ejecutar sin interfaz gráfica
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
driver = webdriver.Chrome(options=options)


def scrape_item(item_url):
    try:
        r = requests.head(item_url, timeout=10)
        r.raise_for_status()
    except requests.exceptions.RequestException as e:
        print("HTTP error:", e)
        return

    driver.get(item_url)

    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "ds-item-page-title-field h1"))
    )

    soup = BeautifulSoup(driver.page_source, "html.parser")
    meta_tags = {m.get("name"): m.get("content") for m in soup.find_all("meta") if m.get("name")}

    title = soup.select_one("ds-base-item-page-title-field h1 span")
    title_text = title.get_text(strip=True) if title else None

    return title_text, meta_tags
