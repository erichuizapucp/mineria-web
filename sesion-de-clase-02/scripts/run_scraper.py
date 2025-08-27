# PUCP Web Scraping
from pucp_scraper.parser import parse_urls_to_scrape
from pucp_scraper.scraper import scrape_item
from pucp_scraper.writer import write_to_csv


if __name__ == "__main__":
    base_url = "https://repositorio.pucp.edu.pe"
    initial_url = "collections/a4e60678-5b9d-4a5d-be1e-0b8aef6b566a"

    urls_to_scrape = parse_urls_to_scrape(base_url, initial_url)
    print(urls_to_scrape)

    data = []
    for url in urls_to_scrape:
        try:
            title, meta_tags = scrape_item(url)
            dict_to_write = {
                "title": title,
                "description": meta_tags.get("description", ""),  # safe access
            }
            data.append(dict_to_write)
        except Exception as e:
            print(e)

    write_to_csv(data)

    print("El web scraping ha finalizado.")
