const html_main = document.querySelector('.main > .container');
const category = document.querySelector('.main > .category > .container');

var scroll_y = 0;
var carousel_count = 2;
var bag_items = [];

// [chicken-mcdo-mcnuggets, mcspaghetti-rice-meals, burgers]
var food_category = [false, false, false];

function header_events() {

    let showcase_create_func = () => {
        load_show();
        setTimeout(() => {
            showcase_show();
        }, 1000);
    }

    let home_func = () => {
        if (document.querySelector('.showcase') == null) {
            if (document.querySelector('.my-bag') != null && document.querySelector('.dialog') != null) {
                document.querySelector('.my-bag').style.overflow = 'hidden';
                document.querySelector('.my-bag').classList.remove('show');
                document.querySelector('.filter').classList.remove('show');

                setTimeout(() => {
                    document.querySelector('.filter').outerHTML = '';
                    document.querySelector('.bag').style.removeProperty('background-color');
                    document.querySelector('.bag').style.color = '#fff';
                    document.querySelector('.my-bag').outerHTML = '';

                    let dialog = document.querySelector('.dialog');
                    dialog.childNodes[1].classList.remove('show');
                    dialog.childNodes[0].style.animation = 'none';

                    setTimeout(() => {
                        dialog.childNodes[0].style.animation = 'popdown 400ms linear forwards';
                        setTimeout(() => {
                            dialog.outerHTML = '';
                            showcase_create_func();
                        }, 400);
                    }, 100);

                }, 1000);
            } else
            if (document.querySelector('.my-bag') != null) {
                document.querySelector('.my-bag').style.overflow = 'hidden';
                document.querySelector('.my-bag').classList.remove('show');
                document.querySelector('.filter').classList.remove('show');

                setTimeout(() => {
                    document.querySelector('.filter').outerHTML = '';
                    document.querySelector('.bag').style.removeProperty('background-color');
                    document.querySelector('.bag').style.color = '#fff';
                    document.querySelector('.my-bag').outerHTML = '';
                }, 1000);

                showcase_create_func();
            } else
            if (document.querySelector('.dialog') != null) {
                let dialog = document.querySelector('.dialog');
                dialog.childNodes[1].classList.remove('show');
                dialog.childNodes[0].style.animation = 'none';

                setTimeout(() => {
                    dialog.childNodes[0].style.animation = 'popdown 400ms linear forwards';
                    setTimeout(() => {
                        dialog.outerHTML = '';
                        showcase_create_func();
                    }, 400);
                }, 100);

            } else {
                showcase_create_func();
            }
        }
    }

    document.querySelector('.home').addEventListener('click', () => {
        scrollTo(0, 0);
        home_func();
    })

    document.querySelector('.logo').addEventListener('click', () => {
        scrollTo(0, 0);
        home_func();
    })

    document.querySelector('.bag').addEventListener('click', bag_show)

    document.querySelector('.contacts').addEventListener('click', () => {
        window.scrollTo(0, document.body.scrollHeight);
    })

}

