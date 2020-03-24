import itertools


def game_board(game_map, player=0, row=0, col=0, display=False):
    try:
        if game_map[row][col] != 0:
            print("You cannot use this position!")
            return game_map, False

        print('   ' + '  '.join([str(x) for x in range(len(game))]))
        if not display:
            game_map[row][col] = player
        for i, row in enumerate(game):
            print(i, row)
        return game_map, True
    except IndexError as e:
        print("Error: make sure you input rom/column as 0, 1 or 2", e)
        return game_map, False
    except Exception as e:
        print("Somthing went very wrong!", e)
        return game_map, False


def win(current_game):
    def all_same(el):
        return True if el.count(el[0]) == len(el) and el[0] != 0 else False

    # Horizontals
    for row in game:
        if all_same(row):
            print("Winner!")
            return True
    # Verticals
    for col in range(len(game)):
        check = []
        for row in game:
            check.append(row[col])
        if all_same(check):
            print("Winner!")
            return True

    # Diagonals
    diags_l = []
    for ix in range(len(game)):
        diags_l.append(game[ix][ix])

    if all_same(diags_l):
        print("Winner on diag (\\)!")
        return True

    diags_r = []
    for col, row in enumerate(reversed(range(len(game)))):
        diags_r.append(game[row][col])

    if all_same(diags_r):
        print("Winner on diag (/)!")
        return True


play = True
players = [1, 2]
while play:
    game = [[0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]]

    game_won = False
    game, _ = game_board(game, display=True)
    player_choice = itertools.cycle([1, 2])

    while not game_won:
        current_player = next(player_choice)
        print(f"Current player: {current_player}")
        played = False
        while not played:
            column_choice = int(
                input("What column do you want to play? (0, 1, 2): "))
            row_choice = int(
                input("What row do you want to play? (0, 1, 2): "))
            game, played = game_board(game, current_player,
                                      row_choice, column_choice)
        if win(game):
            game_won = True
            new_game = input(
                "The game is over, would you like to play again? (y/n) ")
            if new_game.lower() == 'y':
                print("Restarting...")
            elif new_game.lower() == 'n':
                print("Bye...")
                play = False
            else:
                print("Not a valid answer...")
                play = False
