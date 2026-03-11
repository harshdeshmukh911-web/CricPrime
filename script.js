let score = 0
let wickets = 0
let balls = 0
let maxBalls = 0

let inning = 1

let teamA = ""
let teamB = ""

let battingTeam = ""
let bowlingTeam = ""

let target = 0
let tossWinner = ""

function createPlayers(){

let count = document.getElementById("players").value
let box = document.getElementById("playerArea")

box.innerHTML = "<h3>Player Names</h3>"

for(let i=1;i<=count;i++){
box.innerHTML += `<input placeholder="Team A Player ${i}">`
}

for(let i=1;i<=count;i++){
box.innerHTML += `<input placeholder="Team B Player ${i}">`
}

}


function showToss(){

teamA = document.getElementById("teamA").value
teamB = document.getElementById("teamB").value
let overs = document.getElementById("overs").value

if(teamA=="" || teamB=="" || overs==""){

alert("Fill all fields")
return

}

maxBalls = overs * 6

document.getElementById("setup").classList.add("hidden")
document.getElementById("tossBox").classList.remove("hidden")

document.getElementById("tossTeams").innerText = teamA+" vs "+teamB

}


function toss(){

let result = Math.random() < 0.5 ? teamA : teamB

tossWinner = result

document.getElementById("tossResult").innerText = result+" won the toss"

document.getElementById("tossDecision").classList.remove("hidden")

}


function chooseBat(){

battingTeam = tossWinner
bowlingTeam = (tossWinner==teamA) ? teamB : teamA

startMatch()

}


function chooseBowl(){

bowlingTeam = tossWinner
battingTeam = (tossWinner==teamA) ? teamB : teamA

startMatch()

}


function startMatch(){

document.getElementById("tossBox").classList.add("hidden")
document.getElementById("scoreboard").classList.remove("hidden")

document.getElementById("battingTeam").innerText = battingTeam+" Batting"

update()

}


function run(r){

if(balls >= maxBalls) return

score += r
balls++

checkChase()
update()

}


function wicket(){

if(balls >= maxBalls) return

wickets++
balls++

checkChase()
update()

}


function update(){

let overs = Math.floor(balls/6)+"."+(balls%6)

document.getElementById("score").innerText = score+" / "+wickets
document.getElementById("oversDisplay").innerText = "Overs: "+overs

}


function nextInnings(){

if(inning==1){

target = score + 1

document.getElementById("target").innerText = "Target: "+target

inning = 2

score = 0
wickets = 0
balls = 0

let temp = battingTeam
battingTeam = bowlingTeam
bowlingTeam = temp

document.getElementById("battingTeam").innerText = battingTeam+" Chasing"

update()

}

}


function checkChase(){

if(inning==2){

if(score >= target){

document.getElementById("result").innerText =
battingTeam+" won the match by "+(10-wickets)+" wickets"

}

else if(balls >= maxBalls){

if(score < target){

document.getElementById("result").innerText =
bowlingTeam+" won the match by "+(target-score-1)+" runs"

}

else if(score == target-1){

document.getElementById("result").innerText = "Match Tied"

}

}

}

}


function saveMatch(){

let match = {

teamA: teamA,
teamB: teamB,
score: score,
wickets: wickets

}

let history = JSON.parse(localStorage.getItem("matches")) || []

history.push(match)

localStorage.setItem("matches", JSON.stringify(history))

alert("Match Saved")

}


function resetMatch(){

location.reload()

}