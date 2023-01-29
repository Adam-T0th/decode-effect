var delegate = (function(){
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector ||
            Element.prototype.webkitMatchesSelector;
    }
    return function(el, evt, sel, handler) {
        el.addEventListener(evt, function (event) {
            var t = event.target;
            while (t && t !== this) {
                if (t.matches(sel)) {
                    handler.call(t, event);
                }
                t = t.parentNode;
            }
        });
    };
}());

// ABCDEFGHIJKLMNOPRSQTUVWXYZ
const letters = 'abcdefghijklmnoprstquvwxyz';
let iterations = 0;

const trigger = () => {

        delegate(document, 'mouseover', 'h1', (event) => {
            console.log('>>> log 1')
            const interval = setInterval(() => {
                event.target.innerText = event.target.innerText.split('')
                    .map((letter, index) => {
                        if(index < iterations) {
                            return event.target.dataset.value[index];
                        }
                        return letters[Math.floor(Math.random() * 26)]
                    })
                    .join("");

                if(iterations >= event.target.dataset.value.length) {
                    clearInterval(interval)
                }
                iterations += 1 / 3;
            }, 30)

            /* for testing */
            delegate(document, 'click', 'button', () => {
                clearInterval(interval);
                document.querySelector('#stopConfirmation').style.visibility = 'visible';
            })
        })
}

trigger();


// needs to re-trigger
delegate(document, 'mouseout', 'h1', () => {
    iterations = 0;
    trigger()
})