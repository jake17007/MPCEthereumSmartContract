from Crypto.PublicKey import RSA
from Crypto import Random
import sys, os
from my_utils import safe_open_w
from ast import literal_eval


module = sys.argv[1]

if module == 'generatePublicPrivate':

    # Generate the key pair
    random_generator = Random.new().read
    key = RSA.generate(1024, random_generator)

    # Get the public key
    private_key = key.exportKey()

    # Get the private key
    public_key = key.publickey().exportKey()


    # If this is for a worker
    if sys.argv[2] != 'undefined':

        # Get the worker_id from arguments passed
        worker_id = sys.argv[2]

        # Name the worker_id director
        worker_dir = 'worker_' + str(worker_id)

        # Save the private key to 'worker_<id>/privatekey_<id>.txt'
        private_key_filename = os.path.join(worker_dir, 'privatekey_' + str(worker_id) + '.txt')

        # Save the public key to 'worker_<id>/publickey_<id>.txt'
        public_key_filename = os.path.join(worker_dir, 'publickey_' + str(worker_id) + '.txt')

    # If this is for the company
    else:

        company_dir = 'company'

        # Save the private key to 'company/privatekey.txt'
        private_key_filename = os.path.join(company_dir, 'privatekey.txt')

        # Save the public key to 'worker_<id>/publickey_<id>.txt'
        public_key_filename = os.path.join(company_dir, 'publickey.txt')

    # Save the key pairs
    try:
        with safe_open_w(private_key_filename) as text_file:
            text_file.write(private_key)
        with safe_open_w(public_key_filename) as text_file:
            text_file.write(public_key)
    except IOError as err:
        print(err)

    # Return the public key to the Node program
    print(public_key)

elif module == 'encryptMessage':
    try:
        public_key = sys.argv[2]
        public_key = RSA.importKey(public_key)
        message = sys.argv[3]
        encrypted_message = public_key.encrypt(message, 32)
    except:
        print('encryption didnt work')
    print(encrypted_message)

elif module == 'decryptMessage':
    private_key = sys.argv[2]
    private_key = RSA.importKey(private_key)
    encrypted_message = sys.argv[3]
    encrypted_message = literal_eval(encrypted_message) # Convert back to python tuple
    decrypted_message = private_key.decrypt(encrypted_message)
    print(decrypted_message)

else:
    print('Error in crypto.')
