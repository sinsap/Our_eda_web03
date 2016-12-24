/**
 * Created by sinsap on 2016/12/14.
 */
var counter = 0;
var scores = 0;
/*
 函数功能：判断是否能向上移
 函数参数：指定行与列
 返回值：如果能上移返回true,不能则返回false
 */
function canMoveSelectUp(mark, col) {
    for (var j = mark; j >= 0; j--)
        if (game.pan[j][col] == 0)
            return true;
    return false;
}

/*
 函数功能：判断是否能向右移
 函数参数：指定行与列
 返回值：如果能上移返回true,不能则返回false
 */
function canMoveSelectRight(mark, line) {
    for (j = mark; j < 4; j++)
        if (game.pan[line][j] == 0)
            return true;
    return false;
}
/*
 函数功能：判断是否能向左移
 函数参数：指定行与列
 返回值：如果能上移返回true,不能则返回false
 */
function canMoveSelectLeft(mark, line) {
    for (j = mark; j >= 0; j--)
        if (game.pan[line][j] == 0)
            return true;
    return false;
}
/*
 函数功能：判断是否能向下移
 函数参数：指定行与列
 返回值：如果能上移返回true,不能则返回false
 */
function canMoveSelectDown(mark, col) {
    for (j = mark; j < 4; j++)
        if (game.pan[j][col] == 0)
            return true;
    return false;
}
/*
 创造游戏对象
 */
