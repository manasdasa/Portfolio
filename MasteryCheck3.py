# Mastery Check 3

default_pass = "abc123"
default_pass_messages = []

#  PART 3: Encrypt message based on password
def encryptor(message, password):
    encrypted_message = []
    for character in message:
        character = ord(character)
        character += len(message)
        character -= len(password)
        character += ord(password[0])
        character = chr(character)
        encrypted_message.append(character)
    cipher_text = "".join(encrypted_message)
    print(cipher_text, "is the encrypted message.")
    return cipher_text

# PT 4: Decrypt message based on password
def decryptor(message, password):
    decrypted_message = []
    for character in message:
        character = ord(character)
        character -= ord(password[0])
        character += len(password)
        character -= len(message)
        character = chr(character)
        decrypted_message.append(character)
    plain_text = "".join(decrypted_message)
    print(plain_text, "is the decrypted message.")
    return plain_text

# Pt 2: Print all encrypted messages
def print_all_messages(message_list):
    if len(message_list) == 0:
        print("There are no messages to decrypt.")
        return "None"
    else:
        print("\nAvailable Messages:")
        for i, msg in enumerate(message_list, start=1):  # Start numbering from 1
            print(f"[{i}] {msg}")
        return "Exists"



# PT 1: User Menu
encrypted_messages = []

print("Welcome to the Encryptor!")

while True:
    option = input("\n1-Encrypt a Message\n2-Decrypt a Message\n3-Leave\nEnter an option: ")

    # OPT 1 - Encrypt
    if option == '1':
        use_default = input("Use default password? (yes/no): ").strip().lower()
        if use_default == 'yes':
            message = input("Enter a message to encrypt: ")
            encrypted = encryptor(message, default_pass)
            default_pass_messages.append(encrypted)
        else:
            message = input("Enter a message to encrypt: ")
            password = input("Enter a password: ")
            encrypted = encryptor(message, password)
            encrypted_messages.append(encrypted)

    # OPT 2 - Decrypt
    elif option == '2':
        use_default = input("Was the message encrypted with the default password? (yes/no): ").strip().lower()
        if use_default == 'yes':
            if print_all_messages(default_pass_messages) == "None":
                continue
            try:
                message_num = int(input("Enter a message number to decrypt: "))
                index = message_num - 1
                if 0 <= index < len(default_pass_messages):
                    decryptor(default_pass_messages[index], default_pass)



                else:
                    print("Invalid message number.")
            except ValueError:
                print("Please enter a valid number.")
        else:
            if print_all_messages(encrypted_messages) == "None":
                continue
            try:
                message_num = int(input("Enter a message number to decrypt: "))
                if 0 <= message_num < len(encrypted_messages):
                    password = input("Enter the password: ")
                    decryptor(encrypted_messages[message_num], password)
                else:
                    print("Invalid message number.")
            except ValueError:
                print("Please enter a valid number.")

    # OPT 3 - Exit
    elif option == '3':
        print("Thank you for using the program!")
        break

    else:
        print("Invalid option, try again.")
