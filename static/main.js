// load Movie and TV data from backend server
function loadData(page,t){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
       
            var data = JSON.parse(this.responseText);
            if(t == 'MOV'){
            
                for(i = 0;i < data.length ; i++){
                  
                    var div = document.getElementById('slide'+i);
                    var im = document.createElement("img");
                    var title = document.createElement("div");
                    title.setAttribute("style","width:780px; height:100px; text-align:center;line-height:100px;background: rgba(0,0,0,0.5);position: absolute; top:78%;");

                    im.src = 'https://image.tmdb.org/t/p/w780'+data[i].backdrop_path;
                    div.appendChild(im);
                    title.appendChild(document.createTextNode(data[i].title +' ('));
                    title.appendChild(document.createTextNode(data[i].release_date.slice(0,4)+')'));
                    div.appendChild(title);
           
                }
            }
            else{
                for(i = 0;i < data.length ; i++){
                  
                    var j = i+5;
                    var div = document.getElementById('slide'+j);
                    var im = document.createElement("img");
                    var name = document.createElement("div");
                    name.setAttribute("style","width:780px; height:100px; text-align:center;line-height:100px;background:rgba(0,0,0,0.5);position: absolute; top:78%;");

                    im.src = 'https://image.tmdb.org/t/p/w780'+data[i].backdrop_path;
                    div.appendChild(im);
                    name.appendChild(document.createTextNode(data[i].name+ ' ('));
                    name.appendChild(document.createTextNode(data[i].first_air_date.slice(0,4)+')'));
                    div.appendChild(name);
                }
            }
        }
    };
    req.open("GET","http://localhost:5000/"+page,true );
    req.send();
}



// Side Tab
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
  }



var slideIndex = 0;
var slideIndex2 = 0
 
function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 4000); // Change image every 4 seconds


  }

function showSlides2() {
    var i;
    var slides2 = document.getElementsByClassName("mySlides2");
    for (i = 0; i < slides2.length; i++) {
      slides2[i].style.display = "none";
    }
    slideIndex2++;
    if (slideIndex2 > slides2.length) {slideIndex2 = 1}
    slides2[slideIndex2-1].style.display = "block";
    setTimeout(showSlides2, 4000); // Change image every 4 seconds
}

// prevent reload after submit form
function init(){
    var form = document.getElementById('form');
    form.addEventListener('submit',process,false);
}
function process(e){
    e.preventDefault();
}

