import requests
from flask import Flask, jsonify
from flask_cors import CORS


app = Flask(__name__,static_url_path ="",static_folder="static")
CORS(app)


api_key = "3033f95d992034583d7f7b63bb286c44"
trending_movie_url = "https://api.themoviedb.org/3/trending/movie/week?api_key=" + api_key
TV_onair_url = "https://api.themoviedb.org/3/tv/airing_today?api_key=" + api_key


@app.route('/', methods = ["GET"])
def homepage():
    return app.send_static_file("index.html")

# retrieve the list of movie and tv 

@app.route('/get_mov', methods=["GET"])
def get_mov():

    d = requests.get(trending_movie_url).json()['results'][:5]
    want = ["title",
            "backdrop_path",
            "release_date"]
    data = []
    for i in d:
        temp ={}    
        for key,value in i.items():
            if key in want:
                temp[key] = value
        data.append(temp)
            
    return jsonify(data)

@app.route('/get_tv', methods=["GET"])
def get_tv():

    d = requests.get(TV_onair_url).json()['results'][:5]
    want = ["name",
            "backdrop_path",
            "first_air_date"]
    data = []
    for i in d:
        temp ={}
        for key,value in i.items():
            if key in want:
                temp[key] = value
        data.append(temp)
            
    return jsonify(data)



@app.route('/search_MOV/<string:mov>', methods=["GET"])
def search_MOV(mov):

    r1 = requests.get("https://api.themoviedb.org/3/search/movie?api_key="+api_key+"&query="+mov+"&language=en-US&page=1&include_adult=false").json()

    want = ["id",
        "title",
        "overview",
        "poster_path",
        "release_date",
        "vote_count"]
    if r1.get('results') == []:
        return "No results found"
    else:
        data = []
        for i in r1['results']:
            temp ={}
            
            for key,value in i.items():
                if key == 'genre_ids':
                    genre = []
                    for g in value:
                        for s in mov_genre:
                            if s['id'] == g:
                                genre.append(s['name'])
                    temp[key] = genre  
                elif key == 'vote_average':
                    temp[key] = "\u2605"+str(value/2)+"/5" 

                elif key in want:
                    temp[key] = value
            data.append(temp)
   
                
        return jsonify(data)


@app.route('/search_TV/<string:tv>',methods=["GET"])
def search_TV(tv):

    r2 = requests.get("https://api.themoviedb.org/3/search/tv?api_key="+api_key+"&language=en-US&page=1&query="+tv+"&include_adult=false").json()
    
    
    want = ["id",
        "name",
        "overview",
        "poster_path",
        "first_air_date",
        "vote_count"]
    if r2.get('results') == []:
        return "No results found"

    else:
        data = []
        for i in r2['results']:
            temp ={}
            for key,value in i.items():
                if key == 'genre_ids':
                    genre = []
                    for g in value:
                        for s in tv_genre:
                            if s['id'] == g:
                                genre.append(s['name'])
                    temp[key] = genre    
                elif key == 'vote_average':
                    temp[key] = "\u2605"+str(value/2)+"/5"
                elif key in want:
                    temp[key] = value
            data.append(temp)
        return jsonify(data)

