var customIcon = L.icon({
    iconUrl: "./images/icon-location.svg",
    iconSize: [46, 56],
  })
  const getIpData = async (inputValue) => {
    let x = 0, y = 0;
    await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_UkyefVFAdIhpc6d7EdjtTnIZkOtAA${inputValue == "" ? "" : "&ipAddress=" + inputValue}`, { method: "GET" })
      .then(async (data) => await data.json())
      .then((res) => {
        x = res.location.lat
        y = res.location.lng
        document.querySelector(".ipAddressDetails").textContent = res.ip
        document.querySelector(".locationDetails").textContent = res.location.city + ", " + res.location.country

        document.querySelector(".locationDetails").textContent += typeof res.location.postalcode == "undefined" ? "" : ", " + res.location.postalcode
        document.querySelector(".timezoneDetails").textContent = res.location.timezone
        console.log()
        document.querySelector(".ispDetails").textContent = res.isp == "" ? "-" : res.isp
      })
      .catch((err) => { console.log(err) })

    var map = L.map('map').setView([x, y], 12);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 21,
      attribution: '© OpenStreetMap'
    }).addTo(map);
    L.marker([x, y], { icon: customIcon }).addTo(map);
  }
  window.addEventListener("load", async () => {
    getIpData("")
  })
  const btn_search = document.querySelector(".search_btn")
  btn_search.addEventListener("click", async () => {
    document.querySelector("#map").remove()
    let mapcanva = document.createElement("main")
    mapcanva.setAttribute("id", "map")
    document.body.appendChild(mapcanva)
    let inputSearch = document.querySelector(".search_input").value
    getIpData(inputSearch)

  })