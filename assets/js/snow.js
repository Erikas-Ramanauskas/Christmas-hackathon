const embedimSnow = document.getElementById("snowfall");

if (!embedimSnow) {
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let snowflakeCSS = '.snowflake';
    let snowflakeHTML = '';

    for (let i = 1; i < 200; i++) {
        snowflakeHTML += '<div class="snowflake"></div>';
        
        const randomX = (getRandomNumber(0, 1000000) * 0.0001),
              randomOffset = getRandomNumber(-100000, 100000) * 0.0001,
              randomTime = (getRandomNumber(3, 8) * 10).toFixed(2),
              randomScale = (getRandomNumber(0, 10000) * 0.0001).toFixed(2);
        
        snowflakeCSS += `
            .snowflake:nth-child(${i}) {
                opacity: ${(getRandomNumber(1, 10000) * 0.0001).toFixed(2)};
                transform: translate(${randomX.toFixed(2)}vw,-10px) scale(${randomScale});
                animation: fall-${i} ${getRandomNumber(10, 30)}s ${getRandomNumber(0, 30)}s linear infinite;
            }
            @keyframes fall-${i} {
                ${randomTime}% {
                    transform: translate(${(randomX + randomOffset).toFixed(2)}vw, ${randomTime}vh) scale(${randomScale});
                }
                to {
                    transform: translate(${(randomX + (randomOffset / 2)).toFixed(2)}vw, 105vh) scale(${randomScale});
                }
            }
        `;
    }

    const snowContainer = document.createElement('div');
    snowContainer.id = 'snowfall';
    snowContainer.innerHTML = `
        <style>
            #snowfall 
            ${snowflakeCSS}
        </style>
        ${snowflakeHTML}
    `;
    document.body.appendChild(snowContainer);
}