// removing all the created elements
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Get backend data for search form 
function SearchData(){
    var input_text = document.getElementById('name').value;
    var input_category = document.getElementById('category').value;
    var place_holder = "https://cinemaone.net/images/movie_placeholder.png";

    const container = document.getElementById('results');
    removeAllChildNodes(container);

    if(input_category.length ==0 || input_text.length == 0){
        alert("Please enter valid values");
        return false;
    }

    else if(input_category == 'Movies'){
        var req = new XMLHttpRequest();
        req.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200){

                try {
                    JSON.parse(this.responseText);
                } 
                catch (e){
                    document.getElementById('results').innerHTML = this.responseText;
                    return false;
                }
            
                var data = JSON.parse(this.responseText);
                var results = document.getElementById('results');
                var show = document.createElement("div");
                show.setAttribute('style','padding:10px');
                show.appendChild(document.createTextNode("Showing results..."));
                results.appendChild(show);
                for(i = 0;i < data.length ; i++){

                    var im = document.createElement("img");
                    var mov= document.createElement("div");
                    var title = document.createElement("div");
                    var date = document.createElement('div');
                    var rate = document.createElement('div');
                    var vote = document.createElement('div');
                    var overview = document.createElement('div');
                    var btn = document.createElement("button");
                
                    
                    btn.innerText = "Show more";
                    btn.id = 'm'+data[i].id;
                    // btn.setAttribute('id',id);
                    btn.onclick = get_detail;
                    

                    // btn.addEventListener("click",get_detail('mov',id,id),false);
                
                    btn.setAttribute('style','position:absolute;left:25%;top:60%;background-color:rgba(255, 0, 0, 0.625); border-radius:5px; color:white; border:none; padding:8px 12px;');
                    title.setAttribute('style', 'position:absolute; left:25%;top:15%; font-size:20px; font-weight:bold;');
                    mov.setAttribute('style', 'position:relative; float:left; border-left:rgba(255, 0, 0, 0.625) solid 8px ;margin-bottom:20px; margin-left:12px; min-width: 850px');
                    im.setAttribute('style', 'float:left; margin:12px');
                    date.setAttribute('style','position:absolute;left:25%;top:25%; font-size:12px; ')
                    rate.setAttribute('style','position:absolute;left:25%;top:30%; font-size:12px;color:red; ')
                    vote.setAttribute('style','position:absolute;left:32%;top:30%; font-size:12px;')
                    overview.setAttribute('style','display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;text-overflow: ellipsis;position:absolute;left:25%;top:40%; font-size:12px;')
                    if(data[i].poster_path == null){
                        im.src = place_holder;
                    }
                    else{im.src = 'https://image.tmdb.org/t/p/w185'+data[i].poster_path;}
                    mov.append(im);

                    title.appendChild(document.createTextNode(data[i].title));
                    mov.append(title);
                    date.appendChild(document.createTextNode(data[i].release_date.slice(0,4)+' | '+data[i].genre_ids))
                    rate.appendChild(document.createTextNode(data[i].vote_average));
                    vote.appendChild(document.createTextNode(data[i].vote_count));
                    overview.appendChild(document.createTextNode(data[i].overview));
                    mov.appendChild(date);
                    mov.appendChild(rate);
                    mov.appendChild(vote);
                    mov.appendChild(overview);
                    mov.appendChild(btn);
                    results.appendChild(mov)

                    
                }
            }
            
        };
        req.open("GET","http://localhost:5000/search_MOV/"+input_text,true );
        req.send();
    }
    else if(input_category == 'TV Shows'){
        var req = new XMLHttpRequest();
        req.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200){
                try {
                    JSON.parse(this.responseText);
                } 
                catch (e){
                    document.getElementById('results').innerHTML = this.responseText;
                    return false;
                }
                var data = JSON.parse(this.responseText);
                var results = document.getElementById('results');
                var show = document.createElement("div");
                show.setAttribute('style','padding:10px');
                show.appendChild(document.createTextNode("Showing results..."));
                results.appendChild(show);
                for(i = 0;i < data.length ; i++){

                    var im = document.createElement("img");
                    var tv= document.createElement("div");
                    var name = document.createElement("div");
                    var date = document.createElement('div');
                    var rate = document.createElement('div');
                    var vote = document.createElement('div');
                    var overview = document.createElement('div');
                    var btn = document.createElement("button");
                 
                    
                    btn.innerText = "Show more";
                    btn.id = 't'+data[i].id;
                    // btn.setAttribute('id',id);
                    btn.onclick = get_detail;
                    // btn.addEventListener("click",get_detail('mov',id,id),false);
                
                
                    btn.setAttribute('style','position:absolute;left:25%;top:60%;background-color:rgba(255, 0, 0, 0.625); border-radius:5px; color:white; border:none; padding:8px 12px;');
                    name.setAttribute('style', 'position:absolute; left:25%;top:15%; font-size:20px; font-weight:bold;');
                    tv.setAttribute('style', 'position:relative; float:left; border-left:rgba(255, 0, 0, 0.625) solid 8px ;margin-bottom:20px; margin-left:12px; min-width: 850px');
                    im.setAttribute('style', 'float:left; margin:12px');
                    date.setAttribute('style','position:absolute;left:25%;top:25%; font-size:12px; ')
                    rate.setAttribute('style','position:absolute;left:25%;top:30%; font-size:12px;color:red; ')
                    vote.setAttribute('style','position:absolute;left:32%;top:30%; font-size:12px;')
                    overview.setAttribute('style','display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;text-overflow: ellipsis;position:absolute;left:25%;top:40%; font-size:12px;')
                    if(data[i].poster_path == null){
                        im.src = place_holder;
                    }
                    else{im.src = 'https://image.tmdb.org/t/p/w185'+data[i].poster_path;}
                    tv.append(im);

                    name.appendChild(document.createTextNode(data[i].name));
                    tv.append(name);
                    date.appendChild(document.createTextNode(data[i].first_air_date.slice(0,4)+' | '+data[i].genre_ids))
                    rate.appendChild(document.createTextNode(data[i].vote_average));
                    vote.appendChild(document.createTextNode(data[i].vote_count));
                    overview.appendChild(document.createTextNode(data[i].overview));
                    tv.appendChild(date);
                    tv.appendChild(rate);
                    tv.appendChild(vote);
                    tv.appendChild(overview);
                    tv.appendChild(btn);
                    results.appendChild(tv)
                }
                
            }
        };
        req.open("GET","http://localhost:5000/search_TV/"+input_text,true );
        req.send();
    }

    else if(input_category == 'Movies and TV Shows'){

        var req = new XMLHttpRequest();
        req.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200){
                try {
                    JSON.parse(this.responseText);
                } 
                catch (e){
                    document.getElementById('results').innerHTML = this.responseText;
                    return false;
                }

                var data = JSON.parse(this.responseText);
                var results = document.getElementById('results');
                var show = document.createElement("div");
                show.setAttribute('style','padding:10px');
                show.appendChild(document.createTextNode("Showing results..."));
                results.appendChild(show);
                for(i = 0;i < data.length ; i++){
                    
                    if (data[i].media_type == 'mov'){
                        var im = document.createElement("img");
                        var mov= document.createElement("div");
                        var title = document.createElement("div");
                        var date = document.createElement('div');
                        var rate = document.createElement('div');
                        var vote = document.createElement('div');
                        var overview = document.createElement('div');
                        var btn = document.createElement("button");
                      
                        btn.innerText = "Show more";
                        btn.id = 'm'+data[i].id;
                        btn.className = data[i].media_type;
                        // btn.setAttribute('id',id);
                        btn.onclick = get_detail;
                        // btn.addEventListener("click",get_detail('mov',id,id),false);
                    
                    
                        btn.setAttribute('style','position:absolute;left:25%;top:60%;background-color:rgba(255, 0, 0, 0.625); border-radius:5px; color:white; border:none; padding:8px 12px;');
                        title.setAttribute('style', 'position:absolute; left:25%;top:15%; font-size:20px; font-weight:bold;');
                        mov.setAttribute('style', 'position:relative; float:left; border-left:rgba(255, 0, 0, 0.625) solid 8px ;margin-bottom:20px; margin-left:12px; min-width: 850px');
                        im.setAttribute('style', 'float:left; margin:12px');
                        date.setAttribute('style','position:absolute;left:25%;top:25%; font-size:12px; ')
                        rate.setAttribute('style','position:absolute;left:25%;top:30%; font-size:12px;color:red; ')
                        vote.setAttribute('style','position:absolute;left:32%;top:30%; font-size:12px;')
                        overview.setAttribute('style','display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;text-overflow: ellipsis;position:absolute;left:25%;top:40%; font-size:12px;')
                        if(data[i].poster_path == null){
                            im.src = place_holder;
                        }
                        else{im.src = 'https://image.tmdb.org/t/p/w185'+data[i].poster_path;}
                        mov.append(im);
    
                        title.appendChild(document.createTextNode(data[i].title));
                        mov.append(title);
                        date.appendChild(document.createTextNode(data[i].first_air_date.slice(0,4)+' | '+data[i].genre_ids))
                        rate.appendChild(document.createTextNode(data[i].vote_average));
                        vote.appendChild(document.createTextNode(data[i].vote_count));
                        overview.appendChild(document.createTextNode(data[i].overview));
                        mov.appendChild(date);
                        mov.appendChild(rate);
                        mov.appendChild(overview);
                        mov.appendChild(btn);
                        results.appendChild(mov)
                    
                    }
                    else if (data[i].media_type == 'tv'){
                        var im = document.createElement("img");
                        var tv= document.createElement("div");
                        var name = document.createElement("div");
                        var date = document.createElement('div');
                        var rate = document.createElement('div');
                        var vote = document.createElement('div');
                        var overview = document.createElement('div');
                        var btn = document.createElement("button");
                        
                        
                        btn.innerText = "Show more";
                        btn.id = 't'+data[i].id;
                        // btn.setAttribute('id',id);
                        btn.onclick = get_detail;
                        // btn.addEventListener("click",get_detail('mov',id,id),false);
                    
                    
                        btn.setAttribute('style','position:absolute;left:25%;top:60%;background-color:rgba(255, 0, 0, 0.625); border-radius:5px; color:white; border:none; padding:8px 12px;');
                        name.setAttribute('style', 'position:absolute; left:25%;top:15%; font-size:20px; font-weight:bold;');
                        tv.setAttribute('style', 'position:relative; float:left; border-left:rgba(255, 0, 0, 0.625) solid 8px ;margin-bottom:20px; margin-left:12px; min-width: 850px');
                        im.setAttribute('style', 'float:left; margin:12px');
                        date.setAttribute('style','position:absolute;left:25%;top:25%; font-size:12px; ')
                        rate.setAttribute('style','position:absolute;left:25%;top:30%; font-size:12px;color:red; ')
                        vote.setAttribute('style','position:absolute;left:32%;top:30%; font-size:12px;')
                        overview.setAttribute('style','display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;text-overflow: ellipsis;position:absolute;left:25%;top:40%; font-size:12px;')
                        if(data[i].poster_path == null){
                            im.src = place_holder;
                        }
                        else{im.src = 'https://image.tmdb.org/t/p/w185'+data[i].poster_path;}
                        tv.append(im);
    
                        name.appendChild(document.createTextNode(data[i].name));
                        tv.append(name);
                        date.appendChild(document.createTextNode(data[i].first_air_date.slice(0,4)+' | '+data[i].genre_ids))
                        rate.appendChild(document.createTextNode(data[i].vote_average));
                        vote.appendChild(document.createTextNode(data[i].vote_count));
                        overview.appendChild(document.createTextNode(data[i].overview));
                        tv.appendChild(date);
                        tv.appendChild(rate);
                        tv.appendChild(vote);
                        tv.appendChild(overview);
                        tv.appendChild(btn);
                        results.appendChild(tv)
                    }
                }
            }
        };
        req.open("GET","http://localhost:5000/search_TV_MOV/"+input_text,true );
        req.send();
    }
}

