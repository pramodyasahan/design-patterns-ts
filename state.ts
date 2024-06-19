interface State {
    order: Order;

    cancelOrder(): void;

    verifyOrder(): void;

    shipOrder(): void;
}

class Order {

    public cancelledOrderState: State;
    public paymentPendingState: State;
    public orderShippedState: State;
    public orderBeingPreparedState: State;

    public currentState: State;

    constructor() {
        this.cancelledOrderState = new CancelledOrderState(this)
        this.paymentPendingState = new PaymentPendingState(this)
        this.orderShippedState = new OrderShippedState(this)
        this.orderBeingPreparedState = new OrderBeingPreparedState(this)

        this.setState(this.paymentPendingState)
    }

    public setState(state: State) {
        this.currentState = state;
    }

    public getState(): State {
        return this.currentState;
    }
}

class PaymentPendingState implements State {
    public order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    cancelOrder(): void {
        console.log("Cancelling your unpaid order...");
        this.order.setState(this.order.cancelledOrderState);
    }

    verifyOrder(): void {
        console.log("Payment verified! Shipping soon.");
        this.order.setState(this.order.orderBeingPreparedState);
    }

    shipOrder(): void {
        console.log("Cannot ship the order when payment is pending");
    }

}

class CancelledOrderState implements State {
    public order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    cancelOrder(): void {
        console.log("Your order has already been cancelled");
    }

    verifyOrder(): void {
        console.log("Order cancelled, you cannot verify payment");
    }

    shipOrder(): void {
        console.log("Order cannot ship, it was cancelled");
    }

}

class OrderBeingPreparedState implements State {
    public order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    cancelOrder(): void {
        console.log("Cancelling your order..");
        this.order.setState(this.order.cancelledOrderState);
    }

    verifyOrder(): void {
        console.log("Already verified your payment")
    }

    shipOrder(): void {
        console.log("Shipping your order now")
        this.order.setState(this.order.orderShippedState);
    }

}

class OrderShippedState implements State {
    public order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    cancelOrder(): void {
        console.log("You cannot cancel, already shipped...")
    }

    verifyOrder(): void {
        console.log("You cannot verify payment, already shipped...")
    }

    shipOrder(): void {
        console.log("You cannot ship it again, already shipped...")
    }

}

let order = new Order()
order.getState().verifyOrder()
order.getState().shipOrder()
order.getState().cancelOrder()
console.log('Order state: ' + (<any> order.getState()).constructor.name);