@app.route('/search_TV_MOV/<string:show>', methods=["GET"])
def search_TV_MOV(show):
   
    r3 = requests.get("https://api.themoviedb.org/3/search/multi?api_key="+api_key+"&language=en-US&query="+show+"&page=1&include_adult=false").json()

    if r3.get('results') == []:
        return "No results found"
    else:
        data = []
        mov_want = ["id",
                    "title",
                    "overview",
                    "poster_path",
                    "release_date",
                    "vote_count",
                    "media_type"]

        tv_want = ["id",
                    "name",
                    "overview",
                    "poster_path",
                    "first_air_date",
                    "vote_count",
                    "media_type"]

        
        for i in r3['results']:
            
            if i.get('media_type') == 'people':
                continue
            else:
                temp ={}
                if i.get('media_type') == 'movie':
        
                    for key,value in i.items():
                        if key == 'genre_ids':
                            genre = []
                            for g in value:
                                for s in mov_genre:
                                    if s['id'] == g:
                                        genre.append(s['name'])
                            temp[key] = genre    
                        elif key == 'vote_average':
                            temp[key] = "\u2605"+str(value/2)+"/5"
                        elif key in mov_want:
                            temp[key] = value
                    data.append(temp)
   
                        
                else:
                    
                    for key,value in i.items():
                        if key == 'genre_ids':
                            genre = []
                            for g in value:
                                for s in tv_genre:
                                    if s['id'] == g:
                                        genre.append(s['name'])
                            temp[key] = genre    
                        elif key == 'vote_average':
                            temp[key] ="\u2605"+str(value/2)+"/5"
                        elif key in tv_want:
                            temp[key] = value
                    data.append(temp)
                    
        return jsonify(data)


@app.route('/get_mov_details/<string:id>', methods=["GET"])
def get_mov_details(id):

    r4 = requests.get(" https://api.themoviedb.org/3/movie/"+id+"?api_key="+api_key+"&language=en- US").json()
    want =['id','title','overview','release_date','vote_count','poster_path','backdrop_path']


    data = {}
    for key,value in r4.items():
        if key == 'genres':
            genre = []
            for i in r4[key]:
                genre.append(i['name'])
            data[key] = genre
        elif key == 'spoken_languages':
            lan = []
            for j in r4[key]:
                lan.append(j['name'])
            data[key] = lan
        elif key == 'vote_average':
            data[key] = "\u2605"+str(value/2)+"/5"
        elif key in want:
            data[key] = value
    data['icon'] = 	u"\u24D8"

    return jsonify(data)
# at most 8 actors
@app.route('/get_mov_credits/<string:id>', methods=["GET"])
def get_mov_credits(id):

    r4 = requests.get("https://api.themoviedb.org/3/movie/"+id+"/credits?api_key="+api_key+"&language=en-US").json()
    want =['name','profile_path','character']

    data = []
    count = 0 

    
    
    for i in r4['cast']:
        temp ={}
        if count ==8:
            break

        for key,value in i.items():
            if key in want:
                temp[key] = value
        count +=1
        data.append(temp)

       
    return jsonify(data)

# at most 5 reviews
@app.route('/get_mov_reviews/<string:id>',methods=["GET"])
def get_mov_reviews(id):

    r4 = requests.get(" https://api.themoviedb.org/3/movie/"+id+"/reviews?api_key="+api_key+"&language=en- US&page=1").json()
    want = ['content']

    data = []
    count = 0
    for i in r4['results']:
        temp ={}
        date = ""
        if count==5:
            break
        for key,value in i.items():
            if key == 'created_at':
                date += "on "+value[5:7]+"/"+value[8:10]+"/"+value[:4]
                temp[key] = date
            elif key == 'author_details':
       
                rating = value['rating']
                if rating == None:
                    temp['rating'] = None
                else:   
                    temp['rating'] = "\u2605"+str(rating/2)+"/5"

                username = value['username']
                temp['username'] = username

            elif key in want:
                temp[key] = value
        count+=1
        data.append(temp)
        
    return jsonify(data)

@app.route('/get_tv_details/<string:id>', methods=["GET"])
def get_tv_details(id):

    r4 = requests.get(" https://api.themoviedb.org/3/tv/"+id+"?api_key="+api_key+"&language=en-US").json()  
    want = ['backdrop_path','episode_run_time','first_air_date','genres','id','name','number_of_seasons','overview','poster_path','spoken_languages','vote_count']

    data = {}
    for key,value in r4.items():
        if key == 'genres':
            genre = []
            for i in r4[key]:
                genre.append(i['name'])
            data[key] = genre
        elif key == 'spoken_languages':
            lan = []
            for j in r4[key]:
                lan.append(j['name'])
            data[key] = lan
        elif key == 'vote_average':
            data[key] = "\u2605"+str(value/2)+"/5"
        elif key in want:
            data[key] = value
    data['icon'] = 	u"\u24D8"
    
    return jsonify(data)