function get_detail(event) {

    let ID = event.target.id;
    if (ID.slice(0,1)=='m'){
        var type = 'mov';
    }
    else{
        var type = 'tv';
    }
    
    id = ID.slice(1);
    var place_holder = "https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/movie-placeholder.jpg";
    var req = new XMLHttpRequest();
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('overlay');
    modal.classList.add('active');
    overlay.classList.add('active');

    // const openModalButton = document.getElementById(ID);
    // openModalButton.onclick = openModal;

    const closeModalButton = document.getElementById('close_btn');
    closeModalButton.onclick = closeModal;

    const container = document.getElementById('modal');
    while (container.lastChild.id !== 'close_btn') {
        container.removeChild(container.lastChild);
    }

    req.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){

            var data = JSON.parse(this.responseText);
            if(type == 'mov'){
                var modal = document.getElementById('modal');
                var div = document.createElement('div');
                var im = document.createElement("img");
                var title = document.createElement("div");

                var icon =document.createElement("a");
                var date = document.createElement("div");
                var rate = document.createElement("div");
                var vote = document.createElement("div");
                var overview = document.createElement("div");
                var language = document.createElement("div");
                var cast = document.createElement("div");

                icon.innerText = data.icon;
                icon.href = "https://www.themoviedb.org/movie/"+id;

                icon.setAttribute('style','color:red,font-size:10px;text-decoration: none;');
                div.setAttribute('style',' margin:50px; 20px;');
                im.setAttribute('style', 'position:relative;');
                title.setAttribute("style"," margin:10px 0px;font-size:25px;");
                date.setAttribute('style','font-size:12px;margin-bottom:20px; ');
                rate.setAttribute('style','float:left;color:rgba(255, 0, 0, 0.625); font-size:12px;');
                vote.setAttribute('style','font-size:12px; margin-bottom:30px;margin-left:50px;');
                overview.setAttribute('style','font-size:12px;margin-bottom:20px;');
                language.setAttribute('style','font-size:10px; margin-bottom:30px;font-style:italic;');
                cast.setAttribute('style','font-weight:bold; font-size:20px;');

                if(data.backdrop_path == null){
                    im.src = place_holder;
                }
                else{im.src = 'https://image.tmdb.org/t/p/w780'+data.backdrop_path;}
                
                title.appendChild(document.createTextNode(data.title));
                
                date.appendChild(document.createTextNode(data.release_date.slice(0,4)+' | '+ data.genres));
                rate.appendChild(document.createTextNode(data.vote_average));
                vote.appendChild(document.createTextNode(data.vote_count));
                overview.appendChild(document.createTextNode(data.overview));
                language.appendChild(document.createTextNode("Spoken languages:"+ data.spoken_languages));
                cast.appendChild(document.createTextNode('Cast'));

                div.appendChild(im);
                div.appendChild(title);
                div.appendChild(icon);
                div.appendChild(date);
                div.appendChild(rate);
                div.appendChild(vote);
                div.appendChild(overview);
                div.appendChild(language);
                div.appendChild(cast);
                modal.appendChild(div);

            }

            else if (type == 'tv'){
                var modal = document.getElementById('modal');
                var div = document.createElement('div');
                var im = document.createElement("img");
                var name = document.createElement("div");

                var icon =document.createElement("a");
                var date = document.createElement("div");
                var rate = document.createElement("div");
                var vote = document.createElement("div");
                var overview = document.createElement("div");
                var language = document.createElement("div");
                var cast = document.createElement("div");

                icon.innerText = data.icon;
                icon.href = "https://www.themoviedb.org/tv/"+id;
                
                icon.setAttribute('style','color:red,font-size:10px;text-decoration: none;');
                div.setAttribute('style',' margin:50px; 20px;');
                im.setAttribute('style', 'position:relative;');
                name.setAttribute("style"," margin:10px 0px;font-size:25px;");
                date.setAttribute('style','font-size:12px;margin-bottom:20px; ');
                rate.setAttribute('style','float:left;color:rgba(255, 0, 0, 0.625); font-size:12px;');
                vote.setAttribute('style','font-size:12px; margin-bottom:30px;margin-left:50px;');
                overview.setAttribute('style','font-size:12px;margin-bottom:20px;');
                language.setAttribute('style','font-size:10px; margin-bottom:30px;font-style:italic;');
                cast.setAttribute('style','margin-bottom: 20px;font-weight:bold; font-size:20px;');

                if(data.backdrop_path == null){
                    im.src = place_holder;
                }
                else{im.src = 'https://image.tmdb.org/t/p/w780'+data.backdrop_path;}
                
                name.appendChild(document.createTextNode(data.name));
                
                date.appendChild(document.createTextNode(data.first_air_date.slice(0,4)+' | '+ data.genres));
                rate.appendChild(document.createTextNode(data.vote_average));
                vote.appendChild(document.createTextNode(data.vote_count));
                overview.appendChild(document.createTextNode(data.overview));
                language.appendChild(document.createTextNode("Spoken languages:"+ data.spoken_languages));
                cast.appendChild(document.createTextNode('Cast'));

                div.appendChild(im);
                div.appendChild(name);
                div.append(icon);
                div.appendChild(date);
                div.appendChild(rate);
                div.appendChild(vote);
                div.appendChild(overview);
                div.appendChild(language);
                div.appendChild(cast);
                modal.appendChild(div);
            }
            get_credits(type,id);
            


        
        }
    };
    req.open("GET","http://localhost:5000/get_"+type+"_details/"+id,true );
    req.send();


}

