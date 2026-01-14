from dotenv import load_dotenv
import tmdbsimple as tmdb
import json
import os
import time

mcu_release_order = {
    "Iron Man": "movie",
    "The Incredible Hulk": "movie",
    "Iron Man 2": "movie",
    "Thor": "movie",
    "Captain America: The First Avenger": "movie",
    "The Avengers": "movie",
    "Iron Man 3": "movie",
    "Thor: The Dark World": "movie",
    "Captain America: The Winter Soldier": "movie",
    "Guardians of the Galaxy": "movie",
    "Avengers: Age of Ultron": "movie",
    "Ant-Man": "movie",
    "Captain America: Civil War": "movie",
    "Doctor Strange": "movie",
    "Guardians of the Galaxy Vol. 2": "movie",
    "Spider-Man: Homecoming": "movie",
    "Thor: Ragnarok": "movie",
    "Black Panther": "movie",
    "Avengers: Infinity War": "movie",
    "Ant-Man and the Wasp": "movie",
    "Captain Marvel": "movie",
    "Avengers: Endgame": "movie",
    "Spider-Man: Far From Home": "movie",
    "WandaVision": "tv",
    "The Falcon and the Winter Soldier": "tv",
    "Loki": "tv",
    "What If...?": "tv",
    "Black Widow": "movie",
    "Shang-Chi and the Legend of the Ten Rings": "movie",
    "Eternals": "movie",
    "Spider-Man: No Way Home": "movie",
    "Hawkeye": "tv",
    "Moon Knight": "tv",
    "Ms. Marvel": "tv",
    "Doctor Strange in the Multiverse of Madness": "movie",
    "Thor: Love and Thunder": "movie",
    "She-Hulk: Attorney at Law": "tv",
    "Black Panther: Wakanda Forever": "movie",
    "Ant-Man and the Wasp: Quantumania": "movie",
    "Secret Invasion": "tv",
    "Guardians of the Galaxy Vol. 3": "movie",
    "The Marvels": "movie",
    "Echo": "tv",
    "Deadpool & Wolverine": "movie",
    "Agatha All Along": "tv",
    "Eyes of Wakanda": "tv",
    "Marvel Zombies": "tv",
    "Wonder Man": "tv",
    "Daredevil: Born Again": "tv",
    "Captain America: Brave New World": "movie",
    "Thunderbolts*": "movie",
    "The Fantastic Four: First Steps": "movie"
}

load_dotenv()
tmdb.API_KEY = os.getenv("TMDB_API")
data = []

for title, content_type in mcu_release_order.items():
    print(f"---- {title}")
    search = tmdb.Search()

    if content_type == "movie":
        response = search.movie(query=title)
        if search.results:
            data.append({
                "id": search.results[0]["id"],
                "title": search.results[0]["title"],
                "overview": search.results[0]["overview"],
                "type": "movie",
                "release_date": search.results[0]["release_date"],
                "poster_path": search.results[0]["poster_path"],
            })

    else:
        response = search.tv(query=title)
        if search.results:
            data.append({
                "id": search.results[0]["id"],
                "title": search.results[0]["original_name"],
                "overview": search.results[0]["overview"],
                "type": "tv",
                "release_date": search.results[0]["first_air_date"],
                "poster_path": search.results[0]["poster_path"],
            })

    time.sleep(0.1)


with open("mcu_tmdb.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)

