class OverworldEvent {
    constructor({ map, event }) {
        this.map = map;
        this.event = event;
    }

    stand(resolve) {
        const who = this.map.gameObjects[this.event.who]
        who.startBehavior({
            map: this.map
        }, {
            type: "stand",
            direction: this.event.direction,
            time: this.event.time
        })

        // Set up handler to complete when correct person is done walking, then resolving the event
        const completeHandler = e => {
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("PersonStandComplete", completeHandler);
                // Resolve promise
                resolve();
            }
        }

        document.addEventListener("PersonStandComplete", completeHandler)
    }

    walk(resolve) {
        const who = this.map.gameObjects[this.event.who]
        who.startBehavior({
            map: this.map
        }, {
            type: "walk",
            direction: this.event.direction,
            retry: true
        })

        // Set up handler to complete when correct person is done walking, then resolving the event
        const completeHandler = e => {
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("PersonWalkingComplete", completeHandler);
                // Resolve promise
                resolve();
            }
        }

        document.addEventListener("PersonWalkingComplete", completeHandler)
    }

    textMessage(resolve) {
        const message = new TextMessage({
            text: this.event.text,
            onComplete: () => resolve()
        })
        message.init(document.querySelector('.game-container'))
    }

    init() {
        return new Promise(resolve => {
            // will match stand or walk etc...
            this[this.event.type](resolve)
        })
    }

}