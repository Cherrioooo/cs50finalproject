import os

from cs50 import SQL
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import apology, login_required, lookup, usd
from urllib.request import urlopen

import json
import time
import requests as req  


# Configure application
app = Flask(__name__)

# Custom filter
app.jinja_env.filters["usd"] = usd

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///finance.db")


@app.after_request
def after_request(response):
    """Ensure responses aren't cached"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response


@app.route("/")
@login_required
def index():
    """Show portfolio of stocks"""
    UpdataAQIALL()
    return redirect("/AQI?pid=1")    
    # return apology("Update AQI Complete")


@app.route("/buy", methods=["GET", "POST"])
@login_required
def buy():
    """Buy shares of stock"""
    return apology("TODO")


@app.route("/favorite")
@login_required
def favorite():
    """Show history of transactions"""
    user_id = str(session["user_id"])

    sqlHistory = "select `pf`.`user_id`, `pf`.`province_id`, p.en, p.th, p.aqi from `province_fav` `pf` join `province` `p` on `p`.`id`=`pf`.`province_id` where `user_id`='"+ user_id +"' group by `province_id` order by en asc"
    fav = db.execute(sqlHistory)

    i=1;
    fav_his = []
    for row in fav:       
        color = aqiColor( row['aqi'] )
        grade = aqiGrade( row['aqi'] )
        tmp = {
                'i': i, 
                'province_id': row['province_id'], 
                'en': row['en'], 
                'th': row['th'], 
                'aqi': row['aqi'],
                'color':color,
                'grade':grade,
            }
        fav_his.append(tmp)
        # print(tmp)
        i = i+1


    return render_template("favorite.html", fav=fav_his)
    # return apology("TODO")


@app.route("/login", methods=["GET", "POST"])
def login():
    """Log user in"""

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":
        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 403)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 403)

        # Query database for username
        rows = db.execute(
            "SELECT * FROM users WHERE username = ?", request.form.get("username")
        )

        # Ensure username exists and password is correct
        if len(rows) != 1 or not check_password_hash(
            rows[0]["hash"], request.form.get("password")
        ):
            return apology("invalid username and/or password", 403)

        # Remember which user has logged in
        session["user_id"] = rows[0]["id"]
        UpdataAQIALL()
        # Redirect user to home page
        return redirect("/AQI")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


@app.route("/logout")
def logout():
    """Log user out"""

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")

@app.route("/AQI", methods=["GET", "POST"])
@login_required
def aqi():
    """Get stock AQI."""
    url_aqi = "http://api.airvisual.com/v2/nearest_city?key=f224afb4-41dc-407d-b475-3473cfbcb340"
    
    fav = request.args.get('f', type=int, default=0)
    pid = request.args.get('pid', type=int, default=0)
    pid = int( pid )

    user_id = str(session["user_id"])
    # print( "user_id: "+ user_id)

    if(fav == 1):
        addfav(pid, user_id)


    curent_url = request.path 
    # print(curent_url)
    
    aqi = 0
    curent_aqi = 0
    grade = ""
    curent_color = ""
    province_en = ""
    fC = 0
    if(pid > 0):
        # print(pid)
        p = str(pid)
        sqlP = "SELECT * FROM province where id="+p+";"
        province = db.execute(sqlP)
        cur_province = province[0]
        province_en = cur_province['en']
        lat = str( cur_province['lat'] )
        lon = str( cur_province['lon'] )
        url = url_aqi + "&lat=" + lat + "&lon=" + lon  

        curent_aqi = getAQI(url, pid)        
        grade = aqiGrade( curent_aqi )
        curent_color = aqiColor( curent_aqi )

        sqlFav = "select * from province_fav where user_id='"+user_id+"' and province_id='"+p+"'"
        favCheck = db.execute(sqlFav)
        if len(favCheck):
            fC = 1
        else:
            fC = 0               


    sqlProvince = "SELECT * FROM province where aqi > 0 order by aqi asc;"
    # print(sqlProvince)
    province = db.execute(sqlProvince)
    
    # &lat=8.0862997&lon=98.90628349999997"
    i = 0
    topAqi = []
    for row in province:       
        
        th = row['th']
        id = str( row['id'] )
        aqi = int( row['aqi'] )
        lat = str( row['lat'] )
        lon = str( row['lon'] )
        url = url_aqi + "&lat=" + lat + "&lon=" + lon        
        color = aqiColor(aqi)
        province[i]['color'] = color

        i = i+1
        if(i <= 10):                        
            p_aqi = {"id": i, "en":row['en'], "aqi": aqi, "color":color}
            topAqi.append(p_aqi)

        # print(id+" : "+url)        


    # url_api = "http://api.airvisual.com/v2/nearest_city?key=f224afb4-41dc-407d-b475-3473cfbcb340&lat=18.3609104&lon=103.64644629999998"
    # getAQI(url_api, 77)
    # response = urlopen(url)
    # data = response.read()
    # data_json = json.loads(data)        
    # print(data_json)

    return render_template(
            "aqi_map_thailand.html", 
                province=province,
                topAqi=topAqi, 
                curent_aqi=curent_aqi,         
                grade=grade,
                curent_color=curent_color,    
                province_en=province_en,
                pid=pid,
                fC=fC
        )
    # return render_template("test.html", province=province)   
    # return render_template("exams.html", levelList=levelList, exams=exams, sujects=sujects) 
    # return apology("TODO AQI")


@app.route("/quote", methods=["GET", "POST"])
@login_required
def quote():
    """Get stock quote."""
    return apology("TODO")


@app.route("/register", methods=["GET", "POST"])
def register():
    """Register user"""
    # return apology("TODO")
    """Register user"""
    if request.method == "POST":
        # Ensure username was submitted
        if not request.form.get("username"):
            return apology("must provide username", 400)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return apology("must provide password", 400)

        # Ensure password was submitted again
        elif not request.form.get("confirmation"):
            return apology("must re-enter password", 400)

        # Ensure that the passwords match
        if request.form.get("password") != request.form.get("confirmation"):
            return apology("passwords don't match")

        # Check if the username is available
        check = db.execute(
            "SELECT * FROM users WHERE username=?", request.form.get("username")
        )
        if len(check) != 0:
            return apology("username not available")

        db.execute(
            "INSERT INTO users (username, hash, cash) VALUES(?, ?, ?)",
            request.form.get("username"),
            generate_password_hash(request.form.get("confirmation")),
            10000.0,
        )

        # Redirect user to home page
        return redirect("/")
    else:
        return render_template("register.html")


@app.route("/sell", methods=["GET", "POST"])
@login_required
def sell():
    """Sell shares of stock"""
    return apology("TODO")



@app.route("/scale", methods=["GET"])
def scale():
    """Sell shares of stock"""
    return render_template("scale.html")
    # return apology("scale")



def UpdataAQIALL():
    url = "https://www.apu-school.com/office/api/index.php?r=batch/GetAQI"
    response = urlopen(url)
    data = response.read()
    data_json = json.loads(data)     
    for row in data_json:   
        province_id = str( row['id'] )
        aqi = str( row['aqi'] )
        updated_time = str( row['updated_time'] )
        sql_update = "update province set aqi= " + aqi +", updated_time='"+ updated_time +"' where id=" + province_id
        province = db.execute(sql_update)   
    print("update All Complete")


def getAQI(url, province_id):    
    print("getAQI")
    province_id = str( province_id )

    url = "https://www.apu-school.com/office/api/index.php?r=batch/GetAQI/p/" + province_id
    # print(url)

    response = urlopen(url)
    data = response.read()
    data_json = json.loads(data)     
    
    # time.sleep(2)      
    aqi = data_json[0]['aqi']
    aqi = str( aqi )    
    
    province_id = str( province_id )
    sql_update = "update province set aqi= " + aqi +" where id=" + province_id
    province = db.execute(sql_update)
    print("getAQI: "+ aqi )    
    aqi = int(aqi)
    
    return aqi


def aqiColor(aqi):
    color = "#FFFFFF";
    if(aqi < 50):
        color = "#009966";
    elif(aqi < 100):
        color = "#edb201";
    elif(aqi < 150):
        color = "#ff9933";
    elif(aqi < 1200):
        color = "#cc0033";
    elif(aqi < 300):
        color = "#660099";
    else :
        color = "#7e0023";
    
    return color

def aqiGrade(aqi):
  
    grade = "";
    if(aqi < 50):
        grade = "Good";
    elif(aqi < 100):
        grade = "Moderate";
    elif(aqi < 150):
        grade = "Unhealthy for Sensitive Groups";
    elif(aqi < 200):
        grade = "Unhealthy";
    elif(aqi < 300):
        grade = "Very Unhealthy";
    else :
        grade = "Hazardous";
    
    return grade

def addfav(pid, user):
    pid = str( pid )
    user = str( user )

    sqlAddFav = "insert into `province_fav` (`user_id`, `province_id`) values ('"+ user +"','"+ pid +"');"
    print(sqlAddFav)
    rows = db.execute(sqlAddFav)