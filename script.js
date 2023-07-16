let gameInfo = {
    secondsLeft: 60,
    score: 0,
    level: 1,
    rightAnswerPoints: 100,
    rightAnswersCount: 0,
    answersCount: 0,
    winPoints: 100,
    failPoints: 100,
    itemsSpace: 5,
    itemsCount: 3,
    successesCount: 0,
    failuresCount: 0,
    scatteredItemsCount: 1,
    selectionItemsCount: 3,
    isCatOnLeft: true,
    isTimeOver: false,
    isTimerPaused: true,
    rightItems: [],
    selectionItems: [],
    itemsUrls: [
        'assets/item1.png',
        'assets/item2.png',
        'assets/item3.png',
        'assets/item4.png',
        'assets/item5.png',
        'assets/item6.png',
        'assets/item7.png',
        'assets/item8.png',
        'assets/item9.png',
        'assets/item10.png',
        'assets/item11.png',
        'assets/item12.png',
        'assets/item13.png',
        'assets/item14.png',
        'assets/item15.png',
        'assets/item16.png',
        'assets/item17.png',
        'assets/item18.png',
        'assets/item19.png',
        'assets/item20.png',
        'assets/item21.png',
    ]
}

function loadAppWindow() {
    $('.startPage').remove()
    $('#app').append($('<div>', {
        class: 'appWindow',
    }))
    $('.appWindow').append($('<div>', {
        class: 'appWindow__contentWithShadow',
    }))
    $('.appWindow').append($('<div>', {
        class: 'appWindow__background',
    }))
    $('.appWindow__background').append($('<img>', {
        src: 'assets/stageBackground.png',
    }))
    $('.appWindow__contentWithShadow').append($('<div>', {
        class: 'appWindow__text',
        text: 'Необходимо запомнить предметы, находящиеся на стеллаже, и нажать на кнопку «запомнил». Когда выключается свет, кот бегает по комнате и разбрасывает предметы. После включения света вам необходимо выбрать, какие предметы упали с полок'
    }))
    $('.appWindow__contentWithShadow').append($('<button>', {
        class: 'appWindow__buttonStart',
        text: 'Начать тренировку'
    }))
}

function startGame() {
    $('.appWindow__contentWithShadow').empty()
    $('.appWindow__content').append($('<div>', {
        class: 'appWindow__stage'
    }))
    $('#app').append('<div class="counter">3</div>')

    let counterValue = 2;
    let countInterval = setInterval(() => {
        $('.counter').html(counterValue);
        counterValue--;
    }, 1000)
    setTimeout(() => {
        clearInterval(countInterval)
        $('.counter').remove()
        $('.appWindow__contentWithShadow').removeAttr('class').addClass('appWindow__content')
        $('.appWindow').append($('<div>', {
            class: 'appWindow__stage'
        }))
        $('.appWindow__stage').append($('<div>', {
            class: 'appWindow__rack'
        }))
        fillRack()
        setItems()
        createRememberButton()
        $('.appWindow__stage').append($('<div>', {
            class: 'appWindow__LeftCatPlace catPlace'
        }))
        $('.appWindow__stage').append($('<div>', {
            class: 'appWindow__RightCatPlace catPlace'
        }))
        $('.appWindow__stage').append($('<div>', {
            class: 'appWindow__CenterCatPlace catPlace'
        }))
        setCat()
        $('.appWindow__background').css('marginLeft', '-385px')
        $('.appWindow__stage').addClass('stageToLeft')
    }, 2800);
    setTimeout(() => {
        gameInfo.isTimerPaused = false
        setInterval(() => {
            if (!gameInfo.isTimerPaused) {
                if (gameInfo.secondsLeft > 0) {
                    gameInfo.secondsLeft--
                    let seconds = gameInfo.secondsLeft % 60
                    $('.appWindow__statusBarTimer').html(`00:${seconds}`)
                } else {
                    gameInfo.isTimeOver = true
                }
            }
        }, 1000)
        createStatusBar()
    }, 4800)
}