function get_credits(type,id) {
    var place_holder = "https://bytes.usc.edu/cs571/s21_JSwasm00/hw/HW6/imgs/person-placeholder.png"
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            // const container = document.getElementById('modal');
            // while (container.childNodes.length > 1) {
            //     container.removeChild(container.lastChild);
            // }
            var data = JSON.parse(this.responseText);
            var cast_block = document.createElement("div");
            cast_block.setAttribute('style','text-align:center;margin:50px; 50px;')
 
            
            for (i =0; i<data.length; i++){
                if(type == 'mov'){
                
                    var modal = document.getElementById('modal');
                    var im = document.createElement("img");
                    var name = document.createElement("div");
                    var char = document.createElement("div");
                    var cast = document.createElement("div");
                    var AS = document.createElement("div");
                    
                    im.setAttribute('style', ' margin-right:10px;margin-bottom:10px;');
                    name.setAttribute("style"," margin-bottom:10px 0px;font-size:15px;font-weight:bold");
                    AS.setAttribute('style','font-size:12px');
                    char.setAttribute('style','font-size:15px; margin-bottom:10px;');
                    cast.setAttribute('style','width: 190px;white-space: nowrap;overflow:hidden;text-overflow:ellipsis;float:left');
            
                    if(data[i].profile_path == null){
                        im.src = place_holder;
                    }
                    else{im.src = 'https://image.tmdb.org/t/p/w185'+data[i].profile_path;}
                    
                    name.appendChild(document.createTextNode(data[i].name));
                    AS.appendChild(document.createTextNode("AS"));
                    char.appendChild(document.createTextNode(data[i].character));
                    


                    cast.appendChild(im);
                    cast.appendChild(name);
                    cast.appendChild(AS);
                    cast.appendChild(char);
                    cast_block.appendChild(cast);
                    modal.appendChild(cast_block);


                }

                else{

                    var modal = document.getElementById('modal');
                    var im = document.createElement("img");
                    var name = document.createElement("div");
                    var char = document.createElement("div");
                    var cast = document.createElement("div");
                    var AS = document.createElement("div");
                    im.setAttribute('style', ' margin-right:10px;margin-bottom:10px;');
                    name.setAttribute("style"," margin-bottom:10px 0px;font-size:15px;font-weight:bold");
                    AS.setAttribute('style','font-size:12px');
                    char.setAttribute('style','font-size:15px; margin-bottom:10px;');
                    cast.setAttribute('style','width: 190px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;float:left');
                    if(data[i].profile_path == null){
                        im.src = place_holder;
                    }
                    else{im.src = 'https://image.tmdb.org/t/p/w185'+data[i].profile_path;}
                    
                    name.appendChild(document.createTextNode(data[i].name));
                    AS.appendChild(document.createTextNode("AS"));
                    char.appendChild(document.createTextNode(data[i].character));
                    
                    cast.appendChild(im);
                    cast.appendChild(name);
                    cast.appendChild(AS);
                    cast.appendChild(char);
                    cast_block.appendChild(cast);
                    modal.appendChild(cast_block);

        
                }
            

            }
            get_reviews(type,id);

            
            
        } 
    };  
    req.open("GET","http://localhost:5000/get_"+type+"_credits/"+id,true );
    req.send();
}