function bag_show() {

    let close = () => {
        document.querySelector('.my-bag').style.overflow = 'hidden';
        document.querySelector('.my-bag').classList.remove('show');
        document.querySelector('.filter').classList.remove('show');

        setTimeout(() => {
            document.querySelector('.filter').outerHTML = '';
            document.querySelector('.bag').style.removeProperty('background-color');
            document.querySelector('.bag').style.color = '#fff';
            document.querySelector('.my-bag').outerHTML = '';
        }, 1000);
    }

    if (document.querySelector('.my-bag')) {
        close();

    } else {

        document.querySelector('.bag').style.backgroundColor = '#000';
        document.querySelector('.bag').style.color = '#fcb917';
        document.body.appendChild(document.createElement('div')).classList.add('filter');
        document.querySelector('.filter').style.zIndex = '1';
        setTimeout(() => {
            document.querySelector('.filter').classList.add('show');
            document.querySelector('.my-bag').classList.add('show');

        }, 100);
        document.querySelector('.filter').addEventListener('click', () => {
            close();
        })
        document.querySelector('.header').appendChild(document.createElement('div')).classList.add('my-bag');
        setTimeout(() => {
            document.querySelector('.my-bag').style.overflow = 'auto';
        }, 1000);
        document.querySelector('.my-bag').appendChild(document.createElement('div')).classList.add('container');
        let my_bag = document.querySelector('.my-bag .container');
        my_bag.appendChild(document.createElement('div')).classList.add('row');
        for (i = 0; i < 3; i++) {
            my_bag.childNodes[0].appendChild(document.createElement('div'));
        }
        my_bag.childNodes[0].childNodes[0].innerHTML = 'ORDER';
        my_bag.childNodes[0].childNodes[1].innerHTML = 'SUMMARY';
        my_bag.childNodes[0].childNodes[2].classList.add('close');
        my_bag.childNodes[0].childNodes[2].addEventListener('click', close);

        let show = () => {
            bag_items_n = 0;

            my_bag.appendChild(document.createElement('div')).classList.add('food');
            let food = document.querySelector('.my-bag > .container > .food');
            my_bag.childNodes[0].insertAdjacentElement('afterend', food);

            for (j = 0; j < Math.round((bag_items.length / 2)); j++) {
                food.appendChild(document.createElement('div')).classList.add('row');
                let row = document.querySelector('.food .row:last-child')

                for (i = 0; i < 2; i++) {

                    row.appendChild(document.createElement('div')).classList.add('block');
                    let block = document.querySelector('.food .row:last-child .block:last-child')
                    block.appendChild(document.createElement('img')).src = bag_items[bag_items_n][0];
                    block.appendChild(document.createElement('div'));
                    block.childNodes[1].appendChild(document.createElement('div')).classList.add('title');
                    block.childNodes[1].childNodes[0].innerHTML = bag_items[bag_items_n][1];

                    block.childNodes[1].appendChild(document.createElement('div')).classList.add('price');
                    block.childNodes[1].childNodes[1].innerHTML = `PHP ${bag_items[bag_items_n][4]}.00`;

                    block.childNodes[1].appendChild(document.createElement('div')).classList.add('qty');
                    block.childNodes[1].childNodes[2].innerHTML = 'Quantity'

                    block.childNodes[1].appendChild(document.createElement('div'));
                    block.childNodes[1].childNodes[3].appendChild(document.createElement('div')).classList.add('qty-button');
                    let qty_button = block.childNodes[1].childNodes[3].childNodes[0];
                    qty_button.appendChild(document.createElement('div')).classList.add('minus');
                    qty_button.childNodes[0].appendChild(document.createElement('i')).classList.add('fas');
                    qty_button.childNodes[0].childNodes[0].classList.add('fa-minus');
                    qty_button.appendChild(document.createElement('div')).classList.add('count');
                    qty_button.childNodes[1].innerHTML = bag_items[bag_items_n][3];
                    qty_button.childNodes[1].style.color = '#fff'
                    qty_button.appendChild(document.createElement('div')).classList.add('plus');
                    qty_button.childNodes[2].appendChild(document.createElement('i')).classList.add('fas');
                    qty_button.childNodes[2].childNodes[0].classList.add('fa-plus');

                    block.childNodes[1].childNodes[3].appendChild(document.createElement('div')).classList.add('remove');
                    block.childNodes[1].childNodes[3].childNodes[1].innerHTML = 'Remove';

                    // Set event listeners

                    // Quantity button
                    let update = (i) => {
                        bag_items[i][3] = parseInt(qty_button.childNodes[1].innerHTML);
                        block.childNodes[1].childNodes[1].innerHTML = `PHP ${parseInt(qty_button.childNodes[1].innerHTML)*bag_items[i][2]}.00`;
                        bag_items[i][4] = parseInt(block.childNodes[1].childNodes[1].innerHTML.substring(3));

                        let total = 0;

                        for (i = 0; i < bag_items.length; i++) {
                            total += bag_items[i][4];
                        }

                        calc.childNodes[1].childNodes[0].innerHTML = `PHP ${total}`;
                        calc.childNodes[1].childNodes[1].innerHTML = 'PHP 69';
                        calc.childNodes[1].childNodes[2].innerHTML = `PHP ${total + parseInt(calc.childNodes[1].childNodes[1].innerHTML.substring(3))}`;

                    }

                    qty_button.childNodes[0].addEventListener('click', () => {

                        if (parseInt(qty_button.childNodes[1].innerHTML) > 1) {
                            qty_button.childNodes[1].innerHTML = parseInt(qty_button.childNodes[1].innerHTML) - 1;
                            for (i = 0; i < bag_items.length; i++) {
                                if (bag_items[i][1] == block.childNodes[1].childNodes[0].innerHTML) {
                                    update(i);
                                }
                            }
                        }
                    });

                    qty_button.childNodes[2].addEventListener('click', () => {
                        qty_button.childNodes[1].innerHTML = parseInt(qty_button.childNodes[1].innerHTML) + 1;
                        for (i = 0; i < bag_items.length; i++) {
                            if (bag_items[i][1] == block.childNodes[1].childNodes[0].innerHTML) {
                                update(i);
                            }
                        }

                    });

                    // Remove button
                    block.childNodes[1].childNodes[3].childNodes[1].addEventListener('click', () => {
                        for (i = 0; i < bag_items.length; i++) {
                            if (bag_items[i][1] == block.childNodes[1].childNodes[0].innerHTML) {
                                bag_items.splice(i, 1);
                                document.querySelector('.my-bag > .container > .food').outerHTML = '';
                                document.querySelector('.my-bag > .container > .order').outerHTML = '';
                                if (bag_items.length > 0) {
                                    show();
                                }

                            }
                        }

                    });

                    if (bag_items_n == bag_items.length - 1) {
                        if (bag_items.length % 2 != 0) {
                            break;
                        }
                    }

                    bag_items_n++;
                }

            }

            my_bag.appendChild(document.createElement('div')).classList.add('order');
            let order = document.querySelector('.order');
            order.appendChild(document.createElement('div'));
            let calc = order.querySelector('.order > div');
            for (i = 0; i < 3; i++) {
                calc.appendChild(document.createElement('div'));
            }
            for (i = 0; i < 3; i++) {
                calc.childNodes[0].appendChild(document.createElement('div'));
            }
            calc.childNodes[0].childNodes[0].innerHTML = 'SUBTOTAL';
            calc.childNodes[0].childNodes[1].innerHTML = 'DELIVERY FEE';
            calc.childNodes[0].childNodes[2].innerHTML = 'GRAND TOTAL';

            for (i = 0; i < 3; i++) {
                calc.childNodes[1].appendChild(document.createElement('div'));
            }

            let total = 0;

            for (i = 0; i < bag_items.length; i++) {
                total += bag_items[i][4];
            }

            calc.childNodes[1].childNodes[0].innerHTML = `PHP ${total}`;
            calc.childNodes[1].childNodes[1].innerHTML = 'PHP 69';
            calc.childNodes[1].childNodes[2].innerHTML = `PHP ${total + parseInt(calc.childNodes[1].childNodes[1].innerHTML.substring(3))}`;

            calc.childNodes[2].id = 'order';
            calc.childNodes[2].innerHTML = 'ORDER';

            // Set event listeners
            calc.childNodes[2].addEventListener('click', () => {
                if (document.querySelector('.dialog')) {
                    document.querySelector('.dialog').outerHTML = '';
                }
                load_show();
                setTimeout(() => {
                    document.body.appendChild(document.createElement('div')).classList.add('dialog');
                    let dialog = document.querySelector('.dialog');
                    dialog.style.zIndex = 99;
                    dialog.appendChild(document.createElement('div')).classList.add('success');
                    dialog.appendChild(document.createElement('div'));
                    setTimeout(() => {
                        dialog.childNodes[1].classList.add('show');
                    }, 100);

                    dialog.childNodes[0].appendChild(document.createElement('i')).classList.add('fas');
                    dialog.childNodes[0].childNodes[0].classList.add('fa-thumbs-up');
                    dialog.childNodes[0].childNodes[0].classList.add('fa-5x');
                    for (i = 0; i < 2; i++) {
                        dialog.childNodes[0].appendChild(document.createElement('div'))
                    }
                    dialog.childNodes[0].childNodes[1].innerHTML = 'Order Success!';
                    dialog.childNodes[0].childNodes[2].innerHTML = 'Close';
                    let remove = () => {
                        dialog.childNodes[1].classList.remove('show');
                        dialog.childNodes[0].style.animation = 'none';
                        dialog.childNodes[0].childNodes[2].removeEventListener('click', remove);
                        dialog.childNodes[1].removeEventListener('click', remove);

                        setTimeout(() => {
                            dialog.childNodes[0].style.animation = 'popdown 400ms linear forwards';
                            setTimeout(() => {
                                dialog.outerHTML = '';
                                bag_items = [];
                                document.querySelector('.my-bag').style.overflow = 'hidden';
                                document.querySelector('.my-bag').classList.remove('show');
                                document.querySelector('.filter').classList.remove('show');

                                setTimeout(() => {
                                    document.querySelector('.filter').outerHTML = '';
                                    document.querySelector('.bag').style.removeProperty('background-color');
                                    document.querySelector('.bag').style.color = '#fff';
                                    document.querySelector('.my-bag').outerHTML = '';

                                    if (document.querySelector('.showcase') == null) {
                                        load_show();
                                        setTimeout(() => {
                                            showcase_show();
                                        }, 1000);
                                    }
                                }, 1000);
                            }, 400);
                        }, 100);
                    }

                    dialog.childNodes[0].childNodes[2].addEventListener('click', remove);
                    dialog.childNodes[1].addEventListener('click', remove);

                }, 1500);
            });

        }

        if (bag_items.length != 0) {
            show();
        }

    }

}

