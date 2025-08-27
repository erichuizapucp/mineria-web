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

def parse_urls_to_scrape(base_url, url):
    full_url = "/".join([base_url, url])

    driver.get(full_url)

    # Espera a que el DOM de la página termine de cargar
    WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "#p-spc > ul > li"))
    )

    # Extraer todos los <li> hijos de #p-spc > ul
    # Ahora usar BeautifulSoup sobre el DOM completo
    soup = BeautifulSoup(driver.page_source, "html.parser")

    # Extraer todos los <li> bajo #p-spc > ul
    items = soup.select("#p-spc > ul > li")

    item_urls = []
    for item in items:
        link = item.select_one("ds-item-search-result-list-element a")

        if link:
            item_urls.append("/".join([base_url, link["href"]]))

    return item_urls
