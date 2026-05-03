

const select = document.getElementById("beachSelect");
select.addEventListener("change", getForecast);

async function getForecast() {
    try {
        const option = this.selectedOptions[0];
        const lat = option.getAttribute("data-lat");
        const lng = option.getAttribute("data-lng");
        const beachName = option.textContent;
        
        const res = await fetch(`https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lng}&hourly=wave_height&timezone=auto`);
        const data = await res.json();
        console.log(data);
        
        let waveHeight;
        if (data && data.hourly && data.hourly.wave_height) {
            waveHeight = data.hourly.wave_height[0];
        } else {
            waveHeight = undefined;
        }
        
        let tochen = "";
        tochen += "<div>";
        tochen += `<h3>Wave forecast<br> ${beachName}</h3>`;
        tochen += "<p><strong>Wave height:</strong> " + (waveHeight !== undefined ? waveHeight + " meters" : "No data") + "</p>";
        
        if (waveHeight === undefined) {
            tochen += "<p>No data available</p>";
        }
        else if (waveHeight <= 0.50) {
            tochen += "White flag, you can swim <br>";
            tochen += '<img src="./pic/white.png" width="100">';
        }
        else if (waveHeight > 0.50 && waveHeight <= 1.20) {
            tochen += "Red flag, danger to swim <br>";
            tochen += "דגל אדום ים סוער<br>";
            tochen += '<img src="./pic/red.png" width="100">';
        }
        else if (waveHeight > 1.20) {
            tochen += "Black flag, forbidden to swim<br>";
            tochen += '<img src="./pic/blackFlag.png" width="100">';
        }
        
        tochen += "</div>";
        document.getElementById("pelet1").innerHTML = tochen;
    }
    catch (error) {
        document.getElementById("pelet1").innerHTML = "<p>Error fetching data.</p>";
        console.error("Error:", error);
    }
}


