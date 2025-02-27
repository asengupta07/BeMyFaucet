import json
import sys
import os
import subprocess
from web3 import Web3
from dotenv import load_dotenv

load_dotenv()

RPC_URLS = {
    "ethereum-sepolia": "https://eth-sepolia.g.alchemy.com/v2/LcgAOYGqo4h01YBp97wTE0nyr9s17oKM",
    "optimism-sepolia": "https://opt-sepolia.g.alchemy.com/v2/LcgAOYGqo4h01YBp97wTE0nyr9s17oKM",
    "polygon-amoy": "https://polygon-amoy.g.alchemy.com/v2/LcgAOYGqo4h01YBp97wTE0nyr9s17oKM",
    "arbitrum-sepolia": "https://arb-sepolia.g.alchemy.com/v2/LcgAOYGqo4h01YBp97wTE0nyr9s17oKM",
    "base-sepolia": "https://base-sepolia.g.alchemy.com/v2/LcgAOYGqo4h01YBp97wTE0nyr9s17oKM",
    "avalanche-fuji": "https://avax-fuji.g.alchemy.com/v2/LcgAOYGqo4h01YBp97wTE0nyr9s17oKM",
}

PRIVATE_KEY = os.getenv("PRIVATE_KEY")

if not PRIVATE_KEY:
    print("Error: PRIVATE_KEY not found in environment variables.")
    sys.exit(1)

if len(sys.argv) != 2:
    print("Usage: python3 deploy.py <contract_name>")
    sys.exit(1)

contract_name = sys.argv[1]

with open(f"contracts/{contract_name}.vy", "r") as f:
    vyper_source = f.read()

def compile_vyper():
    result = subprocess.run(["vyper", f"contracts/{contract_name}.vy"], capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error compiling Vyper contract: {result.stderr}")
        sys.exit(1)
    abi_result = subprocess.run(["vyper", "-f", "abi", f"contracts/{contract_name}.vy"], capture_output=True, text=True)
    if abi_result.returncode != 0:
        print(f"Error generating ABI: {abi_result.stderr}")
        sys.exit(1)
    return abi_result.stdout.rstrip(), result.stdout.rstrip()

def deploy_contract(w3, abi, bytecode):
    account = w3.eth.account.from_key(PRIVATE_KEY)
    contract = w3.eth.contract(abi=json.loads(abi), bytecode=bytecode)
    nonce = w3.eth.get_transaction_count(account.address)
    gas_estimate = contract.constructor().estimate_gas({"from": account.address})
    gas_price = w3.eth.gas_price
    tx = contract.constructor().build_transaction({
        "from": account.address,
        "nonce": nonce,
        "gas": gas_estimate,
        "gasPrice": gas_price,
    })
    signed_tx = w3.eth.account.sign_transaction(tx, PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
    tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
    return tx_receipt.contractAddress

abi, bytecode = compile_vyper()

deployed_contracts = {}

for chain, rpc_url in RPC_URLS.items():
    try:
        print(f"Deploying on {chain}...")
        w3 = Web3(Web3.HTTPProvider(rpc_url))
        if not w3.is_connected():
            print(f"Failed to connect to {chain}")
            continue
        contract_address = deploy_contract(w3, abi, bytecode)
        deployed_contracts[chain] = contract_address
        print(f"Deployed on {chain}: {contract_address}")
    except Exception as e:
        print(f"Error deploying on {chain}: {e}")

output_data = {"abi": json.loads(abi), "contracts": deployed_contracts}
with open("deployed_contracts.json", "w") as f:
    json.dump(output_data, f, indent=4)

print("Deployment complete. Contract details saved to deployed_contracts.json")
