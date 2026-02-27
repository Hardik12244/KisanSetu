async function getAdvice() {

    const state = document.getElementById("state").value;
    const landSize = document.getElementById("landSize").value;

    const response = await fetch("http://localhost:3000/get-advice", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            state: state,
            landSize: Number(landSize)
        })
    });

    const data = await response.json();

    document.getElementById("result").innerHTML = `
        <h1>Category: ${data.category}</h1>
        <p><b>Scheme:</b> ${data.governmentScheme}</p>
        <p><b>Recommended Crop:</b> ${data.recommendedCrop}</p>
        <p><b>Tip:</b> ${data.expertTip}</p>
    `;
}