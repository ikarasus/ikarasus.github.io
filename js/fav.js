function resultTeamFav(data) {

    let dataTeamFavHtml = '';
    data.forEach(function(team) {

        dataTeamFavHtml += `
        
        <div class="col s12 m6 l6">
        <div class="card center-align">
        <div class="card-content cardteam">
        <div class="center-align"><img class="responsive-img center-align" src="${team.crestUrl}" alt="${team.name}"></div>
        <div class="center-align">
        <a href="./teamdetail.html?id=${team.id}&saved=true">
        <h5>${team.name}</h5>
        </a>
        </div>
        <div class="center-align"><a href="${team.website}" target="_blank">${team.website}</a></div>  
        </div>
        </div>
        </div>      
        
        `
    });

    document.getElementById("favorite-content").innerHTML = dataTeamFavHtml;
}