function fillRack() {
    let shelfBooksUrls = [
        'assets/book1.png',
        'assets/book2.png',
        'assets/book3.png',
        'assets/book4.png',
        'assets/book5.png',
        'assets/book6.png',
        'assets/book7.png',
    ]
    for (let book = 0; book < 10; book++) {
        let bookIndex = Math.floor(
            Math.random() * (shelfBooksUrls.length - 1) + 0
        )
        $('.appWindow__rack').append($('<img>', {
            class: 'appWindow__rackShelfImage',
            src: shelfBooksUrls[bookIndex]
        }))
    }

    for (let item = 0; item < gameInfo.itemsSpace; item++) {
        $('.appWindow__rack').append($('<div>', {
            class: 'appWindow__rackShelfItem',
        }))
    }

    for (let book = 0; book < 15; book++) {
        let bookIndex = Math.floor(
            Math.random() * (shelfBooksUrls.length - 1) + 0
        )
        $('.appWindow__rack').append($('<img>', {
            class: 'appWindow__rackShelfImage',
            src: shelfBooksUrls[bookIndex]
        }))
    }
}

function setItems() {
    $('.appWindow__rackShelfItem').empty()
    let items = 0
    gameInfo.rightItems = []
    while (items < gameInfo.itemsCount) {
        let itemIndex = Math.floor(
            Math.random() * (gameInfo.itemsUrls.length - 1) + 0
        )
        let item = gameInfo.itemsUrls[itemIndex]
        let itemSpaceIndex = Math.floor(
            Math.random() * ($('.appWindow__rackShelfItem').length - 1) + 0
        )
        let itemSpace = $('.appWindow__rackShelfItem').eq(itemSpaceIndex)
        if (itemSpace.children().length > 0) continue;
        if ($.inArray(item, gameInfo.rightItems) < 0) {
            gameInfo.rightItems.push(item)
            itemSpace.append($('<img>', {
                class: 'appWindow__rackShelfImage',
                src: item
            }))
            items++
        }
    }
}

function createRememberButton() {
    $('.appWindow__stage').append($('<button>', {
        class: 'appWindow__rememberButton',
        text: 'Запомнил'
    }))
}

function createStatusBar() {
    $('.appWindow__stage').append($('<div>', {
        class: 'appWindow__statusBar'
    }))
    $('.appWindow__statusBar').append($('<div>', {
        class: 'appWindow__statusBarTimer appWindow__statusBarItem',
        text: '01:00'
    }))
    $('.appWindow__statusBar').append($('<div>', {
        class: 'appWindow__statusBarBlock appWindow__statusBarItem'
    }))
    
    $('.appWindow__statusBarBlock').append($('<div>', {
        class: 'appWindow__statusBarLevel appWindow__statusBarItem',
    }))
    $('.appWindow__statusBarBlock').append($('<div>', {
        class: 'appWindow__statusBarSuccesses appWindow__statusBarItem',
    }))
    $('.appWindow__statusBar').append($('<div>', {
        class: 'appWindow__statusBarFailures appWindow__statusBarItem'
    }))
    for (let i = 0; i < 3; i++) {
        $('.appWindow__statusBarSuccesses').append($('<img>', {
            src: 'assets/success.png',
            class: 'appWindow__successIcon'
        }))
        $('.appWindow__statusBarFailures').append($('<img>', {
            src: 'assets/failure.png',
            class: 'appWindow__failureIcon'
        }))
    }
    $('.appWindow__statusBar').append($('<div>', {
        class: 'appWindow__score appWindow__statusBarItem',
    }))
    updateStatusBar()
}

function setCat() {
    $('.catPlace').empty()
    let catPlace
    if (gameInfo.isCatOnLeft) {
        catPlace = $('.appWindow__LeftCatPlace')
    } else {
        catPlace = $('.appWindow__RightCatPlace')
    }
    catPlace.append($('<img>', {
        src: 'assets/dayCat.png'
    }))
}

function offLight() {
    $('.appWindow__rackShelfItem').css('visibility', 'hidden')
    $('.appWindow__rememberButton').remove()
    $('.appWindow__content').css('backgroundImage', 'url(assets/nightBackground.png)')
    $('.catPlace').empty()
    if (gameInfo.isCatOnLeft) {
        $('.appWindow__CenterCatPlace').append($('<img>', {
            src: 'assets/catToRight.png'
        }))
    } else {
        $('.appWindow__CenterCatPlace').append($('<img>', {
            src: 'assets/catToLeft.png'
        }))
    }
    gameInfo.isCatOnLeft = !gameInfo.isCatOnLeft
    setTimeout(() => {
        $('.appWindow__content').css('backgroundImage', '')
        setCat()
    }, 800)
}