game = {
    /*游戏棋盘*/
    pan: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    /*开始界面*/
    start: function () {
        var start = Math.floor(Math.random() * 4);
        if (start <= 2) {
            game.create(2);
            game.create(2);
        }
        else {
            game.create(2);
            game.create(4);
        }
    },
    /*
     函数功能：显示分数
     函数参数：分数
     无返回值
     */
    score: function (num) {
        scores += num;
        document.getElementById("0").value = scores.toString();
    },
    /*
     函数功能：创造数字块
     函数参数：数字块数字
     无返回值
     */
    create: function (number) {
        var randomNumber = Math.floor(Math.random() * 16 + 1);
        $(function () {
            if (!($('#' + randomNumber).is(".v2, .v4, .v8, .v16, .v32, .v64, .v128, .v256, .v512, .v1024, .v2048"))) {
                $('#' + randomNumber).addClass('v' + number);
                var line = Math.ceil(randomNumber / 4);
                var col = randomNumber - 4 * (line - 1);
                game.pan[line - 1][col - 1] = number;
            }
            else {
                game.create(number);
                counter++;
            }
        });
    },
    /*
     函数功能：向上叠加
     无参数
     无返回值
     */
    Upequal: function () {
        for (var I = 0; I < 3; I++)
            for (var J = 0; J < 4; J++) {
                if (game.pan[I][J] === game.pan[I + 1][J] && game.pan[I][J] != 0) {
                    var value = game.pan[I + 1][J];
                    var fource = I * 4 + J + 1;
                    var fifth = (I + 1) * 4 + J + 1;
                    $('#' + fource).removeClass('v' + value).addClass('v' + 2 * value);
                    $('#' + fifth).removeClass('v' + value);
                    game.pan[I][J] *= 2;
                    game.pan[I + 1][J] = 0;
                    game.score(value);
                }
            }
    },
    /*
     函数功能：向下叠加
     无参数
     无返回值
     */
    Downequal: function () {
        for (var i = 3; i > 0; i--)
            for (var j = 3; j >= 0; j--) {
                if (game.pan[i][j] === game.pan[i - 1][j] && game.pan[i][j] != 0) {
                    var value = game.pan[i][j];
                    var fource = i * 4 + j + 1;
                    var fifth = (i - 1) * 4 + j + 1;
                    $('#' + fource).removeClass('v' + value).addClass('v' + 2 * value);
                    $('#' + fifth).removeClass('v' + value);
                    game.pan[i][j] *= 2;
                    game.pan[i - 1][j] = 0;
                    game.score(value);
                }
            }
    },
    /*
     函数功能：向左叠加
     无参数
     无返回值
     */
    Leftequal: function () {
        for (var i = 0; i < 4; i++)
            for (var j = 0; j < 3; j++) {
                if (game.pan[i][j] === game.pan[i][j + 1] && game.pan[i][j] != 0) {
                    var value = game.pan[i][j];
                    var fourth = i * 4 + j + 1;
                    var fifth = i * 4 + j + 1 + 1;
                    $('#' + fourth).removeClass('v' + value).addClass('v' + 2 * value);
                    $('#' + fifth).removeClass('v' + value);
                    game.pan[i][j] *= 2;
                    game.pan[i][j + 1] = 0;
                    game.score(value);
                }
            }
    },
    /*
     函数功能：向右叠加
     无参数
     无返回值
     */
    Rightequal: function () {
        for (var i = 0; i < 4; i++)
            for (var j = 3; j > 0; j--) {
                if (game.pan[i][j] === game.pan[i][j - 1] && game.pan[i][j] != 0) {
                    var value = game.pan[i][j];
                    var fourth = i * 4 + j + 1;
                    var fifth = i * 4 + j;
                    $('#' + fourth).removeClass('v' + value).addClass('v' + 2 * value);
                    $('#' + fifth).removeClass('v' + value);
                    game.pan[i][j] *= 2;
                    game.pan[i][j - 1] = 0;
                    game.score(value);
                }
            }
    },
    /*
     函数功能：判断是否能移动（叠加前）
     函数参数：方向的字符串
     返回值：能移动则返回true
     */
    consider: function (direction) {                             //判断是否还能移动
        var mark1, mark2, mark3, mark4;                         //标记最下方元素
        if (direction == "Up") {
            for (var i = 0; i < 4; i++) {
                if (game.pan[i][0] != 0)
                    mark1 = i;
                if (game.pan[i][1] != 0)
                    mark2 = i;
                if (game.pan[i][2] != 0)
                    mark3 = i;
                if (game.pan[i][3] != 0)
                    mark4 = i;
            }
            return (canMoveSelectUp(mark1, 0) ||
                canMoveSelectUp(mark2, 1) ||
                canMoveSelectUp(mark3, 2) ||
                canMoveSelectUp(mark4, 3)
            )
        }
        else if (direction == "Right") {
            for (i = 3; i >= 0; i--) {
                if (game.pan[0][i] != 0)
                    mark1 = i;
                if (game.pan[1][i] != 0)
                    mark2 = i;
                if (game.pan[2][i] != 0)
                    mark3 = i;
                if (game.pan[3][i] != 0)
                    mark4 = i;
            }

            return (canMoveSelectRight(mark1, 0) ||
                canMoveSelectRight(mark2, 1) ||
                canMoveSelectRight(mark3, 2) ||
                canMoveSelectRight(mark4, 3)
            )
        }
        else if (direction == "Left") {
            for (i = 0; i < 4; i++) {
                if (game.pan[0][i] != 0)
                    mark1 = i;
                if (game.pan[1][i] != 0)
                    mark2 = i;
                if (game.pan[2][i] != 0)
                    mark3 = i;
                if (game.pan[3][i] != 0)
                    mark4 = i;
            }
            return (canMoveSelectLeft(mark1, 0) ||
                canMoveSelectLeft(mark2, 1) ||
                canMoveSelectLeft(mark3, 2) ||
                canMoveSelectLeft(mark4, 3)
            )
        }
        else if (direction == "Down") {
            for (i = 3; i >= 0; i--) {
                if (game.pan[i][0] != 0)
                    mark1 = i;
                if (game.pan[i][1] != 0)
                    mark2 = i;
                if (game.pan[i][2] != 0)
                    mark3 = i;
                if (game.pan[i][3] != 0)
                    mark4 = i;
            }
            return (canMoveSelectDown(mark1, 0) ||
                canMoveSelectDown(mark2, 1) ||
                canMoveSelectDown(mark3, 2) ||
                canMoveSelectDown(mark4, 3)
            )
        }
    },
    /*
     函数功能：判断是否能移动（考虑叠加）
     函数参数：方向的字符串
     返回值：能移动则返回true
     */
    reConsider: function (direction) {
        var move = false;
        if (direction === "UpAndDown") {
            for (var i = 0; i < 3; i++)
                for (var j = 0; j < 4; j++) {
                    if (game.pan[i][j] === game.pan[i + 1][j] && game.pan[i][j] != 0)
                        move = true;
                }
        }
        else if (direction === "LeftAndRight") {
            for (var i = 0; i < 4; i++)
                for (var j = 0; j < 3; j++) {
                    if (game.pan[i][j] === game.pan[i][j + 1] && game.pan[i][j] != 0)
                        move = true;
                }
        }
        return move;
    },
    /*
     函数功能：玩游戏
     无参数
     无返回值
     */
    play: document.onkeydown = function () {
        var e = arguments[0];
        if (e.keyCode == 38)                         //up
        {
            game.move("Up");
            setTimeout('game.Upequal()', 5);
            setTimeout('game.remove("Up")', 6);
            setTimeout('game.over()',12);
        }
        else if (e.keyCode == 40)                         //down
        {
            game.move("Down");
            setTimeout('game.Downequal()', 5);
            setTimeout('game.remove("Down")', 6);
            setTimeout('game.over()',12);
        }
        else if (e.keyCode == 37)                        //left
        {
            game.move("Left");
            setTimeout('game.Leftequal()', 5);
            setTimeout('game.remove("Left")', 6);
            setTimeout('game.over()',12);
        }
        else if (e.keyCode == 39)                        //Right
        {
            game.move("Right");
            setTimeout('game.Rightequal()', 5);
            setTimeout('game.remove("Right")', 6);
            setTimeout('game.over()',12);
        }
    },
    /*
     函数功能：获取数字块位置
     无参数
     返回值：包含数字块行与列的数组（从上到下，从左到右）
     */
    mark: function () {
        var allMark = [];
        var line, col;
        for (line = 0; line < 4; line++)
            for (col = 0; col < 4; col++)
                if (game.pan[line][col] != 0) {
                    allMark.push(line);
                    allMark.push(col);
                }
        return allMark;
    },
    /*
     函数功能：获取数字块位置
     无参数
     返回值：包含数字块行与列的数组（从右到左，从上到下）
     */
    LeftAndRightMark: function () {
        var allMark = [];
        var line, col;
        for (col = 3; col >= 0; col--)
            for (line = 0; line < 4; line++)
                if (game.pan[line][col] != 0) {
                    allMark.push(line);
                    allMark.push(col);
                }
        return allMark;
    },

    /*
     函数功能：移动
     函数参数：方向
     无返回值
     */
    move: function (direction) {
        if (direction === "Up") {
            if ((!game.consider("Up")) && game.reConsider("UpAndDown")) {
                setTimeout('game.create(2)', 11);
            }
            if (game.consider("Up")) {
                var allmark = game.mark();
                for (var i = 1; i <= allmark.length / 2; i++) {
                    game.microMove("Up", i);
                }
                setTimeout('game.create(2)', 8);
            }
        }
        else if (direction === "Down") {
            if ((!game.consider("Down")) && game.reConsider("UpAndDown")) {
                setTimeout('game.create(2)', 11);
            }
            if (game.consider("Down")) {
                var allmark = game.mark();
                for (var i = allmark.length / 2; i > 0; i--) {
                    game.microMove("Down", i);
                }
                setTimeout('game.create(2)', 8);
            }
        }
        else if (direction === "Left") {
            if ((!game.consider("Left")) && game.reConsider("LeftAndRight")) {
                setTimeout('game.create(2)', 11);
            }
            if (game.consider("Left")) {
                var allmark = game.LeftAndRightMark();
                for (var i = allmark.length / 2; i > 0; i--) {
                    game.microMove("Left", i);
                }
                setTimeout('game.create(2)', 8);
            }
        }
        else if (direction === "Right") {
            if ((!game.consider("Right")) && game.reConsider("LeftAndRight")) {
                setTimeout('game.create(2)', 11);
            }
            if (game.consider("Right")) {
                var allmark = game.LeftAndRightMark();
                for (var i = 1; i <= allmark.length / 2; i++) {
                    game.microMove("Right", i);
                }
                setTimeout('game.create(2)', 8);
            }
        }
    },
    /*
     函数功能：每个数字块的移动
     函数参数：方向和数字块的标号（第几个）
     无返回值
     */
    microMove: function (direction, number) {
        var use = false;
        var sign = 0;
        var allmark = game.mark();
        var allmark2 = game.LeftAndRightMark();
        if (direction == "Up") {
            for (var i = allmark[(number - 1) * 2]; i >= 0; i--) {
                if (game.pan[i][allmark[number * 2 - 1]] === 0) {
                    sign = i;
                    use = true;
                }
            }
            if (use) {
                var first = allmark[(number - 1) * 2] * 4 + allmark[number * 2 - 1] + 1;
                var second = sign * 4 + allmark[number * 2 - 1] + 1;
                var third = game.pan[allmark[(number - 1) * 2]][allmark[number * 2 - 1]];
                $(function () {
                    $('#' + first).removeClass('v' + third);
                    $('#' + second).addClass('v' + third);
                });
                game.pan[allmark[(number - 1) * 2]][allmark[number * 2 - 1]] = 0;
                game.pan[sign][allmark[number * 2 - 1]] = third;
            }
        }
        else if (direction === "Down") {
            for (var i = allmark[(number - 1) * 2]; i < 4; i++) {
                if (game.pan[i][allmark[number * 2 - 1]] === 0) {
                    sign = i;
                    use = true;
                }
            }
            if (use) {
                var first = allmark[(number - 1) * 2] * 4 + allmark[number * 2 - 1] + 1;
                var second = sign * 4 + allmark[number * 2 - 1] + 1;
                var third = game.pan[allmark[(number - 1) * 2]][allmark[number * 2 - 1]];
                $(function () {
                    $('#' + first).removeClass('v' + third);
                    $('#' + second).addClass('v' + third);
                });
                game.pan[allmark[(number - 1) * 2]][allmark[number * 2 - 1]] = 0;
                game.pan[sign][allmark[number * 2 - 1]] = third;
            }
        }
        else if (direction === "Left") {
            for (var i = allmark2[2 * number - 1]; i >= 0; i--) {
                if (game.pan[allmark2[( number - 1 ) * 2]][i] === 0) {
                    sign = i;
                    use = true;
                }
            }
            if (use) {
                var first = allmark2[(number - 1) * 2] * 4 + allmark2[2 * number - 1] + 1;
                var second = allmark2[(number - 1) * 2] * 4 + sign + 1;
                var third = game.pan[allmark2[(number - 1) * 2]][allmark2[2 * number - 1]];
                $(function () {
                    $('#' + first).removeClass('v' + third);
                    $('#' + second).addClass('v' + third);
                });
                game.pan[allmark2[(number - 1) * 2]][allmark2[2 * number - 1]] = 0;
                game.pan[allmark2[(number - 1) * 2]][sign] = third;
            }
        }
        else if (direction === "Right") {
            for (var i = allmark2[2 * number - 1]; i < 4; i++) {
                if (game.pan[allmark2[(number - 1) * 2]][i] === 0) {
                    sign = i;
                    use = true;
                }
            }
            if (use) {
                var first = allmark2[(number - 1) * 2] * 4 + allmark2[2 * number - 1] + 1;
                var second = allmark2[(number - 1) * 2] * 4 + sign + 1;
                var third = game.pan[allmark2[(number - 1) * 2]][allmark2[2 * number - 1]];
                $(function () {
                    $('#' + first).removeClass('v' + third);
                    $('#' + second).addClass('v' + third);
                });
                game.pan[allmark2[(number - 1) * 2]][allmark2[2 * number - 1]] = 0;
                game.pan[allmark2[(number - 1) * 2]][sign] = third;
            }
        }
    },
    /*
     函数功能：判断游戏结束
     无参数
     无返回值
     */
    over: function () {
        var gameover = true;
        if ((!game.consider("Up")) && (!game.consider("Right")) && (!game.consider("Left")) && (!game.consider("Down"))) {
            for (var i = 0; i < 4; i++)
                for (var j = 0; j < 4; j++) {
                    if (j < 3)
                        if (game.pan[i][j] === game.pan[i][j + 1]) {
                            gameover = false;
                        }
                    if (i < 3)
                        if (game.pan[i][j] === game.pan[i + 1][j]) {
                            gameover = false;
                        }
                }
            if (gameover) {
                alert("You lose");
                window.location.reload(true);
            }
        }
        for (i = 0; i < 4; i++)
            for (j = 0; j < 4; j++) {
                if (game.pan[i][j] === 2048) {
                    alert("You win");
                    window.location.reload(true);
                }
            }
    },
    /*
     函数功能：移动（叠加后的再次移动）
     函数参数：方向
     无返回值
     */
    remove: function (direction) {
        if (direction === "Up") {
            if (game.consider("Up") || game.reConsider()) {
                var allmark = game.mark();
                for (var i = 1; i <= allmark.length / 2; i++) {
                    game.microMove("Up", i);
                }
            }
        }
        else if (direction === "Down") {
            if (game.consider("Down") || game.reConsider()) {
                var allmark = game.mark();
                for (var i = allmark.length / 2; i > 0; i--) {
                    game.microMove("Down", i);
                }
            }
        }
        else if (direction === "Left") {
            if (game.consider("Left") || game.reConsider()) {
                var allmark = game.LeftAndRightMark();
                for (var i = allmark.length / 2; i > 0; i--) {
                    game.microMove("Left", i);
                }
            }
        }
        else if (direction === "Right") {
            if (game.consider("Right") || game.reConsider()) {
                var allmark = game.LeftAndRightMark();
                for (var i = 1; i <= allmark.length / 2; i++) {
                    game.microMove("Right", i);
                }
            }
        }
    }
};
game.start();
game.play();
