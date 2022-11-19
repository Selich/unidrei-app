from pyteal import *

class Uni:
    class Variables:
        name = Bytes("NAME")
        image = Bytes("IMAGE")
        description = Bytes("DESCRIPTION")
        price = Bytes("PRICE")
        sold = Bytes("SOLD")

    class AppMethods:
        buy = Bytes("buy")

        def application_creation(self):
            return Seq([
                Assert(Txn.application_args.length() == Int(4)),
                Assert(Txn.note() == Bytes("tutorial-marketplace:uv1")),
                Assert(Btoi(Txn.application_args[3]) > Int(0)),
                App.globalPut(self.Variables.name, Txn.application_args[0]),
                App.globalPut(self.Variables.image, Txn.application_args[1]),
                App.globalPut(self.Variables.description, Txn.application_args[2]),
                App.globalPut(self.Variables.price, Btoi(Txn.application_args[3])),
                App.globalPut(self.Variables.sold, Int(0)),
                Approve()
            ])
        def create_nft(self):
            signed_txn = ASATransactionRepository.create_non_fungible_asa(
                client=self.client,
                creator_private_key=self.nft_creator_pk,
                unit_name=self.unit_name,
                asset_name=self.asset_name,
                note=None,
                manager_address=self.nft_creator_address,
                reserve_address=self.nft_creator_address,
                freeze_address=self.nft_creator_address,
                clawback_address=self.nft_creator_address,
                url=self.nft_url,
                default_frozen=True,
                sign_transaction=True,
            )

            nft_id, tx_id = NetworkInteraction.submit_asa_creation(
                client=self.client, transaction=signed_txn
            )
            self.nft_id = nft_id
            return tx_id


