from bs4 import BeautifulSoup

def parse_product(soup: BeautifulSoup):
    product = {}

    # Establecer los selectores del DOM y el CSS
    title_tag = soup.select_one("span#productTitle") # Busca id
    price_tag = soup.select_one("span.a-price-whole") # Busca clase
    marca_tag = soup.select_one("span.a-size-base.po-break-word")
    delivery_tag = soup.select_one("span.a-size-base.a-color-secondary")

    product["title"] = title_tag.get_text(strip=True) if title_tag else None
    product["price"] = price_tag.get_text(strip=True) if price_tag else None
    product["marca"] = marca_tag.get_text(strip=True) if marca_tag else None
    product["delivery"] = delivery_tag.get_text(strip=True) if delivery_tag else None

    return product
