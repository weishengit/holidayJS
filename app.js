const holidayList = document.getElementById('holidayList');
const searchBar = document.getElementById('searchBar');
let phHolidays = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredHolidays = phHolidays.holidays.filter((holidays) => {
        return(holidays.name.toLowerCase().includes(searchString))
    });
    displayHolidays(filteredHolidays);
});



const loadHolidays = async () => {
    try {
        const res = await fetch('https://holidayapi.com/v1/holidays?pretty&country=PH&year=2019&key=b293a1d9-10e3-48c9-ba1b-6e5dccfa93ca');
        phHolidays = await res.json();
        displayHolidays(phHolidays.holidays);
        console.log(phHolidays.holidays);
    } catch (err) {
        console.error(err);
    }
};

const displayHolidays = (holidays) => {
    const htmlString = holidays
        .map((holiday) => {
            let cDate = holiday.date;
            let mon = cDate.substr(5, 2);
            let day = cDate.substr(8, 2);
            switch(mon){
                case "01":
                    mon = "January"
                    break;
                case "02":
                    mon = "February"
                    break;
                case "03":
                    mon = "March"
                    break;
                case "04":
                    mon = "April"
                    break;
                case "05":
                    mon = "May"
                    break;
                case "06":
                    mon = "June"
                    break;
                case "07":
                    mon = "July"
                    break;
                case "08":
                    mon = "August"
                    break;
                case "09":
                    mon = "September"
                    break;
                case "10":
                    mon = "October"
                    break;
                case "11":
                    mon = "November"
                    break;
                case "12":
                    mon = "December"
                    break;
                default:
                    mon = "None"
                    break;
            };
            return `
            <li class="holiday">
                <h2>${holiday.name}</h2>
                <p>Date: ${mon} ${day}</p>
            </li>
        `;
        })
        .join('');
    holidayList.innerHTML = htmlString;
};

loadHolidays();