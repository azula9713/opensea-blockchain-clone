import { FC, useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useWeb3 } from '@3rdweb/hooks'
import { MarketplaceModule, NFTModule, ThirdwebSDK } from '@3rdweb/sdk'

import Header from '../../components/Header'
import NFTImage from '../../components/NFT/NFTImage'
import GeneralDetails from '../../components/NFT/GeneralDetails'
import ItemActivity from '../../components/NFT/ItemActivity'
import Purchase from '../../components/NFT/Purchase'

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
}

const Nft: FC = () => {
  const { provider } = useWeb3()
  const router = useRouter()
  const marketPlaceId: string = '0xD151bc870F0947F2058f41aE934f865EBB0F4535'
  const { collectionId } = router.query as { collectionId: string }
  const [selectedNft, setSelectedNft] = useState<any>({})
  const [listings, setListings] = useState<any>([])

  const nftModule = useMemo(() => {
    if (!provider) return

    const sdk = new ThirdwebSDK(provider.getSigner())
    const nftModule: NFTModule = sdk.getNFTModule(collectionId)

    return nftModule
  }, [provider])

  const marketplaceModule = useMemo(() => {
    if (!provider) return

    const sdk = new ThirdwebSDK(provider.getSigner())

    const marketPlaceModule: MarketplaceModule =
      sdk.getMarketplaceModule(marketPlaceId)

    return marketPlaceModule
  }, [provider])

  useEffect(() => {
    if (!marketplaceModule) return
    ;(async () => {
      const marketPlace = await marketplaceModule.getAllListings()
      setListings(marketPlace)
    })()
  }, [marketplaceModule])

  useEffect(() => {
    if (!nftModule) return
    ;(async () => {
      const nfts = await nftModule.getAll()

      const selectedNftItem = nfts.find((nft) => nft.id === router.query.nftId)
      setSelectedNft(selectedNftItem)
    })()
  }, [nftModule])

  return (
    <div className="overflow-hidden">
      <Header />
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
              <NFTImage selectedNft={selectedNft} />
            </div>
            <div className={style.detailsContainer}>
              <GeneralDetails selectedNft={selectedNft} />
              <Purchase
                isListed={router.query.isListed}
                selectedNft={selectedNft}
                listings={listings}
                marketplaceModule={marketplaceModule}
              />
            </div>
          </div>
          <ItemActivity />
        </div>
      </div>
    </div>
  )
}

export default Nft
