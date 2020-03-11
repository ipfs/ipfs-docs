---
title: Ethereum Naming Service
---

# Ethereum Naming Service

You must have an account within MetaMask with a balance of around `0.05 ETH`.

## Purchase an Ethereum domain name

1. Go to [app.ens.domains](https://app.ens.domains/).
2. Log into your MetaMask key.

    ![Metamask pop-up showing a login screen.](images/ethereum-naming-service/ens-metamask-log-into-key.png)

3. Search for the domain you want to use:

    ![Searching for a domain in ENS.](images/ethereum-naming-service/ens-search-for-domain-name.png)

4. Click on the domain if it's available.
5. Click **Request To Register**:

    ![Registration screen within ENS.](images/ethereum-naming-service/ens-request-to-register.png)

6. In the MetaMask window that pops up, click **Confirm**. This action will cost you `ETH`.
7. Wait for the _Request to register_ transaction to complete. This process can take a couple of minutes:

    ![Registration screen within ENS.](images/ethereum-naming-service/ens-registration-transaction-pending.png)

8. Once the transaction has completed, ENS requires that you wait for around a minute. This delay is to make sure there is no-one else attempting to purchase the same domain at the same time as you.

    ![Waiting for registration confirmation screen in ENS.](images/ethereum-naming-service/ens-wait-a-minute.png)

9. Click **Register**. Then click **Confirm** in the MetaMask window that pops up.

    ![2nd transaction confirmation within MetaMask.](images/ethereum-naming-service/ens-metamask-complete-registration-transaction.png)

10. Wait for the transaction to be confirmed. This process can take a couple of minutes:

    ![Waiting for the 2nd transaction to be verified.](images/ethereum-naming-service/ens-complete-registration.png)

You should now be able to see all the settings for your `.eth` domain:

![All the domain settings within ENS](images/ethereum-naming-service/ens-domain-settings-page.png)

## Link your IPFS content identifier (CID)

11. Click the plus `+` icon next to **Records**.

    ![The "add new records" icon in ENS.](images/ethereum-naming-service/ens-add-records-icon.png)

12. Select **Content** from the dropdown.

    ![Records dropdown menu in ENS.](images/ethereum-naming-service/ens-add-content-record.png)

13. Set the **Content** text box as the CID of your website, prefixed with `ipfs://`.

    ![Setting the content record as an IPFS CID.](images/ethereum-naming-service/ens-set-content-record-as-ipfs-cid.png)

14. Confirm this change by clicking **Confirm** in the MetaMask pop-up.

    ![MetaMask confirmation pop-up for changing a content record.](images/ethereum-naming-service/ens-metamask-content-record-transaction)

    This transaction can take a couple of minutes to complete.

In a few minutes, you'll be able to go to `Your_Domain.eth.link` and view your website.