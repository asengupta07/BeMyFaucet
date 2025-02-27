from vyper import compile_from_file_input
import sys
from web3 import Web3

MY_ADDY = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"

def deploy(filename):
    with open(filename) as f:
        code = f.read()
    details = compile_from_file_input(code, output_formats=['bytecode', 'abi'])
    bytecode = details['bytecode']
    abi = details['abi']
    
    w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))
    contract = w3.eth.contract(bytecode=bytecode, abi=abi)
    nonce = w3.eth.get_transaction_count(MY_ADDY)
    transaction = contract.constructor().build_transaction({
        'nonce': nonce,
        'from': MY_ADDY,
        'gasPrice': w3.eth.gas_price
    })
    signed_transaction = w3.eth.account.sign_transaction(transaction, private_key=PRIVATE_KEY)

    tx_hash = w3.eth.send_raw_transaction(signed_transaction.raw_transaction)
    print("Transaction hash:", tx_hash.hex())
    receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Contract Receipt:", receipt)
    print("Contract deployed at:", receipt['contractAddress'])
    return signed_transaction


if __name__ == '__main__':
    if (len(sys.argv) < 2):
        print("Usage: python deploy.py <filename>")
        sys.exit(1)
    filename = sys.argv[1]
    print(deploy(filename))