function showcase_show() {

    if (document.getElementById('food-list') != null) {
        document.getElementById('food-list').outerHTML = '';
    }

    food_category = [false, false, false];
    category.innerHTML = "";
    carousel_count = 1;

    html_main.appendChild(document.createElement('div')).classList.add('showcase');
    let showcase = document.querySelector('.showcase');
    showcase.appendChild(document.createElement('div')).classList.add('carousel');
    let carousel = document.querySelector('.carousel');

    for (i = 1; i < 4; i++) {
        carousel.appendChild(document.createElement('input')).id = 'btn-radio-' + i;
        let btn_radio = document.getElementById('btn-radio-' + i);
        btn_radio.type = 'radio';
        btn_radio.name = 'name';
        if (i === 1) {
            btn_radio.checked = 'checked';
        }
    }

    for (i = 1; i < 4; i++) {
        carousel.appendChild(document.createElement('div')).classList.add('slide');

        let slide = document.querySelectorAll('.slide');
        slide[i - 1].appendChild(document.createElement('img'));

        let img = document.querySelectorAll('.slide img');
        img[i - 1].src = `src/images/img-slide/${i}.png`;

        if (i == 1) {
            slide[i - 1].classList.add('first');
        }

    }

    carousel.appendChild(document.createElement('div')).classList.add('btn-radio-s');
    let btn_radio_s = document.querySelector('.btn-radio-s');
    for (i = 1; i < 4; i++) {
        btn_radio_s.appendChild(document.createElement('label')).classList.add('btn-radio');
        let label = document.querySelectorAll('.btn-radio-s label');
        label[i - 1].htmlFor = 'btn-radio-' + i;

    }

    showcase.appendChild(document.createElement('div')).classList.add('foods');
    let foods = document.querySelector('.foods');

    foods.appendChild(document.createElement('div')).classList.add('first-row');
    let first_row = document.querySelector('.foods .first-row');

    first_row.appendChild(document.createElement('div')).id = 'tn-chicken-mcdo-mcnuggets';
    first_row.childNodes[0].appendChild(document.createElement('img'));
    first_row.childNodes[0].childNodes[0].src = 'src/images/foods/chicken-mcdo-mcnuggets/thumbnail.jpg';

    first_row.appendChild(document.createElement('div')).id = 'tn-mcspaghetti-rice-meals';
    first_row.childNodes[1].appendChild(document.createElement('img'));
    first_row.childNodes[1].childNodes[0].src = 'src/images/foods/mcspaghetti-rice-meals/thumbnail.jpg';

    foods.appendChild(document.createElement('div')).classList.add('second-row');
    let second_row = document.querySelector('.foods .second-row');

    second_row.appendChild(document.createElement('div')).id = 'tn-burgers';
    bag_status = false;
    second_row.childNodes[0].appendChild(document.createElement('img'));
    second_row.childNodes[0].childNodes[0].src = 'src/images/foods/burgers/thumbnail.jpg';

    foods_events();

    scrollTo(0, scroll_y);

}