function scatterItems() {
    $('.appWindow__selectionItems').remove()
    gameInfo.selectionItems = []
    offLight()
    setTimeout(() => {
        let items = 0
        $('.appWindow__stage').append($('<div>', {
            class: 'appWindow__selectionItems'
        }))
        while (items < gameInfo.scatteredItemsCount) {
            let scatteredItemIndex = Math.round(
                Math.random() * (gameInfo.rightItems.length - 1) + 0
            )
            let item = gameInfo.rightItems[scatteredItemIndex]
            if ($.inArray(item, gameInfo.selectionItems) < 0) {
                gameInfo.selectionItems.push(item)
                items++
            }
        }
        while (gameInfo.selectionItems.length < gameInfo.selectionItemsCount) {
            let selectionItemIndex = Math.round(
                Math.random() * (gameInfo.itemsUrls.length - 1) + 0
            )
            let item = gameInfo.itemsUrls[selectionItemIndex]
            if (
                $.inArray(item, gameInfo.rightItems) < 0 &&
                $.inArray(item, gameInfo.selectionItems) < 0
            ) {
                gameInfo.selectionItems.push(item)
            }
        }
        gameInfo.selectionItems.sort(() => Math.random() - 0.5);
        $.each(gameInfo.selectionItems, (index, value) => {
            let rotationAngle = Math.round(Math.random() * 360 - 0)
            $('.appWindow__selectionItems').append($('<img>', {
                class: 'appWindow__selectionItem',
                src: value
            }).css('transform', `rotate(${rotationAngle}deg)`))
        })
        for (let item = 0; item < $('.appWindow__rackShelfItem').length; item++) {
            let rightItemImg = $('.appWindow__rackShelfItem').eq(item).children('img')
            if ($.inArray(rightItemImg.attr('src'), gameInfo.selectionItems) < 0) {
                rightItemImg.parent().css('visibility', 'visible')
            } else {
                rightItemImg.parent().addClass('hiddenItem')
            }
        }
    }, 800)

}

function changeLevel() {
    if (gameInfo.isTimeOver) {
        endingGame()
        return
    }
    $('.appWindow__selectionItems').remove()
    $('.appWindow__rackShelfItem').removeClass('hiddenItem')
    setItems()
    offLight()
    setTimeout(() => {
        createRememberButton()
        $('.appWindow__rackShelfItem').css('visibility', 'visible')
    }, 800)
}

function rotateItemToForward() {
    let rotationAngle = $(this).attr('style').match(/[0-9]+/)
    $(this).css('transform', `rotate(${Number(rotationAngle[0])+30}deg)`)
}

function rotateItemToBack() {
    let rotationAngle = $(this).attr('style').match(/[0-9]+/);
    $(this).css('transform', `rotate(${Number(rotationAngle[0])-30}deg)`)
}

