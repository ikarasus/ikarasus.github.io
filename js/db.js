function databasePromise(idb) {
    let dbPromise = idb.open("dbfootballapp", 1, function(upgradeDb) {
        upgradeDb.objectStoreNames.contains("fav-team")
        let indexTimFav = upgradeDb.createObjectStore("fav-team", {
            keyPath: "id"
        });
        indexTimFav.createIndex("namaTim", "name", {
            unique: false
        });

    });

    return dbPromise;
}

function cekData(storeName, id) {
    return new Promise(function(resolve, reject) {
        databasePromise(idb)
            .then(function(db) {
                let tx = db.transaction(storeName, "readonly");
                let store = tx.objectStore(storeName);
                return store.get(id);
            })
            .then(function(data) {
                if (data != undefined) {
                    resolve("data favorit")
                } else {
                    reject("bukan data favorit")
                }
            });
    });
}

function createDataFav(dataType, data) {
    let storeName = "";
    let dataCreate = {}
    if (dataType == "tim") {
        storeName = "fav-team"
        dataCreate = {
            id: data.id,
            name: data.name,
            shortName: data.shortName,
            tla: data.tla,
            crestUrl: data.crestUrl,
            address: data.address,
            phone: data.phone,
            website: data.website,
            email: data.email,
            founded: data.founded,
            clubColors: data.clubColors,
            venue: data.venue,
            squad: data.squad
        }
    }
    databasePromise(idb).then(db => {
        const tx = db.transaction(storeName, 'readwrite');
        tx.objectStore(storeName).put(dataCreate);

        return tx.complete;
    }).then(function() {
        console.log('tim berhasil disimpan.');
        document.getElementById("save").innerHTML = `
        <div id="save" class="fixed-action-btn">
        <a class="btn-floating btn-large">
          <i class="medium material-icons">delete</i>
        </a>
      </div>`;
        M.toast({
            html: 'team berhasil difavoritkan!'
        });
    }).catch(function() {
        M.toast({
            html: 'team gagal difavoritkan'
        });
    });
}

function deleteDatafav(storeName, data) {
    databasePromise(idb).then(function(db) {
        let tx = db.transaction(storeName, 'readwrite');
        let store = tx.objectStore(storeName);
        store.delete(data);
        return tx.complete;
    }).then(function() {
        console.log('Item deleted');
        document.getElementById("save").innerHTML = `
        <div id="save" class="fixed-action-btn">
        <a class="btn-floating btn-large blue-grey darken-3">
          <i class="medium material-icons">archive</i>
        </a>
      </div>`;
        M.toast({
            html: 'Team berhasil dihapus dari favorit!'
        });
    }).catch(function() {
        M.toast({
            html: 'Team gagal dihapus dari favorit'
        });
    });
}

function getSavedDataById(dataType) {
    // Ambil nilai query parameter (?id=)
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = Number(urlParams.get("id"));

    dataType == "tim"

    getDataById("fav-team", idParam).then(function(tim) {
        // console.error("getSavedTimById: " + tim);
        resultDetailTimJSON(tim)
    })
}

function getDataById(storeName, id) {
    return new Promise(function(resolve, reject) {
        databasePromise(idb)
            .then(function(db) {
                let tx = db.transaction(storeName, "readonly");
                let store = tx.objectStore(storeName);
                return store.get(id);
            })
            .then(function(data) {
                resolve(data);
            });
    });
}

function getAllData(storeName) {
    return new Promise(function(resolve, reject) {
        databasePromise(idb)
            .then(function(db) {
                let tx = db.transaction(storeName, "readonly");
                let store = tx.objectStore(storeName);
                return store.getAll();
            })
            .then(function(data) {
                resolve(data);
            });
    });
}

function setupDataFavHtml(dataType) {

    dataType == "tim"
    getAllData("fav-team").then(function(data) {
        resultTeamFav(data);
    });
}