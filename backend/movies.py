from dotenv import load_dotenv
import tmdbsimple as tmdb
import json
import os

load_dotenv()
tmdb.API_KEY = os.getenv("TMDB_API")

search = tmdb.Search()
response = search.movie(query='Iron Man I')

for s in search.results:
    print(s['title'], s['release_date'], s['id'])