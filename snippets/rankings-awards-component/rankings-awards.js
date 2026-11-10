(function () {
    'use strict';

    function initRankingsAwards() {
        const components = document.querySelectorAll(
            '[data-rankings-carousel]'
        );

        components.forEach(function (carousel, componentIndex) {
            if (carousel.dataset.initialized === 'true') {
                return;
            }

            carousel.dataset.initialized = 'true';

            const instructions = carousel.querySelector(
                '[data-rankings-instructions]'
            );

            const track = carousel.querySelector(
                '[data-rankings-track]'
            );

            const previousButton = carousel.querySelector(
                '[data-rankings-previous]'
            );

            const nextButton = carousel.querySelector(
                '[data-rankings-next]'
            );

            const controls = carousel.querySelector(
                '[data-rankings-controls]'
            );

            const status = carousel.querySelector(
                '[data-rankings-status]'
            );

            const items = Array.from(
                carousel.querySelectorAll(
                    '.rankings-awards__item'
                )
            );

            let scrollTimer;

            if (instructions) {
                const instructionsId =
                    'rankings-awards-instructions-' +
                    (componentIndex + 1);

                instructions.id = instructionsId;

                carousel.setAttribute(
                    'aria-describedby',
                    instructionsId
                );
            }

            if (
                !track ||
                !previousButton ||
                !nextButton ||
                items.length === 0
            ) {
                return;
            }

            if (items.length === 1 && controls) {
                controls.hidden = true;
            }

            function getCurrentIndex() {
                const trackRect =
                    track.getBoundingClientRect();

                const trackCenter =
                    trackRect.left +
                    (trackRect.width / 2);

                let closestIndex = 0;
                let closestDistance = Infinity;

                items.forEach(function (item, index) {
                    const itemRect =
                        item.getBoundingClientRect();

                    const itemCenter =
                        itemRect.left +
                        (itemRect.width / 2);

                    const distance =
                        Math.abs(
                            trackCenter - itemCenter
                        );

                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestIndex = index;
                    }
                });

                return closestIndex;
            }

            function updateControls(announce) {
                const currentIndex =
                    getCurrentIndex();

                previousButton.disabled =
                    currentIndex === 0;

                nextButton.disabled =
                    currentIndex === items.length - 1;

                if (announce && status) {
                    status.textContent =
                        'Showing ranking or award ' +
                        (currentIndex + 1) +
                        ' of ' +
                        items.length +
                        '.';
                }
            }

            function moveTo(index) {
                const boundedIndex =
                    Math.max(
                        0,
                        Math.min(
                            index,
                            items.length - 1
                        )
                    );

                const reducedMotion =
                    window.matchMedia(
                        '(prefers-reduced-motion: reduce)'
                    ).matches;

                items[boundedIndex].scrollIntoView({
                    behavior:
                        reducedMotion
                            ? 'auto'
                            : 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });

                window.setTimeout(
                    function () {
                        updateControls(true);
                    },
                    reducedMotion ? 0 : 350
                );
            }

            previousButton.addEventListener(
                'click',
                function () {
                    moveTo(
                        getCurrentIndex() - 1
                    );
                }
            );

            nextButton.addEventListener(
                'click',
                function () {
                    moveTo(
                        getCurrentIndex() + 1
                    );
                }
            );

            track.addEventListener(
                'scroll',
                function () {
                    window.clearTimeout(
                        scrollTimer
                    );

                    scrollTimer =
                        window.setTimeout(
                            function () {
                                updateControls(false);
                            },
                            100
                        );
                }
            );

            window.addEventListener(
                'resize',
                function () {
                    window.requestAnimationFrame(
                        function () {
                            updateControls(false);
                        }
                    );
                }
            );

            updateControls(false);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener(
            'DOMContentLoaded',
            initRankingsAwards
        );
    } else {
        initRankingsAwards();
    }

}());