function checkForMatch() {
    let animationTime = 300
    let rotationAngle = $(this).attr('style').match(/[0-9]+/);
    $(this).css('transform', `rotate(${rotationAngle}deg) scale(1.25)`)
    let itemSrc = $(this).attr('src')
    let hiddenItem = $('.hiddenItem')
    let hiddenItems = []
    for (let item = 0; item < hiddenItem.length; item++) {
        hiddenItems.push(hiddenItem.children('img').eq(item).attr('src'))
    }
    let itemIndex = $.inArray(itemSrc, hiddenItems)
    if (itemIndex > -1) {
        gameInfo.rightAnswersCount += 1
        gameInfo.answersCount += 1
        hiddenItem.eq(itemIndex).removeClass('hiddenItem')
        hiddenItem.eq(itemIndex).css('visibility', 'visible')
        $('.appWindow__stage').append($('<div>', {
            class: 'rightIcon'
        }))
        if ($('.hiddenItem').length == 0) {
            gameInfo.successesCount++
            $('.rightIcon').addClass('lastItem')
            animationTime = 800
            setTimeout(changeLevel, animationTime)
            gameInfo.score += gameInfo.winPoints
        } else {
            gameInfo.score += gameInfo.rightAnswerPoints
        }
        if (gameInfo.successesCount == 3) {
            updateLevel()
        }
    } else {
        gameInfo.answersCount += $('.hiddenItem').length
        $('.appWindow__stage').append($('<div>', {
            class: 'wrongIcon'
        }))
        animationTime = 800
        gameInfo.failuresCount++
        if (gameInfo.failuresCount == 3) {
            setTimeout(endingGame, animationTime)
        } else {
            gameInfo.score -= gameInfo.failPoints
            if (gameInfo.score < 0) gameInfo.score = 0
            setTimeout(changeLevel, animationTime)
        }
    }
    updateStatusBar()
    setTimeout(() => {
        $('.rightIcon, .wrongIcon').remove()
        $(this).css('transform', `rotate(${rotationAngle-30}deg)`)
    }, animationTime)
    $(this).addClass('notActive')
}

function updateLevel() {
    gameInfo.successesCount = 0
    gameInfo.level++
    gameInfo.rightAnswerPoints += 5
    gameInfo.winPoints += 8
    $('.appWindow__successIcon').attr('src', 'assets/success.png')
    $('.appWindow__rackShelfItem').next('.appWindow__rackShelfImage').remove()
    $('.appWindow__rackShelfItem').last().after('<div class="appWindow__rackShelfItem"></div>')
    switch (gameInfo.level) {
        case 2:
            gameInfo.selectionItemsCount = 4
            gameInfo.scatteredItemsCount = 2
            break;
        case 3:
            gameInfo.itemsCount = 4
            break;
        case 4:
            gameInfo.selectionItemsCount = 6
            gameInfo.scatteredItemsCount = 3
            break;
    }
}

function updateStatusBar() {
    $('.appWindow__statusBarLevel').html(`0${gameInfo.level}-10`)
    for (let i = 0; i < gameInfo.successesCount; i++) {
        $('.appWindow__successIcon').eq(i).attr('src', 'assets/successActive.png')
    }
    for (let i = 0; i < gameInfo.failuresCount; i++) {
        $('.appWindow__failureIcon').eq(i).attr('src', 'assets/failureActive.png')
    }
    $('.appWindow__score').html(gameInfo.score)
}

function endingGame() {
    $('.appWindow').remove()
    $('#app').append($('<div>', {
        class: 'app__results'
    }))
    $('.app__results').append($('<div>', {
        class: 'app__header'
    }))
    $('.app__header').append($('<div>', {
        class: 'app__headerText',
        text: 'Ваши результаты'
    }))
    $('.app__results').append($('<div>', {
        class: 'app__resultsContent'
    }))
    let completionPercentage = ((gameInfo.rightAnswersCount / gameInfo.answersCount) * 100).toFixed(2)
    $('.app__resultsContent').append(`
       <tbody>
            <tr class="app__resultsTableRow">
                <td class="app__resultsTableCell Title"> Текущий результат </td>
                <td class="app__resultsTableCell"> ${gameInfo.score} </td>
            </tr>
            <tr class="app__resultsTableRow">
                <td class="app__resultsTableCell Title"> Верных ответов </td>
                <td class="app__resultsTableCell">${gameInfo.rightAnswersCount} из ${gameInfo.answersCount}</td>
            </tr>
            <tr class="app__resultsTableRow">
                <td class="app__resultsTableCell Title"> Точность ответов </td>
                <td class="app__resultsTableCell"> ${completionPercentage}% </td>
            </tr>
        </tbody>`)
}

$('.startPage__buttonNext').click(loadAppWindow)
$(document).on('click', '.appWindow__buttonStart', startGame)
$(document).on('click', '.appWindow__rememberButton', scatterItems)
$(document).on('mouseenter', '.appWindow__selectionItem', rotateItemToForward)
$(document).on('mouseleave', '.appWindow__selectionItem', rotateItemToBack)
$(document).on('click', '.appWindow__selectionItem:not(.notActive)', checkForMatch)
