const express = require("express")
const mongoose = require("mongoose")
const bodyparser = require("body-parser");

const app = express();
const port = 5000;

app.use(bodyparser.json());

mongoose.connect('mongodb://localhost:27017/Practical').then(()=>{
    console.log("connected to mongodb");
    
})
.catch((error)=>{
    console.log("mongodb connnection error");
    
})

//a
const songSchema = new mongoose.Schema({
    Songname : {
        type : String
    },
    Filmname : {
        type : String
    },
    Musicdirector : {
        type : String
    },
    Singer : {
        type : String
    },
    Actor : {
        type : String
    },
    Actress : {
        type : String
    },
})

const Song = mongoose.model('Song',songSchema)

app.get('/',(req,res)=>{
    res.send(`
        <html>
            <head>
                <title>Music App</title>
            </head>
            <body>
                <h1>Songs</h1>
                <a href="/songs">View songs</a>
            </body>
        </html>`
    )
})
//b
app.get("/add-songs",async(req,res)=>{
    const songs = [
        { Songname: "Song 1", Filmname: "Film 1", Musicdirector: "Director 1", Singer: "Singer 1" },
        { Songname: "Song 2", Filmname: "Film 2", Musicdirector: "Director 2", Singer: "Singer 2" },
        { Songname: "Song 3", Filmname: "Film 3", Musicdirector: "Director 3", Singer: "Singer 3" },
        { Songname: "Song 4", Filmname: "Film 4", Musicdirector: "Director 4", Singer: "Singer 4" },
        { Songname: "Song 5", Filmname: "Film 5", Musicdirector: "Director 5", Singer: "Singer 5" }
    ]
    
    await Song.insertMany(songs);
    res.send("songs addedd sucessfully")
})
//c
app.get("/songs",async(req,res)=>{
    const songcount = await Song.countDocuments();
    const songs = await Song.find();

    res.send(
        `<html>
            <head>
                <title>Songs</title>
            </head>
            <body>
                <h1>Display Songs</h1>
                <table border='1'>
                    <tr>
                        <th>Songname</th>
                        <th>Film</th>
                        <th>Music_director</th>
                        <th>Singer</th>
                    </tr>
                    ${songs.map(song=>
                        `<tr>
                            <td>${song.Songname}</td>
                            <td>${song.Filmname}</td>
                            <td>${song.Musicdirector}</td>
                            <td>${song.Singer}</td>

                        </tr>`
                    ).join('')
                    }
                </table>
            </body>
        </html>`
    )

})
//d
app.get("/songs/music-director/:director",async(req,res)=>{
    const director = req.params.director;
    const songs = await Song.find({Musicdirector: "Director 1"});
    res.json(songs);
})
//e
app.get("/songs/music-director/:director/singer/:singer",async(req,res)=>{
    const director = req.params.director;
    const singer = req.params.singer;
    const songs = await Song.find({Musicdirector: "Director 1",Singer : "Singer 1"});
    res.json(songs);
})
//f
app.get("/delete-song/:deleteID",async (req,res)=>{
    const songId = req.params.deleteID;
    await Song.findByIdAndDelete(songId);
    res.send("song deleted successfully")
})
//g
app.post("/add-fav-song",async(req,res)=>{
    const { Songname, Film, Music_director, Singer, Actor, Actress } = req.body;
    const newSong = new Song({ Songname, Film, Music_director, Singer, Actor, Actress });
    await newSong.save();
    res.send("Favorite song added!"); 
})
//g
app.get("/songs/film-name/:film/singer/:singer",async(req,res)=>{
    const flim = req.params.film;
    const singer = req.params.singer;
    const songs = await Song.find({Filmname: "Film 1",Singer : "Singer 1"});
    res.json(songs);
})
//h

app.put('/update/:songId',async(req,res)=>{
    const songid = req.params.songId;
    const {Actor,Actress} = req.body;
    await Song.findByIdAndUpdate(songid, {Actor,Actress});
    res.send("done!")
}) 


app.listen(5000,()=>{
    console.log("server is running on http://localhost:5000");
    
})