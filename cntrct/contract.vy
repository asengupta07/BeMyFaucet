# @version ^0.4.0

"""
@license MIT
@title BeMyFaucet
@author Arnab Sengupta
@notice This contract is for sending me testnet tokens
"""


OWNER: immutable(address)
struct Funder:
    addy: address
    amount: uint256

funders: public(DynArray[Funder, 1000])
names: public(HashMap[address, String[100]])


@deploy
def __init__():
    OWNER = msg.sender
    self.funders = []


@external
@view
def get_length() -> uint256:
    return len(self.funders)


@external
def set_name(name: String[100]):
    self.names[msg.sender] = name


@internal
@payable
def _fund():
    assert msg.value > 0, "You must send some value"
    length: uint256 = len(self.funders)
    found: bool = False
    index: uint256 = 0
    copy: DynArray[Funder, 1000] = self.funders
    for funder: Funder in copy:
        if funder.addy == msg.sender:
            self.funders[index].amount += msg.value
            found = True
            break
        index += 1
    if not found:
        self.funders.append(Funder(addy=msg.sender, amount=msg.value))
    self._drain()
    

@external
@view
def get_funders() -> DynArray[Funder, 1000]:
    return self.funders
   

@internal
def _drain():
    assert self.balance > 0, "Contract balance is zero"
    send(OWNER, self.balance)


@external
@payable
def fund():
    self._fund()


@external
@payable
def __default__():
    self._fund()