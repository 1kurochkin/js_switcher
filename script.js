document.addEventListener(`DOMContentLoaded`, () => {
    console.log(`hello`);
    //-------------------UI--ELEMENTS---------------------//
    const start = document.getElementById(`start`),
    end = document.getElementById(`end`),
    schoolMonth = document.querySelector(`.day_this`),
    schoolPrice = document.querySelector(`.money_this`),
    anotherSchoolMonth = document.querySelector(`.day_other`),
    anotherSchoolPrice = document.querySelector(`.money_other`);
    compareRange = document.querySelector(`.compare-range`);
    inputStart = document.querySelector(`#start`);
    inputEnd = document.querySelector(`#end`);
    //---------------------------------------------------//
    
    costList = {
        '0' : {'1' : [1, 6500, 2, 15000], '2' : [2, 12000, 4, 30000], '3' : [3, 18000, 7, 52500], '4' : [4, 24000, 12, 90000],'5' : [6, 35000, 16, 127500]},
        '1' : {'2' : [1, 7000, 2, 15000], '3' : [2, 13000, 5, 37500], '4' : [3, 19000, 10, 75000], '5' : [5, 30000, 13, 112500]},
        '2' : {'3' : [1, 7000, 3, 22500], '4' : [2, 13000, 8, 60000], '5' : [4, 24000, 11, 97500]},
        '3' : {'4' : [1, 7000, 5, 37500], '5' : [3, 18000, 10, 75000]},
        '4' : {'5' : [2, 12000, 5, 37500]},
        '5' : {'5' : [0, 0, 0 , 0]}
    }

    const calcResult = (startValue, endValue) => {
        return costList[startValue][endValue];
    };

    const changeValue = (price) => {
        const [a, b, c, d] = price;
        schoolPrice.textContent = `${b} руб.`;
        schoolMonth.textContent = `${a} ${declOfNum(a)}`;
        anotherSchoolPrice.textContent = `${d} руб.`;
        anotherSchoolMonth.textContent = `${c} ${declOfNum(c)}`;
    };

    const declOfNum = (num) => {
        const month = [`месяц`, `месяца`, `месяцев`];
        if (num === 1) {
            return month[0];
        }
        if (num <= 1 || num >= 5) {
            return month[2];
        } else return month[1]
    };
    
    function handler(event) {
        if(start.value > end.value || end.value < start.value || end.value === start.value) {
            end.value = Number(start.value) + 1;
        };

        const price = calcResult(start.value, end.value);
        changeValue(price);
        
    };

    const someFunc = (event) => {
        // console.log(event.target.className === "elementary change_range");
        const target = event.target;
        if (target.classList.contains(`change_range`)) {
            const parent = target.closest(`#started`) || target.closest(`#ended`);
            const input = parent.querySelector(`input`);
            input.value = target.id;
            handler(event);
        }
    }

    start.addEventListener(`change`, handler);
    end.addEventListener(`change`, handler);
    compareRange.addEventListener(`click`, someFunc);
});
