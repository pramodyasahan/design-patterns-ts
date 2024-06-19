interface IPhone {
    useLightning(): void;
}

interface Android{
    useMicroUSB(): void;
}

class iPhone7 {
    useLightning() {
        console.log("Using lightning port..");
    }
}

class GooglePixel {
    useMicroUSB() {
        console.log("Using micro USB..");
    }
}

class LightningToMicroUSBAdapter implements Android {
    iphoneDevice: IPhone;

    constructor(iphone: IPhone) {
        this.iphoneDevice = iphone;
    }

    useMicroUSB(): void {
        console.log("Want to use micro USB, converting to Lightning...")
        this.iphoneDevice.useLightning();
    }

}

let iphone = new iPhone7();
let chargeAdaptor = new LightningToMicroUSBAdapter(iphone)

chargeAdaptor.useMicroUSB()