function carousel() {

    document.getElementById("btn-radio-1").addEventListener('click', () => {
        carousel_count = 1;
    });

    btn_radio_2 = document.getElementById("btn-radio-2").addEventListener('click', () => {
        carousel_count = 2;
    });

    btn_radio_3 = document.getElementById("btn-radio-3").addEventListener('click', () => {
        carousel_count = 3;
    });

    setInterval(() => {
        if (document.querySelector('.showcase') != null) {
            document.getElementById('btn-radio-' + carousel_count).checked = true;
            carousel_count = (carousel_count % 3) + 1;
        }

    }, 5000);
}

function food_list_show() {

    if (document.querySelector('.showcase') != null) {
        document.querySelector('.showcase').outerHTML = "";
    }

    let img = ['', '']
    let name = ['', ''];
    let price = ['', '']

    if (food_category[0] == true) {
        img = ['src/images/foods/chicken-mcdo-mcnuggets/food-1.png',
            'src/images/foods/chicken-mcdo-mcnuggets/food-2.png'
        ];
        name = ['1-pc. Chicken McDo w/ Rice', '6-pc. Chicken McNuggets w/ Rice'];
        price = ['PHP 110.00', 'PHP 164.00'];
    }

    if (food_category[1] == true) {
        img = ['src/images/foods/mcspaghetti-rice-meals/food-1.png',
            'src/images/foods/mcspaghetti-rice-meals/food-2.png'
        ];
        name = ['McSpaghetti Platter', 'McCrispy Chicken Fillet Ala King w/ Rice & Fries'];
        price = ['PHP 220.00', 'PHP 113.00'];
    }

    if (food_category[2] == true) {
        img = ['src/images/foods/burgers/food-1.png',
            'src/images/foods/burgers/food-2.png'
        ];
        name = ['Burger McDo', 'Big Mac'];
        price = ['PHP 109.00', 'PHP 202.00'];
    }

    html_main.appendChild(document.createElement('div')).id = 'food-list';

    let chicken_mcdo_mcnuggets = document.getElementById('food-list');

    for (i = 0; i < 2; i++) {

        chicken_mcdo_mcnuggets.appendChild(document.createElement('div')).classList.add('block-' + (i + 1));
        chicken_mcdo_mcnuggets.childNodes[i].appendChild(document.createElement('div')).classList.add('container');
        let block = chicken_mcdo_mcnuggets.childNodes[i].childNodes[0];

        // Block - Row 1
        block.appendChild(document.createElement('div')).classList.add('row-1');
        let block_row_1 = block.childNodes[0];
        block_row_1.appendChild(document.createElement('div'));
        block_row_1.childNodes[0].appendChild(document.createElement('img'));
        block_row_1.childNodes[0].childNodes[0].src = img[i];

        block_row_1.appendChild(document.createElement('div'));
        block_row_1.childNodes[1].appendChild(document.createElement('div')).classList.add('title');
        block_row_1.childNodes[1].childNodes[0].innerHTML = name[i];

        block_row_1.childNodes[1].appendChild(document.createElement('div')).classList.add('price');
        block_row_1.childNodes[1].childNodes[1].innerHTML = price[i];

        block.appendChild(document.createElement('div')).classList.add('row-2');

        // Block - Row 2 - Column 1
        let block_row_2 = block.childNodes[1];
        block_row_2.appendChild(document.createElement('div')).classList.add('col-1');
        let block_row_2_col_1 = block_row_2.childNodes[0];
        block_row_2_col_1.appendChild(document.createElement('div')).classList.add('label');
        block_row_2_col_1.childNodes[0].innerHTML = 'Quantity';

        // Quantity Button
        block_row_2_col_1.appendChild(document.createElement('div')).classList.add('qty-button');
        let qty_button = block_row_2_col_1.childNodes[1];
        qty_button.appendChild(document.createElement('div')).classList.add('minus');
        qty_button.childNodes[0].appendChild(document.createElement('i')).classList.add('fas');
        qty_button.childNodes[0].childNodes[0].classList.add('fa-minus');

        qty_button.appendChild(document.createElement('div')).classList.add('count');
        qty_button.childNodes[1].innerHTML = `1`;

        qty_button.appendChild(document.createElement('div')).classList.add('plus');
        qty_button.childNodes[2].appendChild(document.createElement('i')).classList.add('fas');
        qty_button.childNodes[2].childNodes[0].classList.add('fa-plus');

        // Block - Row 2 - Column 2
        block_row_2.appendChild(document.createElement('div')).classList.add('col-2');
        let block_row_2_col_2 = block_row_2.childNodes[1];
        block_row_2_col_2.appendChild(document.createElement('div')).classList.add('label');
        block_row_2_col_2.childNodes[0].innerHTML = 'Price';

        // Total
        block_row_2_col_2.appendChild(document.createElement('div')).classList.add('total');
        block_row_2_col_2.childNodes[1].appendChild(document.createElement('div'));
        block_row_2_col_2.childNodes[1].childNodes[0].innerHTML = 'PHP';
        block_row_2_col_2.childNodes[1].appendChild(document.createElement('div'));
        block_row_2_col_2.childNodes[1].childNodes[1].innerHTML = price[i].substring(4, 7);

        // Block - Row 3
        block.appendChild(document.createElement('div')).classList.add('row-3');
        let block_row_3 = block.childNodes[2];
        block_row_3.appendChild(document.createElement('div')).classList.add('add');
        block_row_3.childNodes[0].innerHTML = 'ADD TO MY BAG';

        // Set event listeners

        // Quantity button
        let qty_count = 1;
        let price_orig = price[i].substring(4, 7)
        let price_total;
        qty_button.childNodes[0].addEventListener('click', () => {
            if (qty_count > 1) {
                qty_count--;
                qty_button.childNodes[1].innerHTML = qty_count;
                price_total = price_orig * qty_count;
                block_row_2_col_2.childNodes[1].childNodes[1].innerHTML = price_total;
            }
        });
        qty_button.childNodes[2].addEventListener('click', () => {
            qty_count++;
            qty_button.childNodes[1].innerHTML = qty_count;
            price_total = price_orig * qty_count;
            block_row_2_col_2.childNodes[1].childNodes[1].innerHTML = price_total;
        });

        // Add to my bag button
        block_row_3.childNodes[0].addEventListener('click', () => {

            load_show();

            let add = () => {
                bag_items.push([block_row_1.childNodes[0].childNodes[0].src,
                    block_row_1.childNodes[1].childNodes[0].innerHTML,
                    parseInt(block_row_1.childNodes[1].childNodes[1].innerHTML.substring(3)),
                    parseInt(qty_button.childNodes[1].innerHTML),
                    parseInt(block_row_2_col_2.childNodes[1].childNodes[1].innerHTML)
                ]);

                qty_button.childNodes[1].innerHTML = '1';
                block_row_2_col_2.childNodes[1].childNodes[1].innerHTML = parseInt(block_row_1.childNodes[1].childNodes[1].innerHTML.substring(3));
            }

            setTimeout(() => {

                let duplicate = false;

                if (bag_items.length > 0) {
                    for (i = 0; i < bag_items.length; i++) {
                        if (bag_items[i][1] == block_row_1.childNodes[1].childNodes[0].innerHTML) {
                            bag_items[i][3] += parseInt(qty_button.childNodes[1].innerHTML);
                            bag_items[i][4] += parseInt(block_row_2_col_2.childNodes[1].childNodes[1].innerHTML);
                            qty_button.childNodes[1].innerHTML = '1';
                            block_row_2_col_2.childNodes[1].childNodes[1].innerHTML = parseInt(block_row_1.childNodes[1].childNodes[1].innerHTML.substring(3));
                            duplicate = true;
                        }
                    }

                    if (!duplicate) {
                        add();
                        duplicate = false;
                    }

                } else {
                    add();
                }

                document.body.appendChild(document.createElement('div')).classList.add('dialog');
                let dialog = document.querySelector('.dialog');
                dialog.style.zIndex = 1;
                dialog.appendChild(document.createElement('div')).classList.add('added');
                dialog.appendChild(document.createElement('div'));
                setTimeout(() => {
                    dialog.childNodes[1].classList.add('show');
                }, 100);

                dialog.childNodes[0].appendChild(document.createElement('img')).src = 'src/images/paperbag.png';
                for (i = 0; i < 2; i++) {
                    dialog.childNodes[0].appendChild(document.createElement('div'))
                }
                dialog.childNodes[0].childNodes[1].innerHTML = 'Added to Bag!';
                dialog.childNodes[0].childNodes[2].innerHTML = 'Close';
                let remove = () => {
                    dialog.childNodes[1].classList.remove('show');
                    dialog.childNodes[0].style.animation = 'none';
                    dialog.childNodes[0].childNodes[2].removeEventListener('click', remove);
                    dialog.childNodes[1].removeEventListener('click', remove);

                    setTimeout(() => {
                        dialog.childNodes[0].style.animation = 'popdown 400ms linear forwards';
                        setTimeout(() => {
                            dialog.outerHTML = '';
                        }, 400);
                    }, 100);
                }

                dialog.childNodes[0].childNodes[2].addEventListener('click', remove);
                dialog.childNodes[1].addEventListener('click', remove);

            }, 1500);
        })
    }

}