@app.route('/get_tv_credits/<string:id>', methods=["GET"])
def get_tv_credits(id):

    r4 = requests.get("https://api.themoviedb.org/3/tv/"+id+"/credits?api_key="+api_key+"&language=en-US").json()
    want = ['name','profile_path', 'character']

    data = []
    count = 0 

    
    
    for i in r4['cast']:
        temp ={}
        if count ==8:
            break
        for key,value in i.items():
            if key in want:
                temp[key] = value
        count +=1
        data.append(temp)

       
    return jsonify(data)

# at most 5 reviews
@app.route('/get_tv_reviews/<string:id>',methods=["GET"])
def get_tv_reviews(id):

    r4 = requests.get("https://api.themoviedb.org/3/tv/"+id+"/reviews?api_key="+api_key+"&language=en- US&page=1").json()
    want = ['content']

    data = []
    count = 0
    for i in r4['results']:
        temp ={}
        date = ""
        if count==5:
            break
        for key,value in i.items():
            if key == 'created_at':
                date += "on "+value[5:7]+"/"+value[8:10]+"/"+value[:4]
                temp[key] = date
            elif key == 'author_details':
       
                rating = value['rating']
                if rating == None:
                    temp['rating'] = None
                else:   
                    temp['rating'] = "\u2605"+str(rating/2)+"/5"

                username = value['username']
                temp['username'] = username

            elif key in want:
                temp[key] = value
        count+=1
        data.append(temp)
        
    return jsonify(data)


mov_genre = [
        {
            "id": 28,
            "name": "Action"
        },
        {
            "id": 12,
            "name": "Adventure"
        },
        {
            "id": 16,
            "name": "Animation"
        },
        {
            "id": 35,
            "name": "Comedy"
        },
        {
            "id": 80,
            "name": "Crime"
        },
        {
            "id": 99,
            "name": "Documentary"
        },
        {
            "id": 18,
            "name": "Drama"
        },
        {
            "id": 10751,
            "name": "Family"
        },
        {
            "id": 14,
            "name": "Fantasy"
        },
        {
            "id": 36,
            "name": "History"
        },
        {
            "id": 27,
            "name": "Horror"
        },
        {
            "id": 10402,
            "name": "Music"
        },
        {
            "id": 9648,
            "name": "Mystery"
        },
        {
            "id": 10749,
            "name": "Romance"
        },
        {
            "id": 878,
            "name": "Science Fiction"
        },
        {
            "id": 10770,
            "name": "TV Movie"
        },
        {
            "id": 53,
            "name": "Thriller"
        },
        {
            "id": 10752,
            "name": "War"
        },
        {
            "id": 37,
            "name": "Western"
        }
    ]


tv_genre = [
        {
            "id": 10759,
            "name": "Action & Adventure"
        },
        {
            "id": 16,
            "name": "Animation"
        },
        {
            "id": 35,
            "name": "Comedy"
        },
        {
            "id": 80,
            "name": "Crime"
        },
        {
            "id": 99,
            "name": "Documentary"
        },
        {
            "id": 18,
            "name": "Drama"
        },
        {
            "id": 10751,
            "name": "Family"
        },
        {
            "id": 10762,
            "name": "Kids"
        },
        {
            "id": 9648,
            "name": "Mystery"
        },
        {
            "id": 10763,
            "name": "News"
        },
        {
            "id": 10764,
            "name": "Reality"
        },
        {
            "id": 10765,
            "name": "Sci-Fi & Fantasy"
        },
        {
            "id": 10766,
            "name": "Soap"
        },
        {
            "id": 10767,
            "name": "Talk"
        },
        {
            "id": 10768,
            "name": "War & Politics"
        },
        {
            "id": 37,
            "name": "Western"
        }
    ]
# 284052
# 3033f95d992034583d7f7b63bb286c44




if __name__ == "__main__":
	app.run(debug=True)


