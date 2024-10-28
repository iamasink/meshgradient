function setGradientBackground(points, backgroundColor) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    let background = ``;

    for (let i = 0, len = points.length; i < len; i++) {
        // if (i + 1 == points.length) {
        //     background += `radial-gradient(at ${100}px ${100}px, oklch(0.5 0.4 10) 0px, transparent ${5}%), `;

        // }


        const [x, dx, y, dy, L, C, H] = points[i];

        background += `radial-gradient(at ${x * width}px ${y * height}px, oklch(0.80 0.4 ${H} / 50) 0px, transparent ${100}%), `;

        points[i][0] += points[i][1];
        points[i][2] += points[i][3];
        points[i][6] += points[i][7];

        // for (let j = 0, len = points.length; j < len; j++) {
        //     if (j==i) continue
        //     if (calcDist(x,points[j][0]) <= 500) {

        //     }
        // }

        if (points[i][0] < 0 || points[i][0] > 1) {
            points[i][1] *= -1;
            points[i][3] = (Math.random() - 0.5) * 0.005;
        }
        if (points[i][2] < 0 || points[i][2] > 1) {
            points[i][3] *= -1;
            points[i][1] = (Math.random() - 0.5) * 0.005;
        }
        // points[i][1] += -0.000025 + (Math.random() * 0.00005)
        // points[i][3] += -0.000025 + (Math.random() * 0.00005)
        // console.log(points[i][3])
        // if (points[i][6] < 0 || points[i][6] > 1) points[i][7] *= -1;
    }


    background = background.slice(0, -2);
    backgroundColor[2] += backgroundColor[3]
    document.body.style.backgroundColor = `oklch(${backgroundColor[0]} ${backgroundColor[1]} ${backgroundColor[2]})`;
    document.body.style.backgroundImage = background;
    // `oklch(0.80 0.05 100)`

    // add delay then do it again, theres probably a better way to do this.
    setTimeout(() => setGradientBackground(points, backgroundColor), 5);
}


function initializeAndStart() {
    const points = [];
    const backgroundColor = [0.75,
        ((Math.random()) * 0.4),
        (Math.random()) * 360,
        Math.random() / 10]
    const pointsLength = 7; // number of points
    for (let i = 0; i < pointsLength; i++) {
        const x = Math.random();
        const dx = (Math.random() - 0.5) * 0.005;
        const y = Math.random();
        const dy = (Math.random() - 0.5) * 0.005;
        const L = 50
        const C = 50 + (Math.random()) * 50
        const H = (Math.random()) * 360;
        const dH = -0.05 + Math.random() * 0.1


        points.push([x, dx, y, dy, L, C, H, dH]);
    }


    setGradientBackground(points, backgroundColor);
}

// run when loaded
document.addEventListener("DOMContentLoaded", () => {
    initializeAndStart();
});



function calcDist(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}