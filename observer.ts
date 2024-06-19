interface Subject {
    notifyObservers(): void;

    registerObserver(o: Observer): void;

    removeObserver(o: Observer): void;
}

interface Observer {
    update(temperature: number): void;
}

class WeatherStation implements Subject {
    private temperature: number;
    private observers: Observer[] = []

    notifyObservers(): void {
        for (let observer of this.observers) {
            observer.update(this.temperature)
        }
    }

    registerObserver(o: Observer): void {
        this.observers.push(o)
    }

    removeObserver(o: Observer): void {
        let index = this.observers.indexOf(o)
        this.observers.splice(index, 1)
    }

    setTemperature(temp: number) {
        console.log("Weather Station: new temperature measurement: " + temp);
        this.temperature = temp;
        this.notifyObservers()
    }
}

class temperatureDisplay implements Observer {
    private subject: Subject;

    constructor(weatherStation: Subject) {
        this.subject = weatherStation;
        weatherStation.registerObserver(this)
    }

    update(temperature: number): void {
        console.log("Need to be updated")
    }

}

class Fan implements Observer {
    private subject: Subject;

    constructor(weatherStation: Subject) {
        this.subject = weatherStation;
        weatherStation.registerObserver(this)
    }

    update(temperature: number): void {
        if (temperature > 25) {
            console.log("Turn on Fans")
        } else {
            console.log("Offing")
        }
    }

}


let weatherStation = new WeatherStation();
let tempDisplay = new temperatureDisplay(weatherStation);
let fan = new Fan(weatherStation);

weatherStation.setTemperature(20);
weatherStation.setTemperature(30);