function get_reviews(type,id) {

    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){

            var data = JSON.parse(this.responseText);
            var review_tit = document.createElement("div");
            review_tit.setAttribute('style','margin-bottom:20px;font-weight:bold; font-size:20px;')
            review_tit.appendChild(document.createTextNode('Reviews'));
            var reviews_block = document.createElement("div");
            reviews_block.setAttribute('style','clear:both;margin:50px; 50px;')
            reviews_block.appendChild(review_tit);

            for (i =0; i<data.length; i++){
                if(type == 'mov'){
                    
                    var modal = document.getElementById('modal');
                    var div = document.createElement('div');
                    var name = document.createElement("div");
                    var date = document.createElement("div");
                    var rating = document.createElement("div");   
                    var review = document.createElement("div");
                    
                    
                    div.setAttribute("style","position:relative");
                    name.setAttribute("style","float:left;margin-bottom:10px;font-size:14px;font-weight:bold;margin-right:10px;");
                    date.setAttribute('style','font-size:10px');
                    rating.setAttribute('style','clear:both;font-size:12px;color:rgba(255, 0, 0, 0.625);');
                    review.setAttribute('style',' border-bottom:rgba(193, 187, 187, 0.6) solid 2px;width:800px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 5;overflow: hidden;text-overflow: ellipsis;clear:both;margin-bottom:30px');

                    name.appendChild(document.createTextNode(data[i].username));
                    date.appendChild(document.createTextNode(data[i].created_at));
                    rating.appendChild(document.createTextNode(data[i].rating));
                    review.appendChild(document.createTextNode(data[i].content));
                    
               
                    div.appendChild(name);
                    div.appendChild(date);
                    div.appendChild(rating);
                    div.appendChild(review);
                    reviews_block.appendChild(div);
                    modal.appendChild(reviews_block);

                }
                
                
                
                
                else{

                    var modal = document.getElementById('modal');
                    var div = document.createElement('div');
                    var name = document.createElement("div");
                    var date = document.createElement("div");
                    var rating = document.createElement("div");   
                    var review = document.createElement("div");
                    
                    div.setAttribute("style","position:relative");
                    name.setAttribute("style","float:left;margin-bottom:10px;font-size:14px;font-weight:bold;margin-right:10px;");
                    date.setAttribute('style','font-size:10px');
                    rating.setAttribute('style','clear:both;font-size:12px;color:rgba(255, 0, 0, 0.625);');
                    review.setAttribute('style',' border-bottom:rgba(193, 187, 187, 0.6) solid 2px;width:800px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 5;overflow: hidden;text-overflow: ellipsis;clear:both;margin-bottom:30px');

                    name.appendChild(document.createTextNode(data[i].username));
                    date.appendChild(document.createTextNode(data[i].created_at));
                    rating.appendChild(document.createTextNode(data[i].rating));
                    review.appendChild(document.createTextNode(data[i].content));
                    
               
                    div.appendChild(name);
                    div.appendChild(date);
                    div.appendChild(rating);
                    div.appendChild(review);
                    reviews_block.appendChild(div);
                    modal.appendChild(reviews_block);        
                }
            }
        } 
    };  
    req.open("GET","http://localhost:5000/get_"+type+"_reviews/"+id,true );
    req.send();
}


// function openModal(){
//     const modal = document.getElementById('modal');
//     const overlay = document.getElementById('overlay');
//     modal.classList.add('active');
//     overlay.classList.add('active');
// }
function closeModal(){
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('overlay');
    modal.classList.remove('active');
    overlay.classList.remove('active');
}