function load_show() {

    document.body.appendChild(document.createElement('div')).classList.add('dialog');
    let dialog = document.querySelector('.dialog');
    dialog.appendChild(document.createElement('div')).classList.add('load');
    dialog.appendChild(document.createElement('div'));
    setTimeout(() => {
        dialog.childNodes[1].classList.add('show');
    }, 100);

    dialog.childNodes[0].appendChild(document.createElement('img')).src = 'src/images/loading.gif';
    for (i = 0; i < 2; i++) {
        dialog.childNodes[0].appendChild(document.createElement('div'))
    }
    dialog.childNodes[0].childNodes[1].innerHTML = 'Loading';
    dialog.childNodes[0].childNodes[2].innerHTML = 'Please wait...';

    setTimeout(() => {
        dialog.childNodes[1].classList.remove('show');
    }, 800);

    setTimeout(() => {
        dialog.childNodes[0].style.animation = 'popdown 400ms linear forwards';
        setTimeout(() => {
            dialog.outerHTML = '';
        }, 400);
    }, 1000);

}

function foods_events() {
    var chicken_mcdo_mcnuggets_event = () => {
        load_show();
        setTimeout(function () {
            document.getElementById('tn-chicken-mcdo-mcnuggets').removeEventListener('click', chicken_mcdo_mcnuggets_event);
            category.innerHTML = 'Chicken McDo and McNuggets';
            food_category[0] = true;
            scroll_y = window.scrollY;
            food_list_show();
        }, 1000);


    }

    document.getElementById('tn-chicken-mcdo-mcnuggets').addEventListener('click', chicken_mcdo_mcnuggets_event);

    var mcspaghetti_rice_meals = () => {
        load_show();
        setTimeout(() => {
            document.getElementById('tn-mcspaghetti-rice-meals').removeEventListener('click', mcspaghetti_rice_meals);
            category.innerHTML = 'McSpaghetti and Rice Meals';
            food_category[1] = true;
            scroll_y = window.scrollY;
            food_list_show();
        }, 1000);
    }

    document.getElementById('tn-mcspaghetti-rice-meals').addEventListener('click', mcspaghetti_rice_meals);

    var burgers = () => {
        load_show();
        setTimeout(() => {
            document.getElementById('tn-burgers').removeEventListener('click', burgers);
            category.innerHTML = 'Burgers';
            food_category[2] = true;
            scroll_y = window.scrollY;
            food_list_show();
        }, 1000);

    }

    document.getElementById('tn-burgers').addEventListener('click', burgers);


}


function main() {

    header_events();
    showcase_show();
    carousel();

}

main();