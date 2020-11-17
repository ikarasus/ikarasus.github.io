const BASE_URL = "https://api.football-data.org/v2/"
const Api_key = "9fe1d6cb67e34952b4aca47bdfbd096e"
const id_liga = 2021
const endpoint_klasemen = `${BASE_URL}competitions/${id_liga}/standings?standingType=TOTAL`;
const endpoint_team = `${BASE_URL}competitions/${id_liga}/teams`;
const endpoint_detail = `${BASE_URL}teams`

function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error : " + error);
}


function getklasemen() {
    if ('caches' in window) {
        caches.match(endpoint_klasemen).then(function(response) {
            if (response) {
                response.json()
                    .then(function(data) {
                        let tabelKlasemen = ''
                        data.standings.forEach(function(klasemen) {
                            let klasemenData = ''

                            klasemen.table.forEach(function(dataClub) {
                                let teamImg = dataClub.team.crestUrl
                                teamImg = teamImg.replace(/^http:\/\//i, 'https://')

                                klasemenData += `
                                <tr>
                                <td class="center-align">${dataClub.position}</td>
                                <td class="center-align"><img src="${teamImg}" alt="${dataClub.team.name} class="responsive-img" width="24" height="24"></td>
                                <td class="center-align">${dataClub.team.name}
                                <td class="center-align">${dataClub.playedGames}</td>
                                <td class="center-align">${dataClub.won}</td>        
                                <td class="center-align">${dataClub.draw}</td>
                                <td class="center-align">${dataClub.lost}</td>
                                <td class="center-align">${dataClub.goalsFor}</td>
                                <td class="center-align">${dataClub.goalsAgainst}</td>
                                <td class="center-align">${dataClub.goalDifference}</td>
                                <td class="center-align">${dataClub.points}</td>
                                <td class="center-align">
                                <a href="./teamdetail.html?id=${dataClub.team.id}">
                                <i class="small material-icons">directions</i>
                                </a>
                                </td>
                                </tr>`
                            });

                            tabelKlasemen += `
                            <div class="col s12 m12">
                            <div class="card">
                             <div class="card-content">
                            <table class="responsive-table striped" >
                            <thead>
                            <tr>
                                <th class="center-align">Position</th>
                                <th>Logo</th>
                                <th  class="center-align">Team</th>
                                <th class="center-align">Played</th>
                                <th class="center-align">Won</th>
                                <th class="center-align">Draw</th>
                                <th class="center-align">Lost</th>
                                <th class="center-align">GF</th>
                                <th class="center-align">GA</th>
                                <th class="center-align">GD</th>
                                <th class="center-align">Points</th>
                            </tr>
                            </thead>
                            <tbody>` + klasemenData + `</tbody>
                        </table>
                        </div>
                        </div>
                        </div>`
                        });

                        document.getElementById("klasemen-content").innerHTML = tabelKlasemen;
                    })
            }
        })
    }
}




fetch(endpoint_klasemen, {
        headers: {
            'X-Auth-Token': Api_key
        }
    })
    .then(status)
    .then(json)
    .then(function(data) {
        let tabelKlasemen = ''
        data.standings.forEach(function(klasemen) {
            let klasemenData = ''
            klasemen.table.forEach(function(dataClub) {
                let teamImg = dataClub.team.crestUrl
                teamImg = teamImg.replace(/^http:\/\//i, 'https://')

                klasemenData += `
                    <tr>
                    <td class="center-align">${dataClub.position}</td>
                    <td class="center-align"><img src="${teamImg}" alt="${dataClub.team.name} class="responsive-img" width="24" height="24"></td>
                    <td class="center-align">${dataClub.team.name}
                    <td class="center-align">${dataClub.playedGames}</td>
                    <td class="center-align">${dataClub.won}</td>        
                    <td class="center-align">${dataClub.draw}</td>
                    <td class="center-align">${dataClub.lost}</td>
                    <td class="center-align">${dataClub.goalsFor}</td>
                    <td class="center-align">${dataClub.goalsAgainst}</td>
                    <td class="center-align">${dataClub.goalDifference}</td>
                    <td class="center-align">${dataClub.points}</td>
                    <td class="center-align">
                    <a href="./teamdetail.html?id=${dataClub.team.id}">
                    <i class="small material-icons">directions</i>
                    </a>
                    </td>
                    </tr>`
            })

            tabelKlasemen += `
                <div class="card">
                <div class="card-content">
                <table class="responsive-table striped" >
                <thead>
                <tr>
                    <th class="center-align">Position</th>
                    <th>Logo</th>
                    <th  class="center-align">Team</th>
                    <th class="center-align">Played</th>
                    <th class="center-align">Won</th>
                    <th class="center-align">Draw</th>
                    <th class="center-align">Lost</th>
                    <th class="center-align">GF</th>
                    <th class="center-align">GA</th>
                    <th class="center-align">GD</th>
                    <th class="center-align">Points</th>
                </tr>
                </thead>
                <tbody>` + klasemenData + `</tbody>
            </table>
            </div>
            </div>
            </div>`

        })

        document.getElementById("klasemen-content").innerHTML = tabelKlasemen;
    })

.catch(error);


function getteamdetail() {
    return new Promise(function(resolve, reject) {
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("id");

        if ('caches' in window) {
            caches.match(`${BASE_URL}teams/${idParam}`).then(function(response) {
                if (response) {
                    response.json().then(function(data) {
                        console.log(data)

                        data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));
                        document.getElementById('name').innerHTML = data.name;
                        document.getElementById('shortName').innerHTML = data.shortName;
                        document.getElementById('tla').innerHTML = data.tla;
                        document.getElementById('address').innerHTML = data.address;
                        document.getElementById('phone').innerHTML = data.phone;
                        document.getElementById('website').innerHTML = data.website;
                        document.getElementById('email').innerHTML = data.email;
                        document.getElementById('founded').innerHTML = data.founded;
                        document.getElementById('clubColors').innerHTML = data.clubColors;
                        document.getElementById('venue').innerHTML = data.venue;

                        if (data.email == null) {
                            document.getElementById('email').innerHTML = "-";

                        }


                        resolve(data);
                    })
                }
            });

            fetch((`${BASE_URL}teams/${idParam}`), {
                    headers: {
                        'X-Auth-Token': Api_key
                    }
                })
                .then(status)
                .then(json)
                .then(function(data) {
                    console.log(data)

                    data = JSON.parse(JSON.stringify(data).replace(/^http:\/\//i, 'https://'));
                    document.getElementById('name').innerHTML = data.name;
                    document.getElementById('shortName').innerHTML = data.shortName;
                    document.getElementById('tla').innerHTML = data.tla;
                    document.getElementById('address').innerHTML = data.address;
                    document.getElementById('phone').innerHTML = data.phone;
                    document.getElementById('website').innerHTML = data.website;
                    document.getElementById('email').innerHTML = data.email;
                    document.getElementById('founded').innerHTML = data.founded;
                    document.getElementById('clubColors').innerHTML = data.clubColors;
                    document.getElementById('venue').innerHTML = data.venue;

                    if (data.email == null) {
                        document.getElementById('email').innerHTML = "-";
                    }

                    resolve(data);


                })
                .catch(error);
        }
    })
}

function getteam() {
    if ('caches' in window) {
        caches.match(endpoint_team).then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    let teamsHTML = ""
                    data.teams.forEach(function(team) {
                        let urlTeamLogo = team.crestUrl
                        urlTeamLogo = urlTeamLogo.replace(/^http:\/\//i, 'https://')
                        teamsHTML += `
                        <div class="col s12 m6 l6">
                        <div class="card">
                        <div class="card-content cardteam">
                        <div class="center-align"><img class="responsive-img center-align" src="${urlTeamLogo}" alt="${team.name}"></div>
                        <div class="center-align">
                        <a href="./teamdetail.html?id=${team.id}">
                        <h5>${team.name}</h5>
                        </a>
                        </div>
                        <div class="center-align"><a href="${team.website}" target="_blank">${team.website}</a></div>  
                        </div>
                        </div>
                        </div>             
                    `
                    })
                    document.getElementById("team-content").innerHTML = teamsHTML;
                });
            }
        });
    }


    fetch(endpoint_team, {
            headers: {
                'X-Auth-Token': Api_key
            }
        })
        .then(status)
        .then(json)
        .then(function(data) {
            let teamsHTML = ""
            data.teams.forEach(function(team) {
                let urlTeamLogo = team.crestUrl
                urlTeamLogo = urlTeamLogo.replace(/^http:\/\//i, 'https://')
                teamsHTML += `
                <div class="col s12 m6 l6">
                <div class="card">
                <div class="card-content cardteam">
                <div class="center-align"><img class="responsive-img center-align" src="${urlTeamLogo}" alt="${team.name}"></div>
                <div class="center-align">
                <a href="./teamdetail.html?id=${team.id}">
                <h5>${team.name}</h5>
                </a>
                </div>
                <div class="center-align"><a href="${team.website}" target="_blank">${team.website}</a></div>  
                </div>
                </div>
                </div>      
                    `

            })
            document.getElementById("team-content").innerHTML = teamsHTML;

        })
        .catch(error);
}