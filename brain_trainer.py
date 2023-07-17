import random

def generate_sequence(length):
    """
    Generates a random sequence of numbers for the game.
    """
    sequence = []
    for _ in range(length):
        sequence.append(random.randint(1, 9))
    return sequence

def get_user_sequence(length):
    """
    Takes user input for the sequence based on their memory.
    """
    print("Enter the sequence, each number separated by a space:")
    user_input = input().split()
    if len(user_input) != length:
        print(f"Invalid input. Please enter {length} numbers.")
        return get_user_sequence(length)
    try:
        sequence = [int(num) for num in user_input]
    except ValueError:
        print("Invalid input. Please enter numbers only.")
        return get_user_sequence(length)
    return sequence

def play_game():
    """
    Main game loop.
    """
    print("Welcome to Brain Trainer!")
    level = 1
    score = 0

    while True:
        print(f"Level: {level}")
        sequence = generate_sequence(level)
        print("Memorize the sequence:")
        print(sequence)
        
        user_sequence = get_user_sequence(level)
        
        if user_sequence == sequence:
            print("Correct!")
            score += 1
            level += 1
        else:
            print("Incorrect!")
            print(f"Game over. Your final score is {score}.")
            break

if __name__ == "__main__":
    play_game()
