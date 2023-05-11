class RevealingText {
  constructor(config) {
    this.element = config.element;
    this.text = config.text;
    this.speed = config.speed || 70;

    this.timeout = null;
    this.isDone = false;
  }

  revealOneCharacter(list) {
    // We remove the first char but also selecting it
    const next = list.splice(0, 1)[0];
    next.span.classList.add("revealed");

    if (list.length > 0) {
      this.timeout = setTimeout(() => {
        this.revealOneCharacter(list);
      }, next.delayAfter);
    } else {
      this.isDone = true;
    }
  }

  warpToDone() {
    clearTimeout(this.timeout);
    this.isDone = true;
    this.element.querySelectorAll("span").forEach((s) => {
      s.classList.add("revealed");
    });
  }

  init() {
    let characters = [];
    // "abc" =>  ["a", "b", "c"]
    this.text.split("").forEach((character) => {
      // Create each span, add to element in DOM
      let span = document.createElement("span");
      span.textContent = character;
      console.log(span);
      this.element.appendChild(span);

      //   Add this span to our internal state Array
      characters.push({
        span,
        delayAfter: character === " " ? 0 : this.speed,
      });
    });

    this.revealOneCharacter(characters);
  